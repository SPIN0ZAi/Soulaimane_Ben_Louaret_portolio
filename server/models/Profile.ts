import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ISkill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface IExperience {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies?: string[];
  isCurrentJob: boolean;
}

export interface IEducation {
  degree: string;
  institution: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  gpa?: string;
  description?: string;
  isCurrentStudy: boolean;
}

export interface IProfile extends Document {
  _id: string;
  fullName: string;
  title: string;
  bio: string;
  shortBio: string;
  email: string;
  phone?: string;
  location: string;
  profileImage?: string;
  resumeUrl?: string;
  skills: ISkill[];
  socialLinks: ISocialLink[];
  experience: IExperience[];
  education: IEducation[];
  languages: {
    name: string;
    proficiency: 'native' | 'fluent' | 'conversational' | 'basic';
  }[];
  certifications: {
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialUrl?: string;
  }[];
  availability: {
    isAvailable: boolean;
    status: 'available' | 'busy' | 'not-available';
    message?: string;
  };
  stats: {
    projectsCompleted: number;
    yearsOfExperience: number;
    clientsSatisfied: number;
    linesOfCode: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const socialLinkSchema = new Schema<ISocialLink>({
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid URL']
  },
  icon: {
    type: String,
    trim: true
  }
});

const skillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'design', 'other'],
    required: [true, 'Skill category is required']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: [true, 'Skill level is required']
  },
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative']
  }
});

const experienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  isCurrentJob: {
    type: Boolean,
    default: false
  }
});

const educationSchema = new Schema<IEducation>({
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'Institution is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  gpa: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isCurrentStudy: {
    type: Boolean,
    default: false
  }
});

const profileSchema = new Schema<IProfile>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Professional title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxlength: [2000, 'Bio cannot exceed 2000 characters']
  },
  shortBio: {
    type: String,
    required: [true, 'Short bio is required'],
    trim: true,
    maxlength: [300, 'Short bio cannot exceed 300 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  profileImage: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid image URL']
  },
  resumeUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*/, 'Please enter a valid URL']
  },
  skills: [skillSchema],
  socialLinks: [socialLinkSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  languages: [{
    name: {
      type: String,
      required: [true, 'Language name is required'],
      trim: true
    },
    proficiency: {
      type: String,
      enum: ['native', 'fluent', 'conversational', 'basic'],
      required: [true, 'Language proficiency is required']
    }
  }],
  certifications: [{
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true
    },
    issuer: {
      type: String,
      required: [true, 'Certification issuer is required'],
      trim: true
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required']
    },
    expiryDate: {
      type: Date
    },
    credentialUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, 'Please enter a valid URL']
    }
  }],
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['available', 'busy', 'not-available'],
      default: 'available'
    },
    message: {
      type: String,
      trim: true
    }
  },
  stats: {
    projectsCompleted: {
      type: Number,
      default: 0,
      min: [0, 'Projects completed cannot be negative']
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: [0, 'Years of experience cannot be negative']
    },
    clientsSatisfied: {
      type: Number,
      default: 0,
      min: [0, 'Clients satisfied cannot be negative']
    },
    linesOfCode: {
      type: Number,
      default: 0,
      min: [0, 'Lines of code cannot be negative']
    }
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

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);