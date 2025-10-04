import { Router } from 'express';
import projectRoutes from './projects';
import contactRoutes from './contact';
import profileRoutes from './profile';
import authRoutes from './auth';
import uiEffectsRoutes from './uiEffects';
import enhancedProjectsRoutes from './enhancedProjects';
import DocsController from '../controllers/docsController';

const router = Router();

// API Documentation endpoint
router.get('/docs', DocsController.getApiDocs);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Soulaimane Portfolio API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
router.use('/projects', projectRoutes);
router.use('/enhanced-projects', enhancedProjectsRoutes);
router.use('/ui-effects', uiEffectsRoutes);
router.use('/contact', contactRoutes);
router.use('/profile', profileRoutes);
router.use('/auth', authRoutes);

// API Info endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Soulaimane Ben Louaret\'s Portfolio API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      enhancedProjects: '/api/enhanced-projects',
      uiEffects: '/api/ui-effects',
      contact: '/api/contact',
      profile: '/api/profile',
      auth: '/api/auth',
      health: '/api/health'
    },
    documentation: 'See README.md for detailed API documentation',
    developer: {
      name: 'Soulaimane Ben Louaret',
      email: 'contact@soulaimane.dev',
      github: 'https://github.com/soulaimane',
      linkedin: 'https://linkedin.com/in/soulaimane'
    }
  });
});

// 404 handler for API routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      '/api/projects',
      '/api/enhanced-projects',
      '/api/ui-effects',
      '/api/contact',
      '/api/profile',
      '/api/auth',
      '/api/health'
    ]
  });
});

export default router;