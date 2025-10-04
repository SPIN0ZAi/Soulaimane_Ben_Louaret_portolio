import { Request, Response } from 'express';
import { 
  UIEffects, 
  DitherEffect, 
  SpotlightCard, 
  ProfileCard, 
  StaggeredMenu,
  IDitherSettings,
  ISpotlightSettings,
  IProfileCardSettings,
  IStaggeredMenuSettings
} from '../models/UIEffects';
import { validationResult } from 'express-validator';

// Get all UI effects
export const getAllEffects = async (req: Request, res: Response) => {
  try {
    const { type, active } = req.query;
    
    const filter: any = {};
    if (type) filter.type = type;
    if (active !== undefined) filter.isActive = active === 'true';
    
    const effects = await UIEffects.find(filter).sort({ type: 1, name: 1 });
    
    res.json({
      success: true,
      data: effects,
      count: effects.length
    });
  } catch (error) {
    console.error('Get all effects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve UI effects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get effect by ID
export const getEffectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const effect = await UIEffects.findById(id);
    if (!effect) {
      return res.status(404).json({
        success: false,
        message: 'UI effect not found'
      });
    }
    
    res.json({
      success: true,
      data: effect
    });
  } catch (error) {
    console.error('Get effect by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve UI effect',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Create new UI effect
export const createEffect = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const effect = new UIEffects(req.body);
    await effect.save();
    
    res.status(201).json({
      success: true,
      data: effect,
      message: 'UI effect created successfully'
    });
  } catch (error: any) {
    console.error('Create effect error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Effect with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create UI effect',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Update UI effect
export const updateEffect = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const effect = await UIEffects.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!effect) {
      return res.status(404).json({
        success: false,
        message: 'UI effect not found'
      });
    }
    
    res.json({
      success: true,
      data: effect,
      message: 'UI effect updated successfully'
    });
  } catch (error) {
    console.error('Update effect error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update UI effect',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Delete UI effect
export const deleteEffect = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const effect = await UIEffects.findByIdAndDelete(id);
    if (!effect) {
      return res.status(404).json({
        success: false,
        message: 'UI effect not found'
      });
    }
    
    res.json({
      success: true,
      message: 'UI effect deleted successfully'
    });
  } catch (error) {
    console.error('Delete effect error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete UI effect',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Dither Effect specific endpoints
export const getDitherSettings = async (req: Request, res: Response) => {
  try {
    const ditherEffect = await UIEffects.findOne({ type: 'dither', isActive: true });
    
    if (!ditherEffect) {
      // Return default settings if none exist
      const defaultSettings: IDitherSettings = {
        waveColor: [0.54, 0.36, 0.96],
        colorNum: 6,
        waveAmplitude: 0.25,
        waveFrequency: 2.5,
        enableMouseInteraction: true,
        animationSpeed: 1.0,
        intensity: 0.8,
        coverage: 'section',
        zIndex: 1000
      } as IDitherSettings;
      
      return res.json({
        success: true,
        data: defaultSettings,
        message: 'Default dither settings returned'
      });
    }
    
    res.json({
      success: true,
      data: ditherEffect.componentSettings || ditherEffect.globalSettings
    });
  } catch (error) {
    console.error('Get dither settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dither settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

export const updateDitherSettings = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    let ditherEffect = await UIEffects.findOne({ type: 'dither' });
    
    if (!ditherEffect) {
      // Create new dither effect if none exists
      ditherEffect = new UIEffects({
        name: 'Default Dither Effect',
        type: 'dither',
        isActive: true,
        componentSettings: req.body
      });
    } else {
      ditherEffect.componentSettings = { ...ditherEffect.componentSettings, ...req.body };
      ditherEffect.updatedAt = new Date();
    }
    
    await ditherEffect.save();
    
    res.json({
      success: true,
      data: ditherEffect.componentSettings,
      message: 'Dither settings updated successfully'
    });
  } catch (error) {
    console.error('Update dither settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update dither settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Spotlight Card specific endpoints
export const getSpotlightSettings = async (req: Request, res: Response) => {
  try {
    const spotlightEffect = await UIEffects.findOne({ type: 'spotlight', isActive: true });
    
    if (!spotlightEffect) {
      const defaultSettings: ISpotlightSettings = {
        enabled: true,
        spotlightColor: 'rgba(139, 92, 246, 0.3)',
        spotlightSize: 200,
        borderRadius: '1.5rem',
        backgroundColor: 'rgba(15, 15, 15, 0.95)',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        transition: 'all 0.3s ease',
        hoverScale: 1.02,
        glowIntensity: 0.5
      } as ISpotlightSettings;
      
      return res.json({
        success: true,
        data: defaultSettings,
        message: 'Default spotlight settings returned'
      });
    }
    
    res.json({
      success: true,
      data: spotlightEffect.componentSettings || spotlightEffect.globalSettings
    });
  } catch (error) {
    console.error('Get spotlight settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve spotlight settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

export const updateSpotlightSettings = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    let spotlightEffect = await UIEffects.findOne({ type: 'spotlight' });
    
    if (!spotlightEffect) {
      spotlightEffect = new UIEffects({
        name: 'Default Spotlight Effect',
        type: 'spotlight',
        isActive: true,
        componentSettings: req.body
      });
    } else {
      spotlightEffect.componentSettings = { ...spotlightEffect.componentSettings, ...req.body };
      spotlightEffect.updatedAt = new Date();
    }
    
    await spotlightEffect.save();
    
    res.json({
      success: true,
      data: spotlightEffect.componentSettings,
      message: 'Spotlight settings updated successfully'
    });
  } catch (error) {
    console.error('Update spotlight settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update spotlight settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Profile Card specific endpoints
export const getProfileCardSettings = async (req: Request, res: Response) => {
  try {
    const profileCardEffect = await UIEffects.findOne({ type: 'profile-card', isActive: true });
    
    if (!profileCardEffect) {
      const defaultSettings: IProfileCardSettings = {
        enableTilt: true,
        tiltMaxAngle: 15,
        tiltReverse: false,
        behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(262, 100%, 88%, var(--card-opacity)) 4%, hsla(262, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(262, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(262, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #8B5CF6 0%, #06B6D4 40%, #06B6D4 60%, #8B5CF6 100%)',
        innerGradient: 'linear-gradient(145deg, rgba(30, 27, 75, 0.9) 0%, rgba(67, 56, 202, 0.3) 100%)',
        showBehindGradient: true,
        cardOpacity: 0.8,
        borderRadius: '1.5rem',
        customColors: ['#8B5CF6', '#06B6D4'],
        animations: {
          hover: true,
          float: false,
          glow: true
        }
      } as IProfileCardSettings;
      
      return res.json({
        success: true,
        data: defaultSettings,
        message: 'Default profile card settings returned'
      });
    }
    
    res.json({
      success: true,
      data: profileCardEffect.componentSettings || profileCardEffect.globalSettings
    });
  } catch (error) {
    console.error('Get profile card settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile card settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

export const updateProfileCardSettings = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    let profileCardEffect = await UIEffects.findOne({ type: 'profile-card' });
    
    if (!profileCardEffect) {
      profileCardEffect = new UIEffects({
        name: 'Default Profile Card Effect',
        type: 'profile-card',
        isActive: true,
        componentSettings: req.body
      });
    } else {
      profileCardEffect.componentSettings = { ...profileCardEffect.componentSettings, ...req.body };
      profileCardEffect.updatedAt = new Date();
    }
    
    await profileCardEffect.save();
    
    res.json({
      success: true,
      data: profileCardEffect.componentSettings,
      message: 'Profile card settings updated successfully'
    });
  } catch (error) {
    console.error('Update profile card settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile card settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Staggered Menu specific endpoints
export const getStaggeredMenuSettings = async (req: Request, res: Response) => {
  try {
    const staggeredMenuEffect = await UIEffects.findOne({ type: 'staggered-menu', isActive: true });
    
    if (!staggeredMenuEffect) {
      const defaultSettings: IStaggeredMenuSettings = {
        enabled: true,
        direction: 'horizontal',
        staggerDelay: 0.1,
        animationDuration: 0.6,
        ease: 'power2.out',
        initialOpacity: 0,
        finalOpacity: 1,
        transform: {
          initial: 'translateY(30px)',
          final: 'translateY(0px)'
        },
        socialLinks: [
          {
            name: 'GitHub',
            url: 'https://github.com/soulaimane',
            icon: 'github',
            color: '#8B5CF6',
            order: 1
          },
          {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/soulaimane',
            icon: 'linkedin',
            color: '#06B6D4',
            order: 2
          }
        ]
      } as IStaggeredMenuSettings;
      
      return res.json({
        success: true,
        data: defaultSettings,
        message: 'Default staggered menu settings returned'
      });
    }
    
    res.json({
      success: true,
      data: staggeredMenuEffect.componentSettings || staggeredMenuEffect.globalSettings
    });
  } catch (error) {
    console.error('Get staggered menu settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve staggered menu settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

export const updateStaggeredMenuSettings = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    let staggeredMenuEffect = await UIEffects.findOne({ type: 'staggered-menu' });
    
    if (!staggeredMenuEffect) {
      staggeredMenuEffect = new UIEffects({
        name: 'Default Staggered Menu Effect',
        type: 'staggered-menu',
        isActive: true,
        componentSettings: req.body
      });
    } else {
      staggeredMenuEffect.componentSettings = { ...staggeredMenuEffect.componentSettings, ...req.body };
      staggeredMenuEffect.updatedAt = new Date();
    }
    
    await staggeredMenuEffect.save();
    
    res.json({
      success: true,
      data: staggeredMenuEffect.componentSettings,
      message: 'Staggered menu settings updated successfully'
    });
  } catch (error) {
    console.error('Update staggered menu settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update staggered menu settings',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Bulk operations
export const toggleEffect = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const effect = await UIEffects.findByIdAndUpdate(
      id,
      { isActive, updatedAt: new Date() },
      { new: true }
    );
    
    if (!effect) {
      return res.status(404).json({
        success: false,
        message: 'UI effect not found'
      });
    }
    
    res.json({
      success: true,
      data: effect,
      message: `Effect ${isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Toggle effect error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle effect',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

export const getActiveEffects = async (req: Request, res: Response) => {
  try {
    const activeEffects = await UIEffects.find({ isActive: true }).sort({ type: 1 });
    
    res.json({
      success: true,
      data: activeEffects,
      count: activeEffects.length
    });
  } catch (error) {
    console.error('Get active effects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve active effects',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};