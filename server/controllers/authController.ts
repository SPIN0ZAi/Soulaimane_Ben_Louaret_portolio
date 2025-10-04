import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../middleware';

interface AuthRequest extends Request {
  user?: any;
}

export class AuthController {
  // POST /api/auth/register - Register new user (admin only for portfolio)
  static async register(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User with this email or username already exists'
        });
        return;
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        role: role || 'user'
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      
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
        message: 'Registration failed',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // POST /api/auth/login - User login
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Find user and include password for comparison
      const user = await User.findOne({
        $or: [{ username }, { email: username }]
      }).select('+password');

      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Generate token
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // GET /api/auth/me - Get current user profile
  static async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }

  // POST /api/auth/logout - Logout (token blacklisting could be implemented)
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a real application, you might want to blacklist the token
      // For now, we'll just return a success message
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
}