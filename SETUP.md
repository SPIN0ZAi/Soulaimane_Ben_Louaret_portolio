# 🚀 Quick Setup Guide

This guide will help you get the Soulaimane Portfolio Backend API up and running quickly.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Gmail account (for email notifications)

## Step 1: Environment Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your configuration:**
   ```env
   # Required - Change these values
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
   MONGODB_URI=mongodb://localhost:27017/soulaimane-portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=your-gmail-app-password
   NOTIFICATION_EMAIL=soulaimane@example.com
   
   # Optional - Frontend URLs for CORS
   FRONTEND_URL=http://localhost:3000
   FRONTEND_URL_PROD=https://your-portfolio.vercel.app
   ```

## Step 2: Gmail Setup (for contact form notifications)

1. **Enable 2-Factor Authentication:**
   - Go to your Google Account settings
   - Security → 2-Step Verification → Enable

2. **Generate App Password:**
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password as `EMAIL_APP_PASSWORD` in your `.env`

## Step 3: Database Setup

### Option A: Local MongoDB
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Install MongoDB (Ubuntu/WSL)
sudo apt install mongodb

# Start MongoDB
mongod

# Your MONGODB_URI should be:
# MONGODB_URI=mongodb://localhost:27017/soulaimane-portfolio
```

### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string from "Connect" → "Connect your application"
4. Update `MONGODB_URI` in `.env`

## Step 4: Install Dependencies & Seed Database

```bash
# Install dependencies (already done if you ran npm install)
npm install

# Seed database with sample data
npm run seed
```

**Note:** The seeding script creates:
- Admin user: `soulaimane` / `admin123!`
- Complete profile data for Soulaimane
- 6 sample projects
- All necessary data to run the API

## Step 5: Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

## Step 6: Verify Installation

1. **Check API Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **View API Documentation:**
   ```bash
   curl http://localhost:5000/api/docs
   ```

3. **Test Contact Form:**
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test Message",
       "message": "This is a test message from the API setup."
     }'
   ```

4. **Login as Admin:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "username": "soulaimane",
       "password": "admin123!"
     }'
   ```

## Available Endpoints

- **GET** `/api/health` - Health check
- **GET** `/api/docs` - API documentation
- **GET** `/api/projects` - Get all projects
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/profile` - Get profile info
- **POST** `/api/auth/login` - Admin login

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`
   - For Atlas: check network access and credentials

2. **Email Not Sending:**
   - Verify Gmail app password is correct
   - Check `EMAIL_USER` and `EMAIL_APP_PASSWORD`
   - Ensure 2FA is enabled on Gmail

3. **JWT Secret Error:**
   - Ensure `JWT_SECRET` is at least 32 characters long
   - Use a strong, random secret key

4. **CORS Issues:**
   - Update `FRONTEND_URL` in `.env`
   - Check browser console for specific CORS errors

### Useful Commands

```bash
# Check TypeScript types
npm run check

# Re-seed database
npm run seed

# View logs (if you set up logging)
tail -f logs/app.log

# Clean build files
npm run clean
```

## Production Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard
4. Use MongoDB Atlas for production database

### Environment Variables for Production
- Set all variables from `.env.example`
- Use strong `JWT_SECRET` (32+ characters)
- Use MongoDB Atlas connection string
- Set correct `FRONTEND_URL_PROD`

## Next Steps

1. **Customize Profile Data:**
   - Update seeding script with your actual information
   - Re-run `npm run seed`

2. **Frontend Integration:**
   - Use the provided React examples in README.md
   - Connect your frontend to `/api` endpoints

3. **Security:**
   - Change default admin password
   - Set up proper CORS for production
   - Consider adding additional security measures

## Support

If you encounter issues:
1. Check the main README.md for detailed documentation
2. Verify all environment variables are set correctly
3. Check MongoDB and email service connectivity
4. Review API documentation at `/api/docs`

---

🎉 **Congratulations!** Your Soulaimane Portfolio Backend API is now ready to use!

Access your API at: `http://localhost:5000/api`