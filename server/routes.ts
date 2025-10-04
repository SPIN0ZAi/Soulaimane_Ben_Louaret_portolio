import type { Express } from "express";
import { createServer, type Server } from "http";
import apiRoutes from './routes/index';
import { setupSecurity, generalLimiter } from './middleware';
import { config, validateConfig, connectDatabase } from './config';

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate environment configuration
  validateConfig();
  
  // Connect to MongoDB
  await connectDatabase();
  
  // Setup security middleware
  setupSecurity(app);
  
  // Apply general rate limiting
  app.use(generalLimiter);
  
  // Register API routes
  app.use('/api', apiRoutes);
  
  // Global error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Global error handler:', err);
    
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
