import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'game' | 'ai' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  priority: number;
  startDate?: Date;
  endDate?: Date;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
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
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  isPublic: {
    type: Boolean,
    default: true
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

// Index for better query performance
projectSchema.index({ category: 1, status: 1, priority: -1 });
projectSchema.index({ isPublic: 1, createdAt: -1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);