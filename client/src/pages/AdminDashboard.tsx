import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LogOut,
  Save,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Flame,
  Star,
  Check,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  Mail,
  User,
  FolderGit2,
  Milestone,
  Trophy,
  GraduationCap,
  Sparkles,
  Palette,
  Send,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';
import {
  usePortfolio,
  ProjectItem,
  JourneyItem,
  AchievementItem,
  AcademicYearItem,
  SkillGroupItem
} from '@/context/PortfolioContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DotMatrix from '@/components/ui/DotMatrix';

type AdminTab =
  | 'hero'
  | 'projects'
  | 'journey'
  | 'achievements'
  | 'education'
  | 'skills'
  | 'cta'
  | 'theme'
  | 'messages'
  | 'backup';

export default function AdminDashboard() {
  const {
    data,
    isAdmin,
    messages,
    login,
    logout,
    changeAdminPassword,
    updateHero,
    updateTheme,
    updateCta,
    updateContact,
    updateAchievements,
    addProject,
    updateProject,
    deleteProject,
    addJourneyStep,
    updateJourneyStep,
    deleteJourneyStep,
    addAchievementItem,
    updateAchievementItem,
    deleteAchievementItem,
    updateEducation,
    updateSkills,
    addMessage,
    deleteMessage,
    markMessageRead,
    exportDataJson,
    importDataJson,
    resetToDefaults
  } = usePortfolio();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(5);
  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    try {
      const lock = localStorage.getItem('soulaimane_auth_lockout');
      if (lock) {
        const val = parseInt(lock, 10);
        if (val > Date.now()) return val;
      }
    } catch {}
    return 0;
  });

  // Password change state
  const [currentPassChange, setCurrentPassChange] = useState('');
  const [newPassChange, setNewPassChange] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Modal / Form state for Projects
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: '',
    repoName: '',
    category: 'Systems & Native Desktop',
    badge: 'Open Source',
    badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
    oneLiner: '',
    description: '',
    tech: ['TypeScript', 'React'],
    features: ['High performance', 'Modern architecture'],
    githubUrl: 'https://github.com/SPIN0ZAi/',
    liveUrl: '',
    liveUrlLabel: 'Live App',
    image: '/images/nup-extractor.png',
    stars: 0,
    isFlagship: false,
    isFeatured: true
  });

  // Modal / Form state for Journey
  const [editingJourney, setEditingJourney] = useState<JourneyItem | null>(null);
  const [isAddingJourney, setIsAddingJourney] = useState(false);
  const [journeyForm, setJourneyForm] = useState<Partial<JourneyItem>>({
    step: '6',
    year: '2027 · Future Milestone',
    title: 'New Milestone',
    subtitle: 'Achievement description',
    description: 'Detailed description of the engineering milestone.',
    tags: ['Systems', 'Distributed Tech']
  });

  // Modal / Form state for Achievements
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [achievementForm, setAchievementForm] = useState<Partial<AchievementItem>>({
    num: '5',
    title: 'Honors & Recognition',
    description: 'Recognized for outstanding engineering and systems contribution.'
  });

  // Import JSON input
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  // Handle Secure Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Date.now() < lockoutUntil) {
      const remainingSecs = Math.ceil((lockoutUntil - Date.now()) / 1000);
      toast({
        variant: 'destructive',
        title: 'Security Lockout Active',
        description: `Too many failed attempts. Try again in ${remainingSecs} seconds.`
      });
      return;
    }

    if (!passwordInput.trim()) return;

    setIsVerifying(true);
    const success = await login(passwordInput.trim());
    setIsVerifying(false);

    if (success) {
      setLoginError(false);
      setPasswordInput('');
      setAttemptsLeft(5);
      try {
        localStorage.removeItem('soulaimane_auth_lockout');
      } catch {}
      toast({
        title: 'Access Granted',
        description: 'Identity cryptographically verified. Welcome back Soulaimane!'
      });
    } else {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      setLoginError(true);

      if (remaining <= 0) {
        const lock = Date.now() + 15 * 60 * 1000;
        setLockoutUntil(lock);
        try {
          localStorage.setItem('soulaimane_auth_lockout', lock.toString());
        } catch {}
        toast({
          variant: 'destructive',
          title: 'Account Locked Out',
          description: 'Too many incorrect attempts. Security lockout active for 15 minutes.'
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: `Invalid master security key. (${remaining} attempts remaining)`
        });
      }
    }
  };

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soulaimane-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Configuration Exported',
      description: 'Your complete portfolio settings have been downloaded as a JSON backup.'
    });
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJson(importJsonText);
    if (ok) {
      setShowImportBox(false);
      setImportJsonText('');
      toast({
        title: 'Import Successful',
        description: 'Portfolio configuration restored from JSON.'
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: 'Invalid JSON format. Please verify the syntax.'
      });
    }
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset all portfolio customization to factory defaults?')) {
      resetToDefaults();
      toast({
        title: 'Defaults Restored',
        description: 'Reset to original Stygar-designed portfolio specifications.'
      });
    }
  };

  // If not logged in, show Stygar-themed Admin Login Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Ambient red glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#3D0000]/30 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#FF0000]/15 blur-[130px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#0a0202] border border-[#3D0000] p-8 rounded-3xl shadow-2xl relative z-10"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3D0000]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#3D0000]/50 border border-[#950101]/60 text-[#FF0000]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black font-heading tracking-tight text-white uppercase">
                  Admin Portal
                </h1>
                <p className="text-xs text-zinc-400 font-mono">Soulaimane Ben Louaret</p>
              </div>
            </div>
            <DotMatrix />
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {Date.now() < lockoutUntil ? (
              <div className="p-4 rounded-2xl bg-[#3D0000]/40 border border-[#FF0000] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#FF0000] block uppercase tracking-wider">
                  ⚠️ Security Lockout Active
                </span>
                <p className="text-[11px] font-mono text-zinc-300">
                  Multiple incorrect attempts detected. Access is temporarily locked.
                </p>
                <span className="text-[10px] font-mono text-zinc-400 block pt-1">
                  Please wait before attempting verification again.
                </span>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2 flex items-center justify-between">
                  <span>Master Security Key</span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {attemptsLeft < 5 ? `${attemptsLeft} tries left` : 'Protected Access'}
                  </span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter master key..."
                    value={passwordInput}
                    disabled={isVerifying}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="bg-black/90 border-[#3D0000] focus:border-[#FF0000] text-white font-mono text-sm h-12 pr-11"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    title={showPassword ? 'Hide key' : 'Show key'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-xs text-[#FF0000] mt-1.5 font-mono">
                    Verification failed. Invalid master key.
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={Date.now() < lockoutUntil || isVerifying || !passwordInput.trim()}
              className="w-full h-12 bg-[#FF0000] hover:bg-[#d60000] text-white font-bold tracking-wide transition-all shadow-lg shadow-[#FF0000]/25 rounded-xl disabled:opacity-50"
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Verifying Hash...
                </span>
              ) : (
                'Authenticate as Admin'
              )}
            </Button>
          </form>

          {/* Secure Security Info */}
          <div className="mt-6 pt-5 border-t border-[#3D0000]/70 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Lock className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>SHA-256 Cryptographic Hash</span>
            </span>
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              Back to Portfolio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="min-h-screen bg-black text-[#f4f4f6] font-sans flex flex-col selection:bg-[#FF0000]/30 selection:text-[#FF0000]">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#3D0000] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-[#3D0000]/40 border border-[#950101]/60 text-[#FF0000]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black tracking-tight text-white text-base uppercase">
                Soulaimane Control Hub
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40">
                LIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">Full portfolio customization & live sync</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-black/60 border-[#3D0000] text-zinc-300 hover:text-white hover:border-[#FF0000] text-xs h-9 gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF0000]" />
              <span className="hidden sm:inline">View Live Site</span>
            </Button>
          </Link>

          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="bg-black/60 border-[#3D0000] text-zinc-300 hover:text-white hover:border-[#FF0000] text-xs h-9 gap-1.5"
            title="Download full portfolio backup JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </Button>

          <Button
            onClick={handleResetConfirm}
            variant="outline"
            size="sm"
            className="bg-black/60 border-[#3D0000] text-zinc-400 hover:text-[#FF0000] hover:border-[#FF0000] text-xs h-9 gap-1.5"
            title="Reset to factory Stygar defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </Button>

          <Button
            onClick={logout}
            size="sm"
            className="bg-[#3D0000]/60 hover:bg-[#950101] text-white border border-[#950101] text-xs h-9 gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
        </div>
      </header>

      {/* Main Layout: Left Tab Sidebar + Right Content Workspace */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-[#0c0303] border border-[#3D0000] rounded-2xl p-2.5 space-y-1 shadow-lg">
            {[
              { id: 'hero', label: 'Hero & Identity', icon: User },
              { id: 'projects', label: 'Projects (CRUD)', icon: FolderGit2, badge: `${data.projects.length}` },
              { id: 'journey', label: 'Journey Timeline', icon: Milestone, badge: `${data.journey.length}` },
              { id: 'achievements', label: 'Achievements', icon: Trophy, badge: `${data.achievements.items.length}` },
              { id: 'education', label: 'Education & Courses', icon: GraduationCap },
              { id: 'skills', label: 'Technical Stack', icon: Layers },
              { id: 'cta', label: 'CTA & Contact Info', icon: Send },
              { id: 'theme', label: 'Brand & Visuals', icon: Palette },
              {
                id: 'messages',
                label: 'Inquiries Inbox',
                icon: Mail,
                badge: `${messages.filter((m) => !m.isRead).length}`,
                badgeAlert: messages.some((m) => !m.isRead)
              },
              { id: 'backup', label: 'Backup & Restore', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left ${
                    isActive
                      ? 'bg-[#FF0000] text-white font-bold shadow-md shadow-[#FF0000]/25'
                      : 'text-zinc-400 hover:text-white hover:bg-[#3D0000]/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tab.badgeAlert
                          ? 'bg-[#FF0000] text-white animate-pulse'
                          : isActive
                          ? 'bg-black/30 text-white'
                          : 'bg-[#3D0000]/60 text-zinc-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="bg-[#080202] border border-[#3D0000]/60 rounded-2xl p-4 text-xs font-mono text-zinc-400 space-y-2">
            <div className="flex items-center gap-1.5 text-zinc-200 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>Instant Live Preview</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Any changes saved here immediately update the website without redeployment.
            </p>
          </div>
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 bg-[#090202] border border-[#3D0000] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          {/* ============================================================== */}
          {/* 1. HERO & IDENTITY TAB */}
          {/* ============================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Hero Section &amp; Personal Identity
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Configure names, headline, background outline text, avatar, and top metrics.
                  </p>
                </div>
                <DotMatrix />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Full Legal Name
                  </label>
                  <Input
                    value={data.hero.fullName}
                    onChange={(e) => updateHero({ fullName: e.target.value })}
                    className="bg-black border-[#3D0000] text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    GitHub / Handle Nickname
                  </label>
                  <Input
                    value={data.hero.nickname}
                    onChange={(e) => updateHero({ nickname: e.target.value })}
                    className="bg-black border-[#3D0000] text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Background Big Outline Text (Behind Avatar)
                  </label>
                  <Input
                    value={data.hero.outlineText}
                    onChange={(e) => updateHero({ outlineText: e.target.value.toUpperCase() })}
                    className="bg-black border-[#3D0000] text-[#FF0000] font-mono text-sm tracking-widest uppercase"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                    Displays in giant outline typography behind the 3D character (e.g. SOULAIMANE)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                    Availability Pill Badge
                  </label>
                  <Input
                    value={data.hero.availabilityBadge}
                    onChange={(e) => updateHero({ availabilityBadge: e.target.value })}
                    className="bg-black border-[#3D0000] text-white text-sm"
                  />
                </div>
              </div>

              {/* Headline Split with Crop Box Word */}
              <div className="bg-black/60 border border-[#3D0000] p-4 rounded-2xl space-y-4">
                <div className="text-xs font-mono text-zinc-300 uppercase flex items-center justify-between">
                  <span>Headline Breakdown (with Technical Crop Box)</span>
                  <span className="text-[10px] text-[#FF0000]">Style: Stygar [ Word ]</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Prefix</label>
                    <Input
                      value={data.hero.headlinePrefix}
                      onChange={(e) => updateHero({ headlinePrefix: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#FF0000] mb-1 font-bold">
                      Crop Box Bracket Word
                    </label>
                    <Input
                      value={data.hero.headlineCropWord}
                      onChange={(e) => updateHero({ headlineCropWord: e.target.value })}
                      className="bg-black border-[#FF0000] text-[#FF0000] text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Suffix</label>
                    <Input
                      value={data.hero.headlineSuffix}
                      onChange={(e) => updateHero({ headlineSuffix: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Main Bio */}
              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                  Main Bio Paragraph
                </label>
                <Textarea
                  rows={4}
                  value={data.hero.bio}
                  onChange={(e) => updateHero({ bio: e.target.value })}
                  className="bg-black border-[#3D0000] text-white text-sm leading-relaxed"
                />
              </div>

              {/* Character Avatar Image */}
              <div className="bg-black/60 border border-[#3D0000] p-4 rounded-2xl space-y-3">
                <label className="block text-xs font-mono text-zinc-300 uppercase">
                  3D Character Avatar Image URL
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl bg-[#0e0303] border border-[#FF0000]/40 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={data.hero.avatarUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <Input
                      value={data.hero.avatarUrl}
                      onChange={(e) => updateHero({ avatarUrl: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs font-mono"
                      placeholder="/images/soulaimane-3d.png?v=2 or https://..."
                    />
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                      <span className="text-zinc-500">Quick Presets:</span>
                      <button
                        type="button"
                        onClick={() => updateHero({ avatarUrl: '/images/soulaimane-3d.png?v=2' })}
                        className="text-[#FF0000] underline"
                      >
                        Transparent 3D Avatar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Metrics Counters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-heading font-black text-white uppercase tracking-tight">
                    Bottom Metrics Bar (4 Cards)
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">Displayed below hero</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.hero.metrics.map((metric, idx) => (
                    <div
                      key={metric.id || idx}
                      className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>Metric #{idx + 1}</span>
                        <span className="text-[#FF0000]">●</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400">Value (Large)</label>
                          <Input
                            value={metric.value}
                            onChange={(e) => {
                              const updated = [...data.hero.metrics];
                              updated[idx].value = e.target.value;
                              updateHero({ metrics: updated });
                            }}
                            className="bg-black border-[#3D0000] text-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-zinc-400">Label</label>
                          <Input
                            value={metric.label}
                            onChange={(e) => {
                              const updated = [...data.hero.metrics];
                              updated[idx].label = e.target.value;
                              updateHero({ metrics: updated });
                            }}
                            className="bg-black border-[#3D0000] text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={() => toast({ title: 'Saved', description: 'Hero section updated successfully!' })}
                  className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-10 px-6 gap-2"
                >
                  <Save className="w-4 h-4" /> Save Hero Changes
                </Button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 2. PROJECTS (CRUD) TAB */}
          {/* ============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Projects Management (CRUD)
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Create, edit, toggle featured, and manage GitHub star counts for all works.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsAddingProject(true);
                    setEditingProject(null);
                  }}
                  className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-9 px-4 gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </Button>
              </div>

              {/* Add / Edit Project Form Modal / Drawer */}
              {(isAddingProject || editingProject) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0e0303] border-2 border-[#FF0000] p-6 rounded-3xl space-y-4 shadow-2xl relative"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#3D0000]">
                    <h3 className="text-sm font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#FF0000]" />
                      {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Title</label>
                      <Input
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="nup-extractor"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Repository Name</label>
                      <Input
                        value={projectForm.repoName}
                        onChange={(e) => setProjectForm({ ...projectForm, repoName: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="nup-extractor"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Category</label>
                      <Input
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="Systems & Native Desktop"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Badge Text</label>
                      <Input
                        value={projectForm.badge}
                        onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="Flagship Tool · 60+ Stars"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">GitHub Stars Count</label>
                      <Input
                        type="number"
                        value={projectForm.stars || 0}
                        onChange={(e) => setProjectForm({ ...projectForm, stars: parseInt(e.target.value) || 0 })}
                        className="bg-black border-[#3D0000] text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Image URL</label>
                      <Input
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="/images/nup-extractor.png"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">GitHub URL</label>
                      <Input
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="https://github.com/SPIN0ZAi/..."
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Live Demo URL (Optional)</label>
                      <Input
                        value={projectForm.liveUrl || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                      One-Liner (Compact Card Preview)
                    </label>
                    <Input
                      value={projectForm.oneLiner}
                      onChange={(e) => setProjectForm({ ...projectForm, oneLiner: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                      placeholder="Native desktop GUI for inspecting and extracting clean-room .nup archives."
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                      Full Description (Expanded View)
                    </label>
                    <Textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                        Technologies (Comma Separated)
                      </label>
                      <Input
                        value={projectForm.tech?.join(', ')}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          })
                        }
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="C#, .NET 10, Avalonia, Rust"
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-5">
                      <label className="flex items-center gap-2 text-xs font-mono text-zinc-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.isFeatured ?? true}
                          onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                          className="accent-[#FF0000] w-4 h-4"
                        />
                        <span>Featured 2x2 Grid</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-mono text-zinc-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.isFlagship ?? false}
                          onChange={(e) => setProjectForm({ ...projectForm, isFlagship: e.target.checked })}
                          className="accent-[#FF0000] w-4 h-4"
                        />
                        <span>Flagship Project</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="border-[#3D0000] text-zinc-300 text-xs h-9"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingProject) {
                          updateProject(editingProject.id, projectForm);
                          toast({ title: 'Project Updated', description: `${projectForm.title} saved.` });
                        } else {
                          addProject(projectForm as any);
                          toast({ title: 'Project Added', description: `${projectForm.title} created.` });
                        }
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-9 px-6"
                    >
                      {editingProject ? 'Save Changes' : 'Create Project'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-black/80 border border-[#3D0000] hover:border-[#950101] p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#0f0404] border border-[#3D0000] overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as any).src = '/images/nup-extractor.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-black text-white text-sm">
                            {proj.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/60 text-[#FF0000] border border-[#FF0000]/40">
                            {proj.category}
                          </span>
                          {proj.isFeatured && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF0000]/20 text-white border border-[#FF0000]/60">
                              ★ Featured
                            </span>
                          )}
                          <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#FF0000] fill-[#FF0000]" />
                            {proj.stars || 0}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                          {proj.oneLiner || proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectForm(proj);
                          setIsAddingProject(false);
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-300 hover:text-white text-xs h-8 px-3 gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-[#FF0000]" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            toast({ title: 'Deleted', description: `${proj.title} deleted.` });
                          }
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-400 hover:text-[#FF0000] text-xs h-8 px-2.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. JOURNEY TIMELINE TAB */}
          {/* ============================================================== */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    The Journey Timeline (CRUD)
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    The continuous winding red path connecting milestones on scroll.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsAddingJourney(true);
                    setEditingJourney(null);
                  }}
                  className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-9 px-4 gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" /> Add Milestone
                </Button>
              </div>

              {/* Form Modal for Journey */}
              {(isAddingJourney || editingJourney) && (
                <div className="bg-[#0e0303] border-2 border-[#FF0000] p-6 rounded-3xl space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#3D0000]">
                    <h3 className="text-sm font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <Milestone className="w-4 h-4 text-[#FF0000]" />
                      {editingJourney ? `Edit Milestone #${editingJourney.step}` : 'Add Milestone'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingJourney(false);
                        setEditingJourney(null);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Step Number</label>
                      <Input
                        value={journeyForm.step}
                        onChange={(e) => setJourneyForm({ ...journeyForm, step: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs font-mono"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Year / Period</label>
                      <Input
                        value={journeyForm.year}
                        onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="2024–25 · Year 1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Title</label>
                      <Input
                        value={journeyForm.title}
                        onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                        placeholder="Foundations of Computing"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Subtitle</label>
                    <Input
                      value={journeyForm.subtitle}
                      onChange={(e) => setJourneyForm({ ...journeyForm, subtitle: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                      placeholder="100% Passed · UCLM ESII Albacete"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Description</label>
                    <Textarea
                      rows={3}
                      value={journeyForm.description}
                      onChange={(e) => setJourneyForm({ ...journeyForm, description: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                      Tags (Comma Separated)
                    </label>
                    <Input
                      value={journeyForm.tags?.join(', ')}
                      onChange={(e) =>
                        setJourneyForm({
                          ...journeyForm,
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        })
                      }
                      className="bg-black border-[#3D0000] text-white text-xs"
                      placeholder="Algorithms, Discrete Math, RISC-V"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingJourney(false);
                        setEditingJourney(null);
                      }}
                      className="border-[#3D0000] text-zinc-300 text-xs h-9"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingJourney) {
                          updateJourneyStep(editingJourney.id, journeyForm);
                          toast({ title: 'Milestone Updated' });
                        } else {
                          addJourneyStep(journeyForm as any);
                          toast({ title: 'Milestone Added' });
                        }
                        setIsAddingJourney(false);
                        setEditingJourney(null);
                      }}
                      className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-9 px-6"
                    >
                      {editingJourney ? 'Save Changes' : 'Create Milestone'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Journey Nodes List */}
              <div className="space-y-3">
                {data.journey.map((node) => (
                  <div
                    key={node.id}
                    className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#3D0000]/40 border border-[#FF0000]/60 flex items-center justify-center font-mono font-black text-[#FF0000] shrink-0">
                        {node.step}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-black text-white text-sm">
                            {node.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#FF0000]">
                            {node.year}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">{node.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingJourney(node);
                          setJourneyForm(node);
                          setIsAddingJourney(false);
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-300 hover:text-white text-xs h-8 px-3 gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-[#FF0000]" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (window.confirm(`Delete milestone "${node.title}"?`)) {
                            deleteJourneyStep(node.id);
                            toast({ title: 'Deleted' });
                          }
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-400 hover:text-[#FF0000] text-xs h-8 px-2.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 4. ACHIEVEMENTS TAB */}
          {/* ============================================================== */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Achievements &amp; Big Year Graphic
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Configure the large stylized year graphic (e.g. 20 ::: 27) and milestone accolades.
                  </p>
                </div>
                <DotMatrix />
              </div>

              {/* Big Year Graphic Inputs */}
              <div className="bg-black/60 border border-[#3D0000] p-5 rounded-2xl space-y-4">
                <span className="text-xs font-mono text-zinc-300 uppercase block">
                  Large Stylized Year Graphic
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-zinc-400 block mb-1">Left Digits</label>
                    <Input
                      value={data.achievements.year1}
                      onChange={(e) => updateAchievements({ year1: e.target.value })}
                      className="bg-black border-[#FF0000]/60 text-[#FF0000] font-black text-2xl h-14 text-center font-heading"
                    />
                  </div>
                  <div className="pt-5">
                    <DotMatrix />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-zinc-400 block mb-1">Right Digits</label>
                    <Input
                      value={data.achievements.year2}
                      onChange={(e) => updateAchievements({ year2: e.target.value })}
                      className="bg-black border-[#FF0000]/60 text-[#FF0000] font-black text-2xl h-14 text-center font-heading"
                    />
                  </div>
                </div>
              </div>

              {/* Add / Edit Form */}
              {(isAddingAchievement || editingAchievement) && (
                <div className="bg-[#0e0303] border-2 border-[#FF0000] p-6 rounded-3xl space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#3D0000]">
                    <h3 className="text-sm font-heading font-black text-white uppercase tracking-tight">
                      {editingAchievement ? `Edit Achievement #${editingAchievement.num}` : 'Add Achievement'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingAchievement(false);
                        setEditingAchievement(null);
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Number</label>
                      <Input
                        value={achievementForm.num}
                        onChange={(e) => setAchievementForm({ ...achievementForm, num: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs font-mono"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-[11px] font-mono text-zinc-300 block mb-1">Title</label>
                      <Input
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                        className="bg-black border-[#3D0000] text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Description</label>
                    <Textarea
                      rows={3}
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingAchievement(false);
                        setEditingAchievement(null);
                      }}
                      className="border-[#3D0000] text-zinc-300 text-xs h-9"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingAchievement) {
                          updateAchievementItem(editingAchievement.id, achievementForm);
                          toast({ title: 'Achievement Updated' });
                        } else {
                          addAchievementItem(achievementForm as any);
                          toast({ title: 'Achievement Added' });
                        }
                        setIsAddingAchievement(false);
                        setEditingAchievement(null);
                      }}
                      className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-9 px-6"
                    >
                      {editingAchievement ? 'Save Changes' : 'Create Achievement'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Achievements Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-300 uppercase">Milestone Accolades</span>
                  <Button
                    onClick={() => {
                      setIsAddingAchievement(true);
                      setEditingAchievement(null);
                    }}
                    size="sm"
                    className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-8 px-3 gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </Button>
                </div>

                {data.achievements.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#3D0000]/40 border border-[#FF0000]/60 flex items-center justify-center font-mono font-bold text-[#FF0000] shrink-0">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-heading font-black text-white">{item.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-1">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingAchievement(item);
                          setAchievementForm(item);
                          setIsAddingAchievement(false);
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-300 hover:text-white text-xs h-8 px-3"
                      >
                        <Edit3 className="w-3 h-3 text-[#FF0000]" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (window.confirm(`Delete "${item.title}"?`)) {
                            deleteAchievementItem(item.id);
                            toast({ title: 'Deleted' });
                          }
                        }}
                        className="border-[#3D0000] hover:border-[#FF0000] text-zinc-400 hover:text-[#FF0000] text-xs h-8 px-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 5. EDUCATION & COURSES TAB */}
          {/* ============================================================== */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Education &amp; Coursework (UCLM)
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Manage academic years, institution, and passed subject badges.
                  </p>
                </div>
                <DotMatrix />
              </div>

              {data.education.map((yearBlock, yIdx) => (
                <div
                  key={yearBlock.id}
                  className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#3D0000]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#3D0000]/50 border border-[#FF0000]/40 text-[#FF0000]">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-white text-base">
                          {yearBlock.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400">
                          {yearBlock.institution} · {yearBlock.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#3D0000]/60 text-[#FF0000] border border-[#FF0000]/40 self-start">
                      {yearBlock.statusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">Status Label</label>
                      <Input
                        value={yearBlock.statusLabel}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[yIdx].statusLabel = e.target.value;
                          updateEducation(updated);
                        }}
                        className="bg-black border-[#3D0000] text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">Institution</label>
                      <Input
                        value={yearBlock.institution}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[yIdx].institution = e.target.value;
                          updateEducation(updated);
                        }}
                        className="bg-black border-[#3D0000] text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 block mb-1">Description</label>
                    <Textarea
                      rows={2}
                      value={yearBlock.description}
                      onChange={(e) => {
                        const updated = [...data.education];
                        updated[yIdx].description = e.target.value;
                        updateEducation(updated);
                      }}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>

                  {/* Subjects pills */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-400 block">
                      Subjects / Coursework Pills ({yearBlock.subjects.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {yearBlock.subjects.map((subj, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#140404] border border-[#3D0000] text-zinc-300 flex items-center gap-1.5"
                        >
                          <span>{subj.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...data.education];
                              updated[yIdx].subjects.splice(sIdx, 1);
                              updateEducation(updated);
                            }}
                            className="text-zinc-500 hover:text-[#FF0000]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================== */}
          {/* 6. TECHNICAL STACK TAB */}
          {/* ============================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Technical Capabilities &amp; Skills
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Manage skill groups, highlights, and note badges.
                  </p>
                </div>
                <DotMatrix />
              </div>

              <div className="space-y-6">
                {data.skills.map((group, gIdx) => (
                  <div
                    key={group.id}
                    className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#3D0000]">
                      <div>
                        <h3 className="font-heading font-black text-white text-base">
                          {group.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400">{group.subtitle}</p>
                      </div>
                      <span className="text-xs font-mono text-[#FF0000]">{group.skills.length} skills</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono border flex items-center gap-2 ${
                            skill.highlight
                              ? 'bg-[#3D0000]/50 border-[#FF0000]/60 text-white'
                              : 'bg-black border-[#3D0000] text-zinc-300'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...data.skills];
                              updated[gIdx].skills[sIdx].highlight = !skill.highlight;
                              updateSkills(updated);
                            }}
                            title="Toggle electric red highlight"
                            className={`w-2 h-2 rounded-full ${
                              skill.highlight ? 'bg-[#FF0000]' : 'bg-zinc-600'
                            }`}
                          />
                          <span>{skill.name}</span>
                          {skill.note && (
                            <span className="text-[10px] text-zinc-400">({skill.note})</span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...data.skills];
                              updated[gIdx].skills.splice(sIdx, 1);
                              updateSkills(updated);
                            }}
                            className="text-zinc-500 hover:text-[#FF0000] ml-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add new skill inline */}
                    <div className="pt-2 flex items-center gap-2">
                      <Input
                        id={`new-skill-${group.id}`}
                        placeholder="Add new skill..."
                        className="bg-black border-[#3D0000] text-white text-xs h-8 max-w-xs"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val) {
                              const updated = [...data.skills];
                              updated[gIdx].skills.push({ name: val, highlight: false });
                              updateSkills(updated);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <span className="text-[10px] font-mono text-zinc-500">Press Enter to add</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 7. CTA & CONTACT INFO TAB */}
          {/* ============================================================== */}
          {activeTab === 'cta' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Call To Action &amp; Contact Section
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Configure the CTA banner and public contact details.
                  </p>
                </div>
                <DotMatrix />
              </div>

              {/* CTA Banner */}
              <div className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4">
                <span className="text-xs font-mono text-[#FF0000] uppercase font-bold">
                  CTA Banner Card
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Title Prefix</label>
                    <Input
                      value={data.cta.title}
                      onChange={(e) => updateCta({ title: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#FF0000] block mb-1">
                      Highlighted Text (Red)
                    </label>
                    <Input
                      value={data.cta.titleHighlight}
                      onChange={(e) => updateCta({ titleHighlight: e.target.value })}
                      className="bg-black border-[#FF0000] text-[#FF0000] text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-300 block mb-1">Subtitle Copy</label>
                  <Textarea
                    rows={2}
                    value={data.cta.subtitle}
                    onChange={(e) => updateCta({ subtitle: e.target.value })}
                    className="bg-black border-[#3D0000] text-white text-xs"
                  />
                </div>
              </div>

              {/* Public Contact Details */}
              <div className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4">
                <span className="text-xs font-mono text-[#FF0000] uppercase font-bold">
                  Public Contact Info &amp; Socials
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Contact Email</label>
                    <Input
                      value={data.contact.email}
                      onChange={(e) => updateContact({ email: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">Location</label>
                    <Input
                      value={data.contact.location}
                      onChange={(e) => updateContact({ location: e.target.value })}
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">GitHub Profile URL</label>
                    <Input
                      value={data.contact.social.github}
                      onChange={(e) =>
                        updateContact({
                          social: { ...data.contact.social, github: e.target.value }
                        })
                      }
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1">LinkedIn Profile URL</label>
                    <Input
                      value={data.contact.social.linkedin}
                      onChange={(e) =>
                        updateContact({
                          social: { ...data.contact.social, linkedin: e.target.value }
                        })
                      }
                      className="bg-black border-[#3D0000] text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => toast({ title: 'Saved', description: 'Contact & CTA settings saved.' })}
                  className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-10 px-6 gap-2"
                >
                  <Save className="w-4 h-4" /> Save Contact Details
                </Button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 8. BRAND & VISUALS TAB */}
          {/* ============================================================== */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Brand Colors &amp; Visual Effects
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Fine-tune the palette, glow intensity, and visual matrix styling.
                  </p>
                </div>
                <DotMatrix />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300 uppercase">
                      Electric Red (Primary)
                    </label>
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-md"
                      style={{ backgroundColor: data.theme.primaryColor }}
                    />
                  </div>
                  <Input
                    value={data.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="bg-black border-[#3D0000] text-white font-mono text-xs"
                    placeholder="#FF0000"
                  />
                </div>

                <div className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300 uppercase">
                      Crimson Red (Secondary)
                    </label>
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-md"
                      style={{ backgroundColor: data.theme.crimsonColor }}
                    />
                  </div>
                  <Input
                    value={data.theme.crimsonColor}
                    onChange={(e) => updateTheme({ crimsonColor: e.target.value })}
                    className="bg-black border-[#3D0000] text-white font-mono text-xs"
                    placeholder="#950101"
                  />
                </div>

                <div className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300 uppercase">
                      Deep Maroon (Borders &amp; Cards)
                    </label>
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-md"
                      style={{ backgroundColor: data.theme.maroonColor }}
                    />
                  </div>
                  <Input
                    value={data.theme.maroonColor}
                    onChange={(e) => updateTheme({ maroonColor: e.target.value })}
                    className="bg-black border-[#3D0000] text-white font-mono text-xs"
                    placeholder="#3D0000"
                  />
                </div>

                <div className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300 uppercase">
                      Background Color
                    </label>
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-md"
                      style={{ backgroundColor: data.theme.backgroundColor }}
                    />
                  </div>
                  <Input
                    value={data.theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="bg-black border-[#3D0000] text-white font-mono text-xs"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Dot Matrix Toggle */}
              <div className="bg-black/80 border border-[#3D0000] p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-heading font-black text-white">
                    Show 6-Dot Matrix Icons (:::)
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    Stygar-style technical red dot clusters across section titles and cards.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={data.theme.showDotMatrix}
                  onChange={(e) => updateTheme({ showDotMatrix: e.target.checked })}
                  className="accent-[#FF0000] w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => toast({ title: 'Brand Colors Saved', description: 'Updated live palette.' })}
                  className="bg-[#FF0000] hover:bg-[#d60000] text-white font-bold text-xs h-10 px-6 gap-2"
                >
                  <Save className="w-4 h-4" /> Apply Palette
                </Button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 9. INQUIRIES & MESSAGES TAB */}
          {/* ============================================================== */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Contact Inquiries Inbox ({messages.length})
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Real-time messages sent by visitors through your portfolio contact form.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    addMessage({
                      name: 'Engineering Director',
                      email: 'engineering@google.com',
                      subject: 'Systems Engineering Opportunity',
                      message: 'Great portfolio Soulaimane! Loved nup-extractor and your clean-room reverse engineering work.'
                    });
                    toast({ title: 'Test Message Added' });
                  }}
                  variant="outline"
                  size="sm"
                  className="border-[#3D0000] text-zinc-300 hover:text-white text-xs h-9 gap-1.5 self-start"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FF0000]" /> Add Test Message
                </Button>
              </div>

              {messages.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 font-mono text-xs">
                  No messages received yet. All new contact inquiries will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.isRead
                          ? 'bg-black/50 border-[#3D0000]/60'
                          : 'bg-[#100303] border-[#FF0000]/70 shadow-lg'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#3D0000]/60">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-black text-white text-sm">
                            {msg.name}
                          </span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs font-mono text-[#FF0000] hover:underline"
                          >
                            &lt;{msg.email}&gt;
                          </a>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF0000] text-white">
                              NEW
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="py-3">
                        <h4 className="text-xs font-mono font-bold text-zinc-200 mb-1">
                          Subject: {msg.subject}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        {!msg.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markMessageRead(msg.id)}
                            className="border-[#3D0000] text-xs h-8 text-zinc-300 hover:text-white"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" /> Mark Read
                          </Button>
                        )}
                        <a
                          href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs h-8 gap-1.5"
                          >
                            <Send className="w-3 h-3" /> Reply Email
                          </Button>
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            deleteMessage(msg.id);
                            toast({ title: 'Message Deleted' });
                          }}
                          className="border-[#3D0000] text-zinc-400 hover:text-[#FF0000] text-xs h-8 px-2.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* 10. BACKUP & RESTORE TAB */}
          {/* ============================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0000]">
                <div>
                  <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">
                    Backup, Restore &amp; Data Sync
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Download full portfolio state as JSON or import an existing configuration.
                  </p>
                </div>
                <DotMatrix />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                      <Download className="w-5 h-5 text-[#FF0000]" />
                      <span>Export Configuration</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Export your entire portfolio state (all projects, milestones, bio, theme colors, and education) to a portable JSON file.
                    </p>
                  </div>
                  <Button
                    onClick={handleExport}
                    className="w-full bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-11 gap-2"
                  >
                    <Download className="w-4 h-4" /> Download JSON Backup
                  </Button>
                </div>

                {/* Import Card */}
                <div className="bg-black/80 border border-[#3D0000] p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                      <Upload className="w-5 h-5 text-[#FF0000]" />
                      <span>Import Configuration</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Paste or upload a previously exported JSON backup to instantly restore all portfolio content.
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowImportBox(!showImportBox)}
                    variant="outline"
                    className="w-full border-[#3D0000] text-zinc-200 hover:text-white hover:border-[#FF0000] text-xs font-bold h-11 gap-2"
                  >
                    <Upload className="w-4 h-4" /> {showImportBox ? 'Close Import Box' : 'Open JSON Importer'}
                  </Button>
                </div>
              </div>

              {/* Paste JSON Box */}
              {showImportBox && (
                <div className="bg-[#0e0303] border-2 border-[#FF0000] p-6 rounded-3xl space-y-4 shadow-2xl">
                  <label className="text-xs font-mono text-zinc-300 uppercase block">
                    Paste JSON Configuration Here:
                  </label>
                  <Textarea
                    rows={8}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='{"hero": { ... }, "projects": [ ... ]}'
                    className="bg-black border-[#3D0000] text-white text-xs font-mono"
                  />
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowImportBox(false)}
                      className="border-[#3D0000] text-zinc-400 text-xs h-9"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleImportSubmit}
                      className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-9 px-6"
                    >
                      Apply &amp; Restore
                    </Button>
                  </div>
                </div>
              )}

              {/* Security & Key Rotation Card */}
              <div className="bg-[#0c0202] border border-[#3D0000] p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                  <KeyRound className="w-5 h-5 text-[#FF0000]" />
                  <span>Rotate Master Security Key</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Update your admin access password. The new key is hashed with 256-bit salted SHA encryption.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Current Password</label>
                    <Input
                      type="password"
                      value={currentPassChange}
                      onChange={(e) => setCurrentPassChange(e.target.value)}
                      placeholder="Enter current password..."
                      className="bg-black border-[#3D0000] text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">New Password (min 8 chars)</label>
                    <Input
                      type="password"
                      value={newPassChange}
                      onChange={(e) => setNewPassChange(e.target.value)}
                      placeholder="Enter new master password..."
                      className="bg-black border-[#3D0000] text-white text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={async () => {
                      if (!currentPassChange || !newPassChange) {
                        toast({ variant: 'destructive', title: 'Missing fields', description: 'Please fill both password fields.' });
                        return;
                      }
                      setIsChangingPass(true);
                      const ok = await changeAdminPassword(currentPassChange, newPassChange);
                      setIsChangingPass(false);
                      if (ok) {
                        setCurrentPassChange('');
                        setNewPassChange('');
                        toast({ title: 'Security Key Updated', description: 'New master password active and hashed.' });
                      } else {
                        toast({ variant: 'destructive', title: 'Update Failed', description: 'Current password was incorrect or new password was too short.' });
                      }
                    }}
                    disabled={isChangingPass}
                    className="bg-[#FF0000] hover:bg-[#d60000] text-white text-xs font-bold h-9 px-4 gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isChangingPass ? 'Updating...' : 'Update Master Key'}
                  </Button>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="bg-[#120202] border border-[#FF0000]/30 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-black text-white">
                    Reset to Factory Stygar Defaults
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    Clears all custom changes and restores the initial portfolio content and theme.
                  </p>
                </div>
                <Button
                  onClick={handleResetConfirm}
                  variant="outline"
                  className="border-[#FF0000]/60 text-[#FF0000] hover:bg-[#FF0000] hover:text-white text-xs h-10 px-4 gap-1.5 self-start"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restore Defaults
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
