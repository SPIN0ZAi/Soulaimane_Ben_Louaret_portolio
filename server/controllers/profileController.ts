import { Request, Response } from 'express';
import { Profile } from '../models/Profile';

interface AuthRequest extends Request {
  user?: any;
}

export class ProfileController {
  // GET /api/profile - Get profile information
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Get the single profile document (there should only be one)
      const profile = await Profile.findOne().select('-__v');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // PUT /api/profile - Update profile information (authenticated)
  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const updateData = req.body;

      // Find existing profile or create new one
      let profile = await Profile.findOne();
      
      if (profile) {
        // Update existing profile
        profile = await Profile.findByIdAndUpdate(
          profile._id,
          updateData,
          { 
            new: true, 
            runValidators: true 
          }
        );
      } else {
        // Create new profile if none exists
        profile = new Profile(updateData);
        await profile.save();
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: profile
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      
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
        message: 'Failed to update profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/profile/skills - Get skills grouped by category
  static async getSkills(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne().select('skills');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      // Group skills by category
      const skillsByCategory = profile.skills.reduce((acc: any, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});

      res.status(200).json({
        success: true,
        data: {
          skillsByCategory,
          totalSkills: profile.skills.length
        }
      });
    } catch (error) {
      console.error('Get skills error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch skills',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/profile/experience - Get work experience
  static async getExperience(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne().select('experience');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      // Sort experience by start date (most recent first)
      const sortedExperience = profile.experience.sort((a, b) => 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

      res.status(200).json({
        success: true,
        data: sortedExperience
      });
    } catch (error) {
      console.error('Get experience error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch experience',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/profile/education - Get education
  static async getEducation(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne().select('education');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      // Sort education by start date (most recent first)
      const sortedEducation = profile.education.sort((a, b) => 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

      res.status(200).json({
        success: true,
        data: sortedEducation
      });
    } catch (error) {
      console.error('Get education error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch education',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/profile/stats - Get portfolio statistics
  static async getStats(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne().select('stats skills experience');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      // Calculate additional stats
      const additionalStats = {
        totalSkills: profile.skills.length,
        skillsByLevel: profile.skills.reduce((acc: any, skill) => {
          acc[skill.level] = (acc[skill.level] || 0) + 1;
          return acc;
        }, {}),
        totalExperience: profile.experience.length,
        currentJobs: profile.experience.filter(exp => exp.isCurrentJob).length
      };

      res.status(200).json({
        success: true,
        data: {
          ...profile.stats,
          ...additionalStats
        }
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch stats',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/profile/availability - Get availability status
  static async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne().select('availability');
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: profile.availability
      });
    } catch (error) {
      console.error('Get availability error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch availability',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
}