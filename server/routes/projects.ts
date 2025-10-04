import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { 
  authenticateToken, 
  requireAdmin, 
  apiLimiter, 
  validateProject, 
  handleValidationErrors 
} from '../middleware';

const router = Router();

// Public routes
router.get('/', ProjectController.getAllProjects);
router.get('/featured', ProjectController.getFeaturedProjects);
router.get('/:id', ProjectController.getProjectById);

// Protected routes (require authentication)
router.use(authenticateToken);
router.use(requireAdmin);
router.use(apiLimiter);

router.post('/', validateProject, handleValidationErrors, ProjectController.createProject);
router.put('/:id', validateProject, handleValidationErrors, ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;