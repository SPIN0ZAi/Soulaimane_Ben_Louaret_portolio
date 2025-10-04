import { Request, Response } from 'express';

export class DocsController {
  // GET /api/docs - API Documentation
  static async getApiDocs(req: Request, res: Response): Promise<void> {
    const apiDocs = {
      title: 'Soulaimane Portfolio API',
      version: '1.0.0',
      description: 'RESTful API for Soulaimane Ben Louaret\'s portfolio website',
      baseUrl: `${req.protocol}://${req.get('host')}/api`,
      
      endpoints: {
        health: {
          method: 'GET',
          path: '/health',
          description: 'Check API health status',
          authentication: false,
          rateLimit: 'general'
        },
        
        projects: {
          getAll: {
            method: 'GET',
            path: '/projects',
            description: 'Get all public projects with optional filtering',
            authentication: false,
            parameters: {
              query: {
                category: 'Filter by category (web, mobile, desktop, game, ai, other)',
                status: 'Filter by status (completed, in-progress, planned)',
                search: 'Search in name, description, and technologies',
                page: 'Page number for pagination (default: 1)',
                limit: 'Items per page (default: 10)',
                sortBy: 'Sort field (default: createdAt)',
                sortOrder: 'Sort order (asc, desc, default: desc)'
              }
            },
            rateLimit: 'general'
          },
          
          getFeatured: {
            method: 'GET',
            path: '/projects/featured',
            description: 'Get featured projects (high priority)',
            authentication: false,
            rateLimit: 'general'
          },
          
          getById: {
            method: 'GET',
            path: '/projects/:id',
            description: 'Get a specific project by ID',
            authentication: false,
            parameters: {
              path: {
                id: 'Project ID'
              }
            },
            rateLimit: 'general'
          },
          
          create: {
            method: 'POST',
            path: '/projects',
            description: 'Create a new project',
            authentication: true,
            adminOnly: true,
            rateLimit: 'api',
            requestBody: {
              name: 'Project name (required)',
              description: 'Project description (required)',
              longDescription: 'Detailed description (optional)',
              technologies: 'Array of technologies used (required)',
              features: 'Array of project features (optional)',
              githubUrl: 'GitHub repository URL (optional)',
              demoUrl: 'Live demo URL (optional)',
              imageUrl: 'Project image URL (optional)',
              category: 'Project category (required)',
              status: 'Project status (required)',
              priority: 'Priority 0-10 (optional)',
              isPublic: 'Whether project is public (optional)'
            }
          },
          
          update: {
            method: 'PUT',
            path: '/projects/:id',
            description: 'Update an existing project',
            authentication: true,
            adminOnly: true,
            rateLimit: 'api',
            parameters: {
              path: {
                id: 'Project ID'
              }
            }
          },
          
          delete: {
            method: 'DELETE',
            path: '/projects/:id',
            description: 'Delete a project',
            authentication: true,
            adminOnly: true,
            rateLimit: 'api',
            parameters: {
              path: {
                id: 'Project ID'
              }
            }
          }
        },
        
        contact: {
          submit: {
            method: 'POST',
            path: '/contact',
            description: 'Submit a contact form message',
            authentication: false,
            rateLimit: 'contact (5 per hour)',
            requestBody: {
              name: 'Sender name (required, 2-100 chars)',
              email: 'Sender email (required, valid email)',
              subject: 'Message subject (required, 5-200 chars)',
              message: 'Message content (required, 10-2000 chars)'
            }
          },
          
          getAll: {
            method: 'GET',
            path: '/contact',
            description: 'Get all contact messages',
            authentication: true,
            adminOnly: true,
            parameters: {
              query: {
                page: 'Page number for pagination (default: 1)',
                limit: 'Items per page (default: 20)',
                isRead: 'Filter by read status (true/false)',
                priority: 'Filter by priority (low, medium, high)'
              }
            }
          },
          
          markRead: {
            method: 'PUT',
            path: '/contact/:id/read',
            description: 'Mark a message as read',
            authentication: true,
            adminOnly: true,
            parameters: {
              path: {
                id: 'Message ID'
              }
            }
          },
          
          delete: {
            method: 'DELETE',
            path: '/contact/:id',
            description: 'Delete a contact message',
            authentication: true,
            adminOnly: true,
            parameters: {
              path: {
                id: 'Message ID'
              }
            }
          }
        },
        
        profile: {
          get: {
            method: 'GET',
            path: '/profile',
            description: 'Get complete profile information',
            authentication: false,
            rateLimit: 'general'
          },
          
          update: {
            method: 'PUT',
            path: '/profile',
            description: 'Update profile information',
            authentication: true,
            adminOnly: true,
            rateLimit: 'api'
          },
          
          getSkills: {
            method: 'GET',
            path: '/profile/skills',
            description: 'Get skills grouped by category',
            authentication: false,
            rateLimit: 'general'
          },
          
          getExperience: {
            method: 'GET',
            path: '/profile/experience',
            description: 'Get work experience',
            authentication: false,
            rateLimit: 'general'
          },
          
          getEducation: {
            method: 'GET',
            path: '/profile/education',
            description: 'Get education information',
            authentication: false,
            rateLimit: 'general'
          },
          
          getStats: {
            method: 'GET',
            path: '/profile/stats',
            description: 'Get portfolio statistics',
            authentication: false,
            rateLimit: 'general'
          },
          
          getAvailability: {
            method: 'GET',
            path: '/profile/availability',
            description: 'Get current availability status',
            authentication: false,
            rateLimit: 'general'
          }
        },
        
        auth: {
          login: {
            method: 'POST',
            path: '/auth/login',
            description: 'User login',
            authentication: false,
            rateLimit: 'auth (5 per 15 min)',
            requestBody: {
              username: 'Username or email (required)',
              password: 'Password (required)'
            }
          },
          
          register: {
            method: 'POST',
            path: '/auth/register',
            description: 'Register new user',
            authentication: true,
            adminOnly: true,
            requestBody: {
              username: 'Username (required, 3-30 chars)',
              email: 'Email address (required)',
              password: 'Password (required, min 6 chars with uppercase, lowercase, number)',
              role: 'User role (optional, default: user)'
            }
          },
          
          me: {
            method: 'GET',
            path: '/auth/me',
            description: 'Get current user profile',
            authentication: true
          },
          
          logout: {
            method: 'POST',
            path: '/auth/logout',
            description: 'User logout',
            authentication: false
          }
        }
      },
      
      authentication: {
        type: 'Bearer Token (JWT)',
        header: 'Authorization: Bearer <token>',
        obtainToken: 'POST /api/auth/login',
        tokenExpiry: '7 days (configurable)'
      },
      
      rateLimits: {
        general: '100 requests per 15 minutes',
        contact: '5 requests per hour',
        auth: '5 requests per 15 minutes',
        api: '1000 requests per 15 minutes (authenticated)'
      },
      
      responseFormat: {
        success: {
          success: true,
          message: 'Success message',
          data: '/* Response data */'
        },
        error: {
          success: false,
          message: 'Error message',
          errors: [
            {
              field: 'field_name',
              message: 'Validation error message'
            }
          ]
        },
        pagination: {
          success: true,
          data: {
            items: '/* Array of items */',
            pagination: {
              currentPage: 1,
              totalPages: 5,
              totalItems: 50,
              hasNextPage: true,
              hasPrevPage: false
            }
          }
        }
      },
      
      errorCodes: {
        200: 'Success',
        201: 'Created',
        400: 'Bad Request - Validation error',
        401: 'Unauthorized - Authentication required',
        403: 'Forbidden - Admin access required',
        404: 'Not Found',
        429: 'Too Many Requests - Rate limit exceeded',
        500: 'Internal Server Error'
      },
      
      contact: {
        developer: 'Soulaimane Ben Louaret',
        email: 'soulaimane.benlouaret@gmail.com',
        github: 'https://github.com/soulaimane',
        website: 'https://soulaimane.dev'
      }
    };

    res.status(200).json(apiDocs);
  }
}

export default DocsController;