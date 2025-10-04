import mongoose, { Document, Schema } from 'mongoose';

// UI Effects configuration model
export interface IUIEffects extends Document {
  _id: string;
  name: string;
  type: 'dither' | 'spotlight' | 'profile-card' | 'staggered-menu' | 'electric-border' | 'logo-loop' | 'shape-blur';
  isActive: boolean;
  globalSettings: any;
  componentSettings: any;
  createdAt: Date;
  updatedAt: Date;
}

// Dither Effect Settings Interface
export interface IDitherSettings {
  waveColor: [number, number, number];
  colorNum: number;
  waveAmplitude: number;
  waveFrequency: number;
  enableMouseInteraction: boolean;
  animationSpeed: number;
  intensity: number;
  coverage: 'full' | 'section' | 'element';
  zIndex: number;
}

// Spotlight Card Settings Interface
export interface ISpotlightSettings {
  enabled: boolean;
  spotlightColor: string;
  spotlightSize: number;
  borderRadius: string;
  backgroundColor: string;
  borderColor: string;
  transition: string;
  hoverScale: number;
  glowIntensity: number;
}

// Profile Card Settings Interface
export interface IProfileCardSettings {
  enableTilt: boolean;
  tiltMaxAngle: number;
  tiltReverse: boolean;
  behindGradient: string;
  innerGradient: string;
  showBehindGradient: boolean;
  cardOpacity: number;
  borderRadius: string;
  customColors: string[];
  animations: {
    hover: boolean;
    float: boolean;
    glow: boolean;
  };
}

// Staggered Menu Settings Interface
export interface IStaggeredMenuSettings {
  enabled: boolean;
  direction: 'horizontal' | 'vertical';
  staggerDelay: number;
  animationDuration: number;
  ease: string;
  initialOpacity: number;
  finalOpacity: number;
  transform: {
    initial: string;
    final: string;
  };
  socialLinks: Array<{
    name: string;
    url: string;
    icon: string;
    color: string;
    order: number;
  }>;
}

