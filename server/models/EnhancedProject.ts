import mongoose, { Document, Schema } from 'mongoose';

// Enhanced Project model for interactive cards
export interface IEnhancedProject extends Document {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  previewImage?: string;
  category: 'web' | 'mobile' | 'desktop' | 'game' | 'ai' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  priority: number;
  isPublic: boolean;
  isFeatured: boolean;
  
  // Interactive Card Settings
  cardSettings: {
    spotlightCard: {
      spotlightColor: string;
      borderRadius: string;
      backgroundColor: string;
      borderColor: string;
      enableSpotlight: boolean;
    };
    profileCard: {
      enableTilt: boolean;
      behindGradient: string;
      innerGradient: string;
      showBehindGradient: boolean;
      avatarUrl?: string;
      iconUrl?: string;
      customColors?: string[];
    };
    display: {
      accentColor: string;
      textColor: string;
      tags: string[];
      displayOrder: number;
    };
  };
  
  // Metadata for effects
  effectSettings: {
    dither: {
      waveColor: [number, number, number];
      colorNum: number;
      waveAmplitude: number;
      waveFrequency: number;
    };
  };
  
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const enhancedProjectSchema = new Schema<IEnhancedProject>({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?github\.com\/.*/, 'Please enter a valid GitHub URL']
  },
  demoUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid URL']
  },
  imageUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid image URL']
  },
  previewImage: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid preview image URL']
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'game', 'ai', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  priority: {
    type: Number,
    default: 0,
    min: [0, 'Priority cannot be negative'],
    max: [10, 'Priority cannot exceed 10']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Interactive Card Settings
  cardSettings: {
    spotlightCard: {
      spotlightColor: {
        type: String,
        default: 'rgba(139, 92, 246, 0.3)' // Elegant purple
      },
      borderRadius: {
        type: String,
        default: '1.5rem'
      },
      backgroundColor: {
        type: String,
        default: 'rgba(15, 15, 15, 0.95)' // Dark sophisticated
      },
      borderColor: {
        type: String,
        default: 'rgba(75, 85, 99, 0.3)' // Subtle border
      },
      enableSpotlight: {
        type: Boolean,
        default: true
      }
    },
    profileCard: {
      enableTilt: {
        type: Boolean,
        default: true
      },
      behindGradient: {
        type: String,
        default: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(262, 100%, 88%, var(--card-opacity)) 4%, hsla(262, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(262, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(262, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #8B5CF6 0%, #06B6D4 40%, #06B6D4 60%, #8B5CF6 100%)'
      },
      innerGradient: {
        type: String,
        default: 'linear-gradient(145deg, rgba(30, 27, 75, 0.9) 0%, rgba(67, 56, 202, 0.3) 100%)'
      },
      showBehindGradient: {
        type: Boolean,
        default: true
      },
      avatarUrl: String,
      iconUrl: String,
      customColors: [String]
    },
    display: {
      accentColor: {
        type: String,
        default: '#8B5CF6' // Elegant purple
      },
      textColor: {
        type: String,
        default: '#F8FAFC' // Clean white
      },
      tags: [String],
      displayOrder: {
        type: Number,
        default: 0
      }
    }
  },
  
  // Effect Settings
  effectSettings: {
    dither: {
      waveColor: {
        type: [Number],
        default: [0.54, 0.36, 0.96] // Purple theme
      },
      colorNum: {
        type: Number,
        default: 6
      },
      waveAmplitude: {
        type: Number,
        default: 0.25
      },
      waveFrequency: {
        type: Number,
        default: 2.5
      }
    }
  },
  
  startDate: Date,
  endDate: Date
}, {
  timestamps: true,
  toJSON: {
    transform: function(_doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
enhancedProjectSchema.index({ category: 1, status: 1, priority: -1 });
enhancedProjectSchema.index({ isFeatured: 1, priority: -1 });
enhancedProjectSchema.index({ isPublic: 1, createdAt: -1 });

export const EnhancedProject = mongoose.model<IEnhancedProject>('EnhancedProject', enhancedProjectSchema);