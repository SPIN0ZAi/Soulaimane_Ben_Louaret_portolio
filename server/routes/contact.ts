import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { 
  contactLimiter, 
  authenticateToken, 
  requireAdmin,
  validateContactForm, 
  handleValidationErrors 
} from '../middleware';

const router = Router();

// Public route for contact form submission
router.post('/', contactLimiter, validateContactForm, handleValidationErrors, ContactController.submitContactForm);

// Protected routes (admin only)
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/', ContactController.getContactMessages);
router.put('/:id/read', ContactController.markAsRead);
router.delete('/:id', ContactController.deleteMessage);

export default router;