const uiEffectsSchema = new Schema<IUIEffects>({
  name: {
    type: String,
    required: [true, 'Effect name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Effect name cannot exceed 50 characters']
  },
  type: {
    type: String,
    enum: ['dither', 'spotlight', 'profile-card', 'staggered-menu', 'electric-border', 'logo-loop', 'shape-blur'],
    required: [true, 'Effect type is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  globalSettings: {
    type: Schema.Types.Mixed,
    default: {}
  },
  componentSettings: {
    type: Schema.Types.Mixed,
    default: {}
  }
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

// Separate schemas for specific effect types with validation
const ditherEffectSchema = new Schema<IDitherSettings>({
  waveColor: {
    type: [Number],
    default: [0.54, 0.36, 0.96],
    validate: {
      validator: function(v: number[]) {
        return v.length === 3 && v.every(n => n >= 0 && n <= 1);
      },
      message: 'Wave color must be an array of 3 values between 0 and 1'
    }
  },
  colorNum: {
    type: Number,
    default: 6,
    min: [2, 'Color number must be at least 2'],
    max: [32, 'Color number cannot exceed 32']
  },
  waveAmplitude: {
    type: Number,
    default: 0.25,
    min: [0, 'Wave amplitude cannot be negative'],
    max: [2, 'Wave amplitude cannot exceed 2']
  },
  waveFrequency: {
    type: Number,
    default: 2.5,
    min: [0.1, 'Wave frequency must be at least 0.1'],
    max: [10, 'Wave frequency cannot exceed 10']
  },
  enableMouseInteraction: {
    type: Boolean,
    default: true
  },
  animationSpeed: {
    type: Number,
    default: 1.0,
    min: [0.1, 'Animation speed must be at least 0.1'],
    max: [5, 'Animation speed cannot exceed 5']
  },
  intensity: {
    type: Number,
    default: 0.8,
    min: [0, 'Intensity cannot be negative'],
    max: [1, 'Intensity cannot exceed 1']
  },
  coverage: {
    type: String,
    enum: ['full', 'section', 'element'],
    default: 'section'
  },
  zIndex: {
    type: Number,
    default: 1000
  }
});

const spotlightCardSchema = new Schema<ISpotlightSettings>({
  enabled: {
    type: Boolean,
    default: true
  },
  spotlightColor: {
    type: String,
    default: 'rgba(139, 92, 246, 0.3)'
  },
  spotlightSize: {
    type: Number,
    default: 200,
    min: [50, 'Spotlight size must be at least 50px'],
    max: [500, 'Spotlight size cannot exceed 500px']
  },
  borderRadius: {
    type: String,
    default: '1.5rem'
  },
  backgroundColor: {
    type: String,
    default: 'rgba(15, 15, 15, 0.95)'
  },
  borderColor: {
    type: String,
    default: 'rgba(75, 85, 99, 0.3)'
  },
  transition: {
    type: String,
    default: 'all 0.3s ease'
  },
  hoverScale: {
    type: Number,
    default: 1.02,
    min: [1, 'Hover scale must be at least 1'],
    max: [1.2, 'Hover scale cannot exceed 1.2']
  },
  glowIntensity: {
    type: Number,
    default: 0.5,
    min: [0, 'Glow intensity cannot be negative'],
    max: [1, 'Glow intensity cannot exceed 1']
  }
});

const profileCardSchema = new Schema<IProfileCardSettings>({
  enableTilt: {
    type: Boolean,
    default: true
  },
  tiltMaxAngle: {
    type: Number,
    default: 15,
    min: [0, 'Tilt angle cannot be negative'],
    max: [45, 'Tilt angle cannot exceed 45 degrees']
  },
  tiltReverse: {
    type: Boolean,
    default: false
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
  cardOpacity: {
    type: Number,
    default: 0.8,
    min: [0, 'Card opacity cannot be negative'],
    max: [1, 'Card opacity cannot exceed 1']
  },
  borderRadius: {
    type: String,
    default: '1.5rem'
  },
  customColors: [{
    type: String,
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  }],
  animations: {
    hover: {
      type: Boolean,
      default: true
    },
    float: {
      type: Boolean,
      default: false
    },
    glow: {
      type: Boolean,
      default: true
    }
  }
});

const staggeredMenuSchema = new Schema<IStaggeredMenuSettings>({
  enabled: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    enum: ['horizontal', 'vertical'],
    default: 'horizontal'
  },
  staggerDelay: {
    type: Number,
    default: 0.1,
    min: [0, 'Stagger delay cannot be negative'],
    max: [1, 'Stagger delay cannot exceed 1 second']
  },
  animationDuration: {
    type: Number,
    default: 0.6,
    min: [0.1, 'Animation duration must be at least 0.1 seconds'],
    max: [3, 'Animation duration cannot exceed 3 seconds']
  },
  ease: {
    type: String,
    default: 'power2.out'
  },
  initialOpacity: {
    type: Number,
    default: 0,
    min: [0, 'Initial opacity cannot be negative'],
    max: [1, 'Initial opacity cannot exceed 1']
  },
  finalOpacity: {
    type: Number,
    default: 1,
    min: [0, 'Final opacity cannot be negative'],
    max: [1, 'Final opacity cannot exceed 1']
  },
  transform: {
    initial: {
      type: String,
      default: 'translateY(30px)'
    },
    final: {
      type: String,
      default: 'translateY(0px)'
    }
  },
  socialLinks: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      match: [/^https?:\/\/.*/, 'Please enter a valid URL']
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#8B5CF6'
    },
    order: {
      type: Number,
      default: 0
    }
  }]
});

// Indexes for performance
uiEffectsSchema.index({ type: 1, isActive: 1 });
uiEffectsSchema.index({ name: 1 });

export const UIEffects = mongoose.model<IUIEffects>('UIEffects', uiEffectsSchema);
export const DitherEffect = mongoose.model<IDitherSettings>('DitherEffect', ditherEffectSchema);
export const SpotlightCard = mongoose.model<ISpotlightSettings>('SpotlightCard', spotlightCardSchema);
export const ProfileCard = mongoose.model<IProfileCardSettings>('ProfileCard', profileCardSchema);
export const StaggeredMenu = mongoose.model<IStaggeredMenuSettings>('StaggeredMenu', staggeredMenuSchema);