import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config, connectDatabase, validateConfig } from './config';
import { generalLimiter } from './middleware/rateLimiter';
import { setupSecurity } from './middleware/security';
import routes from './routes/index';

// Load environment variables
dotenv.config();

const app = express();
const PORT = config.port || 5000;

// Security middleware
setupSecurity(app);

// Rate limiting
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Interactive Components Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: [
      'UI Effects Management',
      'Enhanced Projects',
      'Interactive Components',
      'Real-time Configuration'
    ]
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Soulaimane\'s Interactive Portfolio Backend!',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health',
    endpoints: {
      'UI Effects': '/api/ui-effects',
      'Enhanced Projects': '/api/enhanced-projects',
      'Projects': '/api/projects',
      'Contact': '/api/contact',
      'Profile': '/api/profile',
      'Auth': '/api/auth'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    error: config.nodeEnv === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    suggestion: 'Check /api/docs for available endpoints'
  });
});

// Database connection and server startup
const startServer = async () => {
  try {
    // Validate configuration
    validateConfig();
    
    // Connect to MongoDB
    await connectDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log('\n🚀 Interactive Components Backend Started!');
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`🎨 UI Effects: http://localhost:${PORT}/api/ui-effects/active`);
      console.log(`💼 Enhanced Projects: http://localhost:${PORT}/api/enhanced-projects`);
      console.log('\n⚡ Ready for interactive components testing!');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB Connection Help:');
      console.log('1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
      console.log('2. Start MongoDB: mongod --dbpath ./data/db');
      console.log('3. Or use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas');
      console.log('4. Update MONGODB_URI in .env file');
    }
    
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down server...');
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⏹️  Shutting down server...');
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected');
  process.exit(0);
});

// Start the server
startServer();

export default app;