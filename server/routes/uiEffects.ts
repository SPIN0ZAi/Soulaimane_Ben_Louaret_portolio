import express from 'express';
import {
  getAllEffects,
  getEffectById,
  createEffect,
  updateEffect,
  deleteEffect,
  getDitherSettings,
  updateDitherSettings,
  getSpotlightSettings,
  updateSpotlightSettings,
  getProfileCardSettings,
  updateProfileCardSettings,
  getStaggeredMenuSettings,
  updateStaggeredMenuSettings,
  toggleEffect,
  getActiveEffects
} from '../controllers/uiEffectsController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { apiLimiter, generalLimiter } from '../middleware/rateLimiter';
import { body } from 'express-validator';

const router = express.Router();

// Validation for UI effects
const validateUIEffect = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Effect name must be between 1 and 50 characters'),
  body('type')
    .isIn(['dither', 'spotlight', 'profile-card', 'staggered-menu', 'electric-border', 'logo-loop', 'shape-blur'])
    .withMessage('Invalid effect type'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Public routes - no authentication required for reading settings
router.get('/active', generalLimiter, getActiveEffects);
router.get('/dither', generalLimiter, getDitherSettings);
router.get('/spotlight', generalLimiter, getSpotlightSettings);
router.get('/profile-card', generalLimiter, getProfileCardSettings);
router.get('/staggered-menu', generalLimiter, getStaggeredMenuSettings);

// Protected routes - require authentication for modifications
router.use(authenticateToken);

// General UI Effects CRUD
router.get('/', apiLimiter, getAllEffects);
router.get('/:id', apiLimiter, getEffectById);
router.post('/', apiLimiter, validateUIEffect, createEffect);
router.put('/:id', apiLimiter, validateUIEffect, updateEffect);
router.delete('/:id', apiLimiter, deleteEffect);
router.patch('/:id/toggle', apiLimiter, toggleEffect);

// Specific effect settings endpoints (protected)
router.put('/dither/settings', apiLimiter, updateDitherSettings);
router.put('/spotlight/settings', apiLimiter, updateSpotlightSettings);
router.put('/profile-card/settings', apiLimiter, updateProfileCardSettings);
router.put('/staggered-menu/settings', apiLimiter, updateStaggeredMenuSettings);

export default router;