import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { 
  authLimiter,
  authenticateToken,
  requireAdmin,
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors 
} from '../middleware';

const router = Router();

// Public routes with rate limiting
router.post('/login', authLimiter, validateUserLogin, handleValidationErrors, AuthController.login);
router.post('/logout', AuthController.logout);

// Protected routes
router.use(authenticateToken);
router.get('/me', AuthController.getCurrentUser);

// Admin only routes
router.use(requireAdmin);
router.post('/register', validateUserRegistration, handleValidationErrors, AuthController.register);

export default router;