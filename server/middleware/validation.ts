import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.type === 'field' ? (error as any).path : 'unknown',
        message: error.msg
      }))
    });
    return;
  }
  next();
};

// Contact form validation
export const validateContactForm: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-\'\.]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, apostrophes, and periods'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email address is too long'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters')
    .escape(),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape()
];

// Project validation
export const validateProject: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Project name must be between 1 and 100 characters')
    .escape(),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters')
    .escape(),
  
  body('longDescription')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Long description cannot exceed 2000 characters')
    .escape(),
  
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  
  body('technologies.*')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each technology must be between 1 and 50 characters')
    .escape(),
  
  body('features')
    .optional()
    .isArray(),
  
  body('features.*')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Each feature cannot exceed 200 characters')
    .escape(),
  
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL')
    .matches(/^https?:\/\/(www\.)?github\.com\/.*/)
    .withMessage('Must be a valid GitHub URL'),
  
  body('demoUrl')
    .optional()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),
  
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  body('category')
    .isIn(['web', 'mobile', 'desktop', 'game', 'ai', 'other'])
    .withMessage('Category must be one of: web, mobile, desktop, game, ai, other'),
  
  body('status')
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Status must be one of: completed, in-progress, planned'),
  
  body('priority')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Priority must be a number between 0 and 10'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean value')
];

// User registration validation
export const validateUserRegistration: ValidationChain[] = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// User login validation
export const validateUserLogin: ValidationChain[] = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile validation
export const validateProfile: ValidationChain[] = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-\'\.]+$/)
    .withMessage('Full name can only contain letters, spaces, hyphens, apostrophes, and periods'),
  
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters')
    .escape(),
  
  body('bio')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Bio must be between 10 and 2000 characters')
    .escape(),
  
  body('shortBio')
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage('Short bio must be between 10 and 300 characters')
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters')
    .escape(),
  
  body('profileImage')
    .optional()
    .isURL()
    .withMessage('Profile image must be a valid URL'),
  
  body('resumeUrl')
    .optional()
    .isURL()
    .withMessage('Resume URL must be a valid URL')
];