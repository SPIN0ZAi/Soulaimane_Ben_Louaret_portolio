import { Request, Response } from 'express';
import { Project, IProject } from '../models/Project';

interface AuthRequest extends Request {
  user?: any;
}

export class ProjectController {
  // GET /api/projects - Get all public projects
  static async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const { 
        category, 
        status, 
        search, 
        page = 1, 
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build filter query
      const filter: any = { isPublic: true };
      
      if (category && category !== 'all') {
        filter.category = category;
      }
      
      if (status && status !== 'all') {
        filter.status = status;
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { technologies: { $in: [new RegExp(search as string, 'i')] } }
        ];
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Sort
      const sortOptions: any = {};
      sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
      
      // Add priority to sort for better ordering
      if (sortBy !== 'priority') {
        sortOptions.priority = -1;
      }

      // Execute query
      const [projects, total] = await Promise.all([
        Project.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(limitNum)
          .select('-__v'),
        Project.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(total / limitNum);

      res.status(200).json({
        success: true,
        data: {
          projects,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalProjects: total,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1
          }
        }
      });
    } catch (error) {
      console.error('Get projects error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch projects',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/projects/:id - Get project by ID
  static async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const project = await Project.findById(id).select('-__v');
      
      if (!project) {
        res.status(404).json({
          success: false,
          message: 'Project not found'
        });
        return;
      }

      // Check if project is public or user is authenticated admin
      if (!project.isPublic && (!req.user || req.user.role !== 'admin')) {
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Get project by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch project',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // POST /api/projects - Create new project (authenticated)
  static async createProject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const projectData = req.body;
      
      const project = new Project(projectData);
      await project.save();

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error: any) {
      console.error('Create project error:', error);
      
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map((err: any) => ({
            field: err.path,
            message: err.message
          }))
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Failed to create project',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // PUT /api/projects/:id - Update project (authenticated)
  static async updateProject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const project = await Project.findByIdAndUpdate(
        id,
        updateData,
        { 
          new: true, 
          runValidators: true 
        }
      );

      if (!project) {
        res.status(404).json({
          success: false,
          message: 'Project not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: project
      });
    } catch (error: any) {
      console.error('Update project error:', error);
      
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map((err: any) => ({
            field: err.path,
            message: err.message
          }))
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Failed to update project',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // DELETE /api/projects/:id - Delete project (authenticated)
  static async deleteProject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: 'Project not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete project',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/projects/featured - Get featured projects
  static async getFeaturedProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await Project.find({ 
        isPublic: true,
        priority: { $gte: 7 } // High priority projects
      })
      .sort({ priority: -1, createdAt: -1 })
      .limit(6)
      .select('-__v');

      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error('Get featured projects error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch featured projects',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
}