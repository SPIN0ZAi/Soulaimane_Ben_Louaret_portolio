# Interactive Components Backend

Advanced backend system for Soulaimane's portfolio website featuring sophisticated UI effects and interactive components.

## 🚀 Features

### Interactive UI Effects
- **Dither Effects**: WebGL-based dithering with customizable wave properties and mouse interaction
- **Spotlight Cards**: Interactive project cards with mouse-following spotlight effects
- **Profile Cards**: 3D tilt cards with dynamic gradients and animation controls
- **Staggered Menu**: GSAP-powered animated menu systems with configurable timing
- **Electric Border**: Animated border effects with customizable colors and intensities
- **Logo Loop**: Continuous logo animation cycles
- **Shape Blur**: Dynamic shape-based blur effects

### Enhanced Project Management
- **Interactive Cards**: Projects with advanced visual configurations
- **Effect Settings**: Per-project WebGL and animation parameters
- **Card Customization**: Individual spotlight, tilt, and gradient settings
- **Bulk Operations**: Mass updates and management tools
- **Analytics**: Comprehensive project statistics and insights

### Advanced Features
- **Real-time Configuration**: Live updates to UI effects without restart
- **Theme Integration**: Sophisticated color schemes and gradients
- **Performance Optimized**: Efficient database queries and caching
- **Responsive Design**: Mobile-optimized interactive components
- **Developer API**: Comprehensive REST API for frontend integration

## 🛠 Technology Stack

### Backend Core
- **Node.js** with **Express.js** for server framework
- **TypeScript** for type safety and development experience
- **MongoDB** with **Mongoose** for data persistence

### Interactive Technologies
- **Three.js Integration**: WebGL effect configuration
- **GSAP Settings**: Animation timeline management
- **Canvas API Support**: 2D graphics configuration
- **WebGL Shaders**: Custom effect parameters

### Security & Performance
- **JWT Authentication**: Secure API access
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive data validation
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: HTTP security headers

## 📁 Project Structure

```
server/
├── models/
│   ├── EnhancedProject.ts      # Interactive project model
│   ├── UIEffects.ts            # UI effects configuration
│   ├── User.ts                 # User authentication
│   ├── Project.ts              # Basic project model
│   ├── Contact.ts              # Contact form data
│   └── Profile.ts              # User profile data
├── controllers/
│   ├── uiEffectsController.ts  # UI effects management
│   ├── enhancedProjectController.ts # Enhanced projects
│   ├── projectController.ts    # Basic project operations
│   ├── contactController.ts    # Contact form handling
│   ├── profileController.ts    # Profile management
│   ├── authController.ts       # Authentication
│   └── docsController.ts       # API documentation
├── routes/
│   ├── uiEffects.ts           # UI effects endpoints
│   ├── enhancedProjects.ts    # Enhanced project routes
│   ├── projects.ts            # Basic project routes
│   ├── contact.ts             # Contact routes
│   ├── profile.ts             # Profile routes
│   ├── auth.ts                # Authentication routes
│   └── index.ts               # Route aggregation
├── middleware/
│   ├── auth.ts                # Authentication middleware
│   ├── rateLimiter.ts         # Rate limiting
│   ├── validation.ts          # Input validation
│   └── security.ts            # Security headers
├── config/
│   └── index.ts               # Environment configuration
├── scripts/
│   └── seedDatabase.ts        # Basic data seeding
├── seedInteractiveComponents.ts # Interactive components seeding
└── index.ts                   # Server entry point
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6.0+ (local or Atlas)
- Git

### Installation

1. **Clone and Setup**
   ```bash
   cd SoulaimanePortfolio
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB locally or configure Atlas
   mongod --dbpath ./data/db
   ```

4. **Seed Interactive Components**
   ```bash
   npm run seed:interactive
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Verify Installation**
   - API: http://localhost:5000/api/health
   - Docs: http://localhost:5000/api/docs
   - Interactive Effects: http://localhost:5000/api/ui-effects/active

## 🔧 Configuration

### Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/soulaimane-portfolio

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (for contact forms)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
NOTIFICATION_EMAIL=soulaimane@example.com

# Security
FRONTEND_URL=http://localhost:3000
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CONTACT_RATE_LIMIT_MAX=5
AUTH_RATE_LIMIT_MAX=5
```

### Interactive Effects Configuration

The system comes pre-configured with sophisticated defaults:

**Dither Effect**
```json
{
  "waveColor": [0.54, 0.36, 0.96],
  "colorNum": 6,
  "waveAmplitude": 0.25,
  "waveFrequency": 2.5,
  "enableMouseInteraction": true,
  "animationSpeed": 1.0,
  "intensity": 0.8,
  "coverage": "section",
  "zIndex": 1000
}
```

**Spotlight Card**
```json
{
  "enabled": true,
  "spotlightColor": "rgba(139, 92, 246, 0.3)",
  "spotlightSize": 200,
  "borderRadius": "1.5rem",
  "backgroundColor": "rgba(15, 15, 15, 0.95)",
  "borderColor": "rgba(75, 85, 99, 0.3)",
  "transition": "all 0.3s ease",
  "hoverScale": 1.02,
  "glowIntensity": 0.5
}
```

**Profile Card**
```json
{
  "enableTilt": true,
  "tiltMaxAngle": 15,
  "showBehindGradient": true,
  "cardOpacity": 0.8,
  "customColors": ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"],
  "animations": {
    "hover": true,
    "float": false,
    "glow": true
  }
}
```

## 🎨 Frontend Integration

### React Component Example

```jsx
import { useEffect, useState } from 'react';

const InteractiveProjectCard = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [spotlightSettings, setSpotlightSettings] = useState(null);

  useEffect(() => {
    // Fetch project and settings
    Promise.all([
      fetch(`/api/enhanced-projects/${projectId}`),
      fetch('/api/ui-effects/spotlight')
    ]).then(async ([projectRes, settingsRes]) => {
      const projectData = await projectRes.json();
      const settingsData = await settingsRes.json();
      
      setProject(projectData.data);
      setSpotlightSettings(settingsData.data);
    });
  }, [projectId]);

  if (!project || !spotlightSettings) return <div>Loading...</div>;

  return (
    <div 
      className="interactive-card"
      style={{
        borderRadius: spotlightSettings.borderRadius,
        backgroundColor: spotlightSettings.backgroundColor,
        borderColor: spotlightSettings.borderColor,
        '--spotlight-color': spotlightSettings.spotlightColor,
        '--hover-scale': spotlightSettings.hoverScale
      }}
    >
      <h3 style={{ color: project.cardSettings.display.accentColor }}>
        {project.name}
      </h3>
      <p>{project.description}</p>
      <div className="tech-tags">
        {project.cardSettings.display.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};
```

### Three.js Dither Effect Integration

```javascript
// Fetch dither settings
const response = await fetch('/api/ui-effects/dither');
const { data: settings } = await response.json();

// Create shader material
const ditherMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_waveColor: { value: new THREE.Vector3(...settings.waveColor) },
    u_colorNum: { value: settings.colorNum },
    u_waveAmplitude: { value: settings.waveAmplitude },
    u_waveFrequency: { value: settings.waveFrequency },
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 u_waveColor;
    uniform float u_colorNum;
    uniform float u_waveAmplitude;
    uniform float u_waveFrequency;
    uniform float u_time;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution;
      vec3 color = u_waveColor;
      
      float wave = sin(st.x * u_waveFrequency + u_time) * u_waveAmplitude;
      color += wave;
      
      // Quantize colors for dither effect
      color = floor(color * u_colorNum) / u_colorNum;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
});
```

### GSAP Staggered Animation

```javascript
// Fetch staggered menu settings
const { data: menuSettings } = await fetch('/api/ui-effects/staggered-menu').then(r => r.json());

// Apply animations
gsap.registerPlugin(MotionPathPlugin);

gsap.fromTo('.menu-item', 
  {
    opacity: menuSettings.initialOpacity,
    transform: menuSettings.transform.initial
  },
  {
    opacity: menuSettings.finalOpacity,
    transform: menuSettings.transform.final,
    duration: menuSettings.animationDuration,
    ease: menuSettings.ease,
    stagger: menuSettings.staggerDelay,
    onComplete: () => console.log('Menu animation complete')
  }
);
```

## 📊 API Endpoints

### UI Effects Management
- `GET /api/ui-effects/active` - Get all active effects
- `GET /api/ui-effects/dither` - Get dither effect settings
- `PUT /api/ui-effects/dither/settings` - Update dither settings (auth)
- `GET /api/ui-effects/spotlight` - Get spotlight card settings
- `PUT /api/ui-effects/spotlight/settings` - Update spotlight settings (auth)
- `GET /api/ui-effects/profile-card` - Get profile card settings
- `PUT /api/ui-effects/profile-card/settings` - Update profile card settings (auth)
- `GET /api/ui-effects/staggered-menu` - Get staggered menu settings
- `PUT /api/ui-effects/staggered-menu/settings` - Update menu settings (auth)

### Enhanced Projects
- `GET /api/enhanced-projects` - Get enhanced projects with filters
- `GET /api/enhanced-projects/featured` - Get featured projects
- `GET /api/enhanced-projects/:id` - Get specific enhanced project
- `POST /api/enhanced-projects` - Create enhanced project (auth)
- `PUT /api/enhanced-projects/:id` - Update enhanced project (auth)
- `PATCH /api/enhanced-projects/:id/card-settings` - Update card settings (auth)
- `PATCH /api/enhanced-projects/:id/effect-settings` - Update effect settings (auth)
- `POST /api/enhanced-projects/:id/clone` - Clone project (auth)
- `GET /api/enhanced-projects/stats` - Get project statistics

### Authentication & Management
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (auth)
- `PATCH /api/ui-effects/:id/toggle` - Toggle effect status (auth)
- `PATCH /api/enhanced-projects/bulk/update` - Bulk update projects (admin)

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: Admin vs user permissions
- **Token Expiration**: Configurable token lifetimes
- **Secure Headers**: Helmet.js security headers

### Input Validation
- **Schema Validation**: Mongoose schema validation
- **Express Validator**: Request parameter validation
- **Type Safety**: TypeScript compile-time checks
- **Sanitization**: XSS prevention and data cleaning

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Contact Form**: 5 submissions per hour
- **Authentication**: 5 attempts per 15 minutes
- **IP-based Tracking**: Individual IP monitoring

### CORS Configuration
```javascript
{
  origin: [
    'http://localhost:3000',
    'https://your-portfolio.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}
```

## 🚀 Deployment

### Production Environment
```bash
# Build for production
npm run build

# Start production server
NODE_ENV=production npm start

# Or with process manager
pm2 start dist/index.js --name portfolio-api
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/index.js"]
```

### Environment Variables (Production)
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=production-secret-key-very-secure
FRONTEND_URL=https://your-portfolio.vercel.app
EMAIL_USER=your-production-email@gmail.com
EMAIL_APP_PASSWORD=production-app-password
```

## 📈 Performance Optimization

### Database Indexing
```javascript
// Automatic indexes on frequently queried fields
projectSchema.index({ category: 1, status: 1, priority: -1 });
projectSchema.index({ isFeatured: 1, priority: -1 });
uiEffectsSchema.index({ type: 1, isActive: 1 });
```

### Caching Strategy
- **Public Endpoints**: 5-10 minute cache headers
- **Effect Settings**: Redis caching for high-frequency requests
- **Project Lists**: Pagination and filtering optimization
- **Database Queries**: Aggregation pipeline optimization

### Response Optimization
- **Gzip Compression**: Automatic response compression
- **JSON Optimization**: Efficient data serialization
- **Field Selection**: Selective field projection
- **Pagination**: Limit large dataset responses

## 🧪 Testing

### API Testing
```bash
# Install testing dependencies
npm install --save-dev jest supertest @types/jest

# Run tests
npm test

# Coverage report
npm run test:coverage
```

### Example Test
```javascript
describe('UI Effects API', () => {
  test('GET /api/ui-effects/dither returns settings', async () => {
    const response = await request(app)
      .get('/api/ui-effects/dither')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('waveColor');
    expect(response.body.data.waveColor).toHaveLength(3);
  });
});
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection string
echo $MONGODB_URI
```

**JWT Token Errors**
```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Check token format in requests
curl -H "Authorization: Bearer your-token" http://localhost:5000/api/profile
```

**TypeScript Compilation Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Rate Limiting Issues**
```bash
# Increase rate limits in development
export RATE_LIMIT_MAX_REQUESTS=1000

# Check IP restrictions
curl -I http://localhost:5000/api/health
```

## 📚 Additional Resources

- [Interactive Components API Documentation](./INTERACTIVE_COMPONENTS_API.md)
- [Basic Setup Documentation](./SETUP.md)
- [Feature Documentation](./FEATURES.md)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/interactive-effects`)
3. Commit changes (`git commit -am 'Add new interactive effect'`)
4. Push to branch (`git push origin feature/interactive-effects`)
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Soulaimane Ben Louaret**
- Portfolio: [soulaimane.dev](https://soulaimane.dev)
- GitHub: [@soulaimane](https://github.com/soulaimane)
- LinkedIn: [soulaimane](https://linkedin.com/in/soulaimane)
- Email: contact@soulaimane.dev

---

*Built with ❤️ for modern interactive web experiences*