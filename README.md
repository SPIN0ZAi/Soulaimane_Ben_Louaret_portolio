# Soulaimane Ben Louaret - Portfolio Backend API

A secure, scalable, and well-documented backend API for Soulaimane's modern portfolio website. Built with Node.js, Express, MongoDB, and TypeScript.

## 🚀 Features

- **RESTful API** with comprehensive CRUD operations
- **JWT Authentication** for secure admin access
- **MongoDB** with Mongoose for data persistence
- **Input Validation** and sanitization
- **Rate Limiting** for security and performance
- **Email Notifications** for contact form submissions
- **CORS Protection** for secure cross-origin requests
- **Comprehensive Error Handling**
- **TypeScript** for type safety
- **Security Headers** with Helmet.js

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Security Features](#security-features)
- [Development](#development)
- [Deployment](#deployment)
- [Frontend Integration](#frontend-integration)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/soulaimane/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 🔗 API Endpoints

### Base URL: `/api`

### Health Check
- **GET** `/api/health` - API health status

### Projects
- **GET** `/api/projects` - Get all public projects
- **GET** `/api/projects/featured` - Get featured projects
- **GET** `/api/projects/:id` - Get project by ID
- **POST** `/api/projects` - Create project (admin only)
- **PUT** `/api/projects/:id` - Update project (admin only)
- **DELETE** `/api/projects/:id` - Delete project (admin only)

### Contact
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all messages (admin only)
- **PUT** `/api/contact/:id/read` - Mark message as read (admin only)
- **DELETE** `/api/contact/:id` - Delete message (admin only)

### Profile
- **GET** `/api/profile` - Get profile information
- **PUT** `/api/profile` - Update profile (admin only)
- **GET** `/api/profile/skills` - Get skills by category
- **GET** `/api/profile/experience` - Get work experience
- **GET** `/api/profile/education` - Get education
- **GET** `/api/profile/stats` - Get portfolio statistics
- **GET** `/api/profile/availability` - Get availability status

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - Register user (admin only)
- **GET** `/api/auth/me` - Get current user
- **POST** `/api/auth/logout` - User logout

## 🔐 Authentication

### Login
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'your-username',
    password: 'your-password'
  })
});

const { data } = await response.json();
const { token } = data;

// Store token for authenticated requests
localStorage.setItem('authToken', token);
```

### Making Authenticated Requests
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(projectData)
});
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/soulaimane-portfolio

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
NOTIFICATION_EMAIL=soulaimane@example.com

# Frontend URLs for CORS
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_PROD=https://your-portfolio.vercel.app
```

### Gmail Setup for Email Notifications

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `EMAIL_APP_PASSWORD`

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start MongoDB
mongod
```

### MongoDB Atlas (Recommended for production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Database Seeding
```bash
# Seed database with sample data
npm run seed

# This creates:
# - Admin user (username: soulaimane)
# - Complete profile data
# - Sample projects
```

## 🛡️ Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates and sanitizes all inputs
- **CORS Protection**: Configurable cross-origin requests
- **JWT Authentication**: Secure token-based auth
- **Security Headers**: Helmet.js for HTTP security
- **Password Hashing**: bcrypt with configurable rounds
- **SQL Injection Prevention**: MongoDB and input validation
- **XSS Protection**: Input sanitization and CSP headers

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run seed         # Seed database with sample data
npm run db:push      # Push schema changes to database

# Utilities
npm run check        # TypeScript type checking
```

### Project Structure

```
server/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # MongoDB/Mongoose models
├── routes/         # API route definitions
├── config/         # Configuration and database setup
├── scripts/        # Utility scripts (seeding, etc.)
└── types/          # TypeScript type definitions
```

### API Response Format

```typescript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors */ ]
}

// Paginated Response
{
  "success": true,
  "data": {
    "items": [ /* array of items */ ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Environment Variables**
   - Set environment variables in Vercel dashboard
   - Use MongoDB Atlas for production database

### Render

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with build command: `npm run build`
4. Start command: `npm start`

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🎨 Frontend Integration

### React Example (Contact Form)

```jsx
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
```

### Fetch Projects

```javascript
// Get all projects
const fetchProjects = async () => {
  try {
    const response = await fetch('/api/projects?category=web&limit=6');
    const result = await response.json();
    
    if (result.success) {
      return result.data.projects;
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Get featured projects
const fetchFeaturedProjects = async () => {
  try {
    const response = await fetch('/api/projects/featured');
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching featured projects:', error);
  }
};
```

### Admin Dashboard Example

```jsx
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setProjects(result.data.projects);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => deleteProject(project.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 📊 API Testing

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get projects
curl http://localhost:5000/api/projects

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Test message"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "soulaimane",
    "password": "admin123!"
  }'

# Create project (authenticated)
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "category": "web",
    "status": "completed"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Soulaimane Ben Louaret**
- Website: [https://soulaimane.dev](https://soulaimane.dev)
- GitHub: [@soulaimane](https://github.com/soulaimane)
- LinkedIn: [Soulaimane Ben Louaret](https://linkedin.com/in/soulaimane-ben-louaret)
- Email: soulaimane.benlouaret@gmail.com

## 🙏 Acknowledgments

- Express.js for the excellent web framework
- MongoDB for the flexible database solution
- The open-source community for amazing tools and libraries

---

Built with ❤️ by Soulaimane Ben Louaret
