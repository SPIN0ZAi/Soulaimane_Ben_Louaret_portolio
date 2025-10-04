import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/soulaimane-portfolio',
    options: {
      maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10', 10),
      serverSelectionTimeoutMS: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10),
      socketTimeoutMS: 45000,
    }
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // Email Configuration
  email: {
    user: process.env.EMAIL_USER || '',
    appPassword: process.env.EMAIL_APP_PASSWORD || '',
    notificationEmail: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
    fromName: process.env.EMAIL_FROM_NAME || 'Soulaimane Portfolio',
    replyTo: process.env.EMAIL_REPLY_TO || 'noreply@soulaimane.dev'
  },
  
  // Frontend URLs for CORS
  frontend: {
    devUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    prodUrl: process.env.FRONTEND_URL_PROD || 'https://soulaimane-portfolio.vercel.app'
  },
  
  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    contactRateLimitMax: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5', 10),
    authRateLimitMax: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '5', 10)
  },
  
  // Default Admin Configuration
  defaultAdmin: {
    username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@soulaimane.dev',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'change-this-secure-password'
  },
  
  // Social Media Links
  social: {
    github: process.env.GITHUB_URL || 'https://github.com/soulaimane',
    linkedin: process.env.LINKEDIN_URL || 'https://linkedin.com/in/soulaimane',
    twitter: process.env.TWITTER_URL || 'https://twitter.com/soulaimane'
  }
};

// Validation function
export const validateConfig = (): void => {
  const requiredEnvVars = [
    'JWT_SECRET',
    'MONGODB_URI',
    'EMAIL_USER',
    'EMAIL_APP_PASSWORD'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n📝 Please check your .env file or environment configuration.');
    
    if (config.nodeEnv === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Running in development mode with missing environment variables.');
    }
  }
  
  // Validate JWT secret strength in production
  if (config.nodeEnv === 'production' && process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long in production');
    process.exit(1);
  }
  
  // Validate email configuration
  if (!config.email.user || !config.email.appPassword) {
    console.warn('⚠️  Email configuration incomplete. Contact form notifications will not work.');
  }
};

// Database connection function
export const connectDatabase = async (): Promise<void> => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
    // Set up connection event listeners
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🔄 Shutting down gracefully...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    if (config.nodeEnv === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Continuing without database in development mode');
    }
  }
};