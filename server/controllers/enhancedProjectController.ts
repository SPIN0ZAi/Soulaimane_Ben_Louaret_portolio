import { Request, Response } from 'express';
import { EnhancedProject, IEnhancedProject } from '../models/EnhancedProject';
import { validationResult } from 'express-validator';

// Get all enhanced projects with interactive card settings
export const getAllEnhancedProjects = async (req: Request, res: Response) => {
  try {
    const { 
      category, 
      status, 
      featured, 
      public: isPublic, 
      page = 1, 
      limit = 10,
      sortBy = 'priority',
      sortOrder = 'desc',
      search
    } = req.query;
    
    const filter: any = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured !== undefined) filter.isFeatured = featured === 'true';
    if (isPublic !== undefined) filter.isPublic = isPublic === 'true';
    
    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }
    
    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [projects, total] = await Promise.all([
      EnhancedProject.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit)),
      EnhancedProject.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get all enhanced projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enhanced projects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get enhanced project by ID
export const getEnhancedProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await EnhancedProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Enhanced project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get enhanced project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enhanced project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Create new enhanced project
export const createEnhancedProject = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const project = new EnhancedProject(req.body);
    await project.save();
    
    res.status(201).json({
      success: true,
      data: project,
      message: 'Enhanced project created successfully'
    });
  } catch (error: any) {
    console.error('Create enhanced project error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to create enhanced project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Update enhanced project
export const updateEnhancedProject = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const project = await EnhancedProject.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Enhanced project not found'
      });
    }
    
    res.json({
      success: true,
      data: project,
      message: 'Enhanced project updated successfully'
    });
  } catch (error) {
    console.error('Update enhanced project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enhanced project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Delete enhanced project
export const deleteEnhancedProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await EnhancedProject.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Enhanced project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Enhanced project deleted successfully'
    });
  } catch (error) {
    console.error('Delete enhanced project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enhanced project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get featured projects with enhanced card settings
export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredProjects = await EnhancedProject.find({ 
      isFeatured: true, 
      isPublic: true 
    })
    .sort({ priority: -1, createdAt: -1 })
    .limit(Number(limit));
    
    res.json({
      success: true,
      data: featuredProjects,
      count: featuredProjects.length
    });
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured projects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get projects by category with card settings
export const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { limit = 10, includePrivate = 'false' } = req.query;
    
    const filter: any = { category };
    if (includePrivate !== 'true') {
      filter.isPublic = true;
    }
    
    const projects = await EnhancedProject.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .limit(Number(limit));
    
    res.json({
      success: true,
      data: projects,
      category,
      count: projects.length
    });
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects by category',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Update project card settings only
export const updateProjectCardSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cardSettings } = req.body;
    
    if (!cardSettings) {
      return res.status(400).json({
        success: false,
        message: 'Card settings are required'
      });
    }
    
    const project = await EnhancedProject.findByIdAndUpdate(
      id,
      { 
        $set: { 
          cardSettings: {
            ...cardSettings
          },
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Enhanced project not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: project._id,
        name: project.name,
        cardSettings: project.cardSettings
      },
      message: 'Project card settings updated successfully'
    });
  } catch (error) {
    console.error('Update project card settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project card settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Update project effect settings only
export const updateProjectEffectSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { effectSettings } = req.body;
    
    if (!effectSettings) {
      return res.status(400).json({
        success: false,
        message: 'Effect settings are required'
      });
    }
    
    const project = await EnhancedProject.findByIdAndUpdate(
      id,
      { 
        $set: { 
          effectSettings: {
            ...effectSettings
          },
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Enhanced project not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: project._id,
        name: project.name,
        effectSettings: project.effectSettings
      },
      message: 'Project effect settings updated successfully'
    });
  } catch (error) {
    console.error('Update project effect settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project effect settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get project stats and analytics
export const getProjectStats = async (req: Request, res: Response) => {
  try {
    const [
      totalProjects,
      publicProjects,
      featuredProjects,
      projectsByCategory,
      projectsByStatus
    ] = await Promise.all([
      EnhancedProject.countDocuments(),
      EnhancedProject.countDocuments({ isPublic: true }),
      EnhancedProject.countDocuments({ isFeatured: true }),
      EnhancedProject.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      EnhancedProject.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);
    
    res.json({
      success: true,
      data: {
        overview: {
          total: totalProjects,
          public: publicProjects,
          featured: featuredProjects,
          private: totalProjects - publicProjects
        },
        byCategory: projectsByCategory,
        byStatus: projectsByStatus
      }
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project statistics',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Bulk update operations
export const bulkUpdateProjects = async (req: Request, res: Response) => {
  try {
    const { projectIds, updates } = req.body;
    
    if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Project IDs array is required'
      });
    }
    
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Updates object is required'
      });
    }
    
    const result = await EnhancedProject.updateMany(
      { _id: { $in: projectIds } },
      { ...updates, updatedAt: new Date() }
    );
    
    res.json({
      success: true,
      data: {
        matched: result.matchedCount,
        modified: result.modifiedCount
      },
      message: `Successfully updated ${result.modifiedCount} projects`
    });
  } catch (error) {
    console.error('Bulk update projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update projects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Clone project with card settings
export const cloneProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, ...overrides } = req.body;
    
    const originalProject = await EnhancedProject.findById(id);
    if (!originalProject) {
      return res.status(404).json({
        success: false,
        message: 'Original project not found'
      });
    }
    
    const clonedData = {
      ...originalProject.toObject(),
      name: name || `${originalProject.name} (Copy)`,
      isPublic: false,
      isFeatured: false,
      priority: 0,
      ...overrides
    };
    
    delete clonedData._id;
    delete clonedData.createdAt;
    delete clonedData.updatedAt;
    
    const clonedProject = new EnhancedProject(clonedData);
    await clonedProject.save();
    
    res.status(201).json({
      success: true,
      data: clonedProject,
      message: 'Project cloned successfully'
    });
  } catch (error) {
    console.error('Clone project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clone project',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};