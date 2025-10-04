import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import { 
  authenticateToken, 
  requireAdmin,
  validateProfile, 
  handleValidationErrors 
} from '../middleware';

const router = Router();

// Public routes
router.get('/', ProfileController.getProfile);
router.get('/skills', ProfileController.getSkills);
router.get('/experience', ProfileController.getExperience);
router.get('/education', ProfileController.getEducation);
router.get('/stats', ProfileController.getStats);
router.get('/availability', ProfileController.getAvailability);

// Protected routes (admin only)
router.use(authenticateToken);
router.use(requireAdmin);

router.put('/', validateProfile, handleValidationErrors, ProfileController.updateProfile);

export default router;