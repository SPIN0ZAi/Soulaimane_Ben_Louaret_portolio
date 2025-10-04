import express from 'express';
import {
  getAllEnhancedProjects,
  getEnhancedProjectById,
  createEnhancedProject,
  updateEnhancedProject,
  deleteEnhancedProject,
  getFeaturedProjects,
  getProjectsByCategory,
  updateProjectCardSettings,
  updateProjectEffectSettings,
  getProjectStats,
  bulkUpdateProjects,
  cloneProject
} from '../controllers/enhancedProjectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { apiLimiter, generalLimiter } from '../middleware/rateLimiter';
import { validateProject } from '../middleware/validation';
import { body } from 'express-validator';

const router = express.Router();

// Validation for enhanced project card settings
const validateCardSettings = [
  body('cardSettings.spotlightCard.spotlightColor')
    .optional()
    .isString()
    .withMessage('Spotlight color must be a string'),
  body('cardSettings.spotlightCard.borderRadius')
    .optional()
    .isString()
    .withMessage('Border radius must be a string'),
  body('cardSettings.spotlightCard.enableSpotlight')
    .optional()
    .isBoolean()
    .withMessage('Enable spotlight must be a boolean'),
  body('cardSettings.profileCard.enableTilt')
    .optional()
    .isBoolean()
    .withMessage('Enable tilt must be a boolean'),
  body('cardSettings.profileCard.showBehindGradient')
    .optional()
    .isBoolean()
    .withMessage('Show behind gradient must be a boolean'),
  body('cardSettings.display.accentColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Accent color must be a valid hex color'),
  body('cardSettings.display.displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer')
];

// Validation for effect settings
const validateEffectSettings = [
  body('effectSettings.dither.waveColor')
    .optional()
    .isArray({ min: 3, max: 3 })
    .withMessage('Wave color must be an array of 3 numbers'),
  body('effectSettings.dither.waveColor.*')
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage('Wave color values must be between 0 and 1'),
  body('effectSettings.dither.colorNum')
    .optional()
    .isInt({ min: 2, max: 32 })
    .withMessage('Color number must be between 2 and 32'),
  body('effectSettings.dither.waveAmplitude')
    .optional()
    .isFloat({ min: 0, max: 2 })
    .withMessage('Wave amplitude must be between 0 and 2'),
  body('effectSettings.dither.waveFrequency')
    .optional()
    .isFloat({ min: 0.1, max: 10 })
    .withMessage('Wave frequency must be between 0.1 and 10')
];

// Public routes - no authentication required
router.get('/', generalLimiter, getAllEnhancedProjects);
router.get('/featured', generalLimiter, getFeaturedProjects);
router.get('/category/:category', generalLimiter, getProjectsByCategory);
router.get('/stats', generalLimiter, getProjectStats);
router.get('/:id', generalLimiter, getEnhancedProjectById);

// Protected routes - require authentication for modifications
router.use(authenticateToken);

// CRUD operations (authenticated users)
router.post('/', apiLimiter, validateProject, createEnhancedProject);
router.put('/:id', apiLimiter, validateProject, updateEnhancedProject);
router.delete('/:id', apiLimiter, requireAdmin, deleteEnhancedProject);

// Card and effect settings
router.patch('/:id/card-settings', apiLimiter, validateCardSettings, updateProjectCardSettings);
router.patch('/:id/effect-settings', apiLimiter, validateEffectSettings, updateProjectEffectSettings);

// Bulk operations
router.patch('/bulk/update', apiLimiter, requireAdmin, bulkUpdateProjects);

// Clone project
router.post('/:id/clone', apiLimiter, cloneProject);

export default router;