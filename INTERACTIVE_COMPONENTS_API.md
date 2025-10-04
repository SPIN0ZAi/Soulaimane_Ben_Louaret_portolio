# Interactive Components API Documentation

This document provides comprehensive documentation for the interactive components backend API that powers advanced UI effects and enhanced project cards for Soulaimane's portfolio.

## Overview

The Interactive Components API extends the core portfolio backend with specialized endpoints for managing sophisticated UI effects and enhanced project visualizations. It supports modern web technologies including WebGL, Three.js, GSAP animations, and responsive design patterns.

## Architecture

### Models

#### UIEffects Model
Manages configuration for various interactive UI components:
- **Dither Effects**: WebGL-based dithering with customizable wave properties
- **Spotlight Cards**: Interactive cards with mouse-following spotlight effects
- **Profile Cards**: 3D tilt cards with gradient backgrounds and animations
- **Staggered Menu**: GSAP-powered animated menu systems
- **Electric Border**: Animated border effects
- **Logo Loop**: Continuous logo animation cycles
- **Shape Blur**: Dynamic shape-based blur effects

#### EnhancedProject Model
Extends the basic project model with interactive card settings:
- **Card Settings**: Visual configuration for spotlight and profile cards
- **Effect Settings**: WebGL and animation parameters
- **Display Settings**: Theme, colors, and ordering preferences

### Controllers

#### UIEffectsController
Manages CRUD operations for interactive UI components:
- Global effect management
- Component-specific settings
- Real-time configuration updates
- Bulk operations and toggles

#### EnhancedProjectController
Handles enhanced projects with interactive features:
- Project management with card settings
- Effect configuration per project
- Bulk updates and cloning
- Statistics and analytics

## API Endpoints

### UI Effects Management

#### Get Active Effects
```
GET /api/ui-effects/active
```
Returns all currently active UI effects and their configurations.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "effect_id",
      "name": "Dither Effect",
      "type": "dither",
      "isActive": true,
      "componentSettings": {
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
    }
  ],
  "count": 5
}
```

#### Get Dither Effect Settings
```
GET /api/ui-effects/dither
```
Retrieves current dither effect configuration.

**Response:**
```json
{
  "success": true,
  "data": {
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
}
```

#### Update Dither Effect Settings
```
PUT /api/ui-effects/dither/settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "waveColor": [0.6, 0.4, 0.9],
  "colorNum": 8,
  "waveAmplitude": 0.3,
  "waveFrequency": 3.0,
  "enableMouseInteraction": true,
  "animationSpeed": 1.2,
  "intensity": 0.9,
  "coverage": "full",
  "zIndex": 1500
}
```

#### Get Spotlight Card Settings
```
GET /api/ui-effects/spotlight
```
Retrieves current spotlight card configuration.

**Response:**
```json
{
  "success": true,
  "data": {
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
}
```

#### Update Spotlight Card Settings
```
PUT /api/ui-effects/spotlight/settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "spotlightColor": "rgba(139, 92, 246, 0.4)",
  "spotlightSize": 250,
  "hoverScale": 1.05,
  "glowIntensity": 0.7
}
```

#### Get Profile Card Settings
```
GET /api/ui-effects/profile-card
```
Retrieves current profile card configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "enableTilt": true,
    "tiltMaxAngle": 15,
    "tiltReverse": false,
    "behindGradient": "radial-gradient(...)",
    "innerGradient": "linear-gradient(...)",
    "showBehindGradient": true,
    "cardOpacity": 0.8,
    "borderRadius": "1.5rem",
    "customColors": ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"],
    "animations": {
      "hover": true,
      "float": false,
      "glow": true
    }
  }
}
```

#### Update Profile Card Settings
```
PUT /api/ui-effects/profile-card/settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "enableTilt": true,
  "tiltMaxAngle": 20,
  "customColors": ["#8B5CF6", "#06B6D4"],
  "animations": {
    "hover": true,
    "float": true,
    "glow": true
  }
}
```

#### Get Staggered Menu Settings
```
GET /api/ui-effects/staggered-menu
```
Retrieves current staggered menu configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "direction": "horizontal",
    "staggerDelay": 0.1,
    "animationDuration": 0.6,
    "ease": "power2.out",
    "initialOpacity": 0,
    "finalOpacity": 1,
    "transform": {
      "initial": "translateY(30px)",
      "final": "translateY(0px)"
    },
    "socialLinks": [
      {
        "name": "GitHub",
        "url": "https://github.com/soulaimane",
        "icon": "github",
        "color": "#8B5CF6",
        "order": 1
      }
    ]
  }
}
```

#### Update Staggered Menu Settings
```
PUT /api/ui-effects/staggered-menu/settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "staggerDelay": 0.15,
  "animationDuration": 0.8,
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/soulaimane",
      "icon": "github",
      "color": "#8B5CF6",
      "order": 1
    },
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/soulaimane",
      "icon": "linkedin",
      "color": "#06B6D4",
      "order": 2
    }
  ]
}
```

### Enhanced Projects Management

#### Get Enhanced Projects
```
GET /api/enhanced-projects
```
Retrieves enhanced projects with interactive card settings.

**Query Parameters:**
- `category`: Filter by project category
- `status`: Filter by project status
- `featured`: Filter featured projects (true/false)
- `page`: Page number for pagination
- `limit`: Items per page
- `search`: Search term for name/description/technologies

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "project_id",
      "name": "Assembly Pixel Renderer",
      "description": "High-performance pixel manipulation...",
      "technologies": ["Assembly", "x86", "SIMD"],
      "cardSettings": {
        "spotlightCard": {
          "spotlightColor": "rgba(139, 92, 246, 0.4)",
          "enableSpotlight": true
        },
        "profileCard": {
          "enableTilt": true,
          "customColors": ["#8B5CF6", "#A855F7"]
        },
        "display": {
          "accentColor": "#8B5CF6",
          "tags": ["Assembly", "Graphics", "Performance"],
          "displayOrder": 1
        }
      },
      "effectSettings": {
        "dither": {
          "waveColor": [0.54, 0.36, 0.96],
          "colorNum": 8,
          "waveAmplitude": 0.3
        }
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

#### Get Featured Enhanced Projects
```
GET /api/enhanced-projects/featured
```
Retrieves featured projects with enhanced card settings.

#### Get Enhanced Project by ID
```
GET /api/enhanced-projects/:id
```
Retrieves a specific enhanced project by ID.

#### Create Enhanced Project
```
POST /api/enhanced-projects
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "New Interactive Project",
  "description": "A project with interactive features",
  "technologies": ["React", "Three.js", "WebGL"],
  "cardSettings": {
    "spotlightCard": {
      "spotlightColor": "rgba(139, 92, 246, 0.3)",
      "enableSpotlight": true
    },
    "display": {
      "accentColor": "#8B5CF6",
      "tags": ["React", "WebGL"]
    }
  },
  "effectSettings": {
    "dither": {
      "waveColor": [0.54, 0.36, 0.96],
      "colorNum": 6
    }
  }
}
```

#### Update Enhanced Project
```
PUT /api/enhanced-projects/:id
Authorization: Bearer <token>
```

#### Update Project Card Settings
```
PATCH /api/enhanced-projects/:id/card-settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "cardSettings": {
    "spotlightCard": {
      "spotlightColor": "rgba(139, 92, 246, 0.5)",
      "spotlightSize": 300
    },
    "profileCard": {
      "enableTilt": false,
      "customColors": ["#FF6B6B", "#4ECDC4"]
    }
  }
}
```

#### Update Project Effect Settings
```
PATCH /api/enhanced-projects/:id/effect-settings
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "effectSettings": {
    "dither": {
      "waveColor": [0.8, 0.2, 0.9],
      "waveAmplitude": 0.4,
      "intensity": 0.9
    }
  }
}
```

#### Clone Enhanced Project
```
POST /api/enhanced-projects/:id/clone
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Cloned Project Name",
  "isPublic": false
}
```

### General Management

#### Toggle Effect Status
```
PATCH /api/ui-effects/:id/toggle
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "isActive": false
}
```

#### Get Project Statistics
```
GET /api/enhanced-projects/stats
```
Returns comprehensive statistics about enhanced projects.

#### Bulk Update Projects
```
PATCH /api/enhanced-projects/bulk/update
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "projectIds": ["id1", "id2", "id3"],
  "updates": {
    "isPublic": true,
    "priority": 5
  }
}
```

## Frontend Integration

### Dither Effect Integration
```javascript
// Fetch dither settings
const response = await fetch('/api/ui-effects/dither');
const { data: ditherSettings } = await response.json();

// Apply to Three.js material
const ditherMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_waveColor: { value: ditherSettings.waveColor },
    u_colorNum: { value: ditherSettings.colorNum },
    u_waveAmplitude: { value: ditherSettings.waveAmplitude },
    u_waveFrequency: { value: ditherSettings.waveFrequency },
    u_time: { value: 0 }
  },
  // ... shader code
});
```

### Spotlight Card Integration
```javascript
// Fetch spotlight settings
const { data: spotlightSettings } = await fetch('/api/ui-effects/spotlight').then(r => r.json());

// Apply to card component
const cardStyle = {
  borderRadius: spotlightSettings.borderRadius,
  backgroundColor: spotlightSettings.backgroundColor,
  borderColor: spotlightSettings.borderColor,
  transition: spotlightSettings.transition,
  '--spotlight-color': spotlightSettings.spotlightColor,
  '--spotlight-size': `${spotlightSettings.spotlightSize}px`
};
```

### Profile Card Integration
```javascript
// Fetch profile card settings
const { data: profileSettings } = await fetch('/api/ui-effects/profile-card').then(r => r.json());

// Apply tilt and gradient effects
const profileCardProps = {
  enableTilt: profileSettings.enableTilt,
  tiltMaxAngle: profileSettings.tiltMaxAngle,
  style: {
    '--behind-gradient': profileSettings.behindGradient,
    '--inner-gradient': profileSettings.innerGradient,
    '--card-opacity': profileSettings.cardOpacity,
    borderRadius: profileSettings.borderRadius
  }
};
```

### Staggered Menu Integration
```javascript
// Fetch staggered menu settings
const { data: menuSettings } = await fetch('/api/ui-effects/staggered-menu').then(r => r.json());

// Apply GSAP animations
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
    stagger: menuSettings.staggerDelay
  }
);
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict (duplicate data)
- `500`: Internal Server Error

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Public endpoints**: 1000 requests per 15 minutes
- **Authentication required**: Higher limits for authenticated users

## Authentication

Most modification endpoints require JWT authentication:

```javascript
const response = await fetch('/api/ui-effects/dither/settings', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedSettings)
});
```

## Performance Considerations

- **Caching**: Public endpoints are cacheable for 5-10 minutes
- **Compression**: All responses are gzipped
- **Database**: Indexed queries for optimal performance
- **Real-time Updates**: Consider WebSocket connections for live configuration updates

## Security Features

- **CORS**: Configured for frontend domain
- **Helmet**: Security headers applied
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive validation for all inputs
- **Authentication**: JWT-based secure authentication
- **Authorization**: Role-based access control

This API provides the foundation for creating sophisticated, interactive portfolio experiences with real-time configuration capabilities and seamless frontend integration.