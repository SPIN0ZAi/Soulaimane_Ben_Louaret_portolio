import { motion } from 'framer-motion';

export default function FigmaHeroVisual() {
  return (
    <div className="absolute top-0 right-0 left-0 h-[600px] sm:h-[700px] overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
      {/* Radial ambient lighting in Deep Maroon and Crimson Red */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#3D0000]/35 via-[#950101]/15 to-transparent blur-[140px] rounded-full opacity-80" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#FF0000]/10 blur-[120px] rounded-full opacity-50" />

      {/* 3D Metallic Curved Ring & Floating Sphere matching the Black & Crimson/Red palette */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-[600px] sm:w-[850px] lg:w-[1000px] h-auto max-w-none opacity-60"
        viewBox="0 0 1000 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chromeRibbon1" x1="150" y1="100" x2="850" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#950101" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3D0000" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#FF0000" stopOpacity="0.5" />
            <stop offset="95%" stopColor="#1a0000" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="chromeRibbon2" x1="800" y1="200" x2="200" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#3D0000" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#100000" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="specularGleam" x1="450" y1="150" x2="550" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff6666" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="floatingSphereGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffb3b3" />
            <stop offset="65%" stopColor="#FF0000" />
            <stop offset="90%" stopColor="#950101" />
            <stop offset="100%" stopColor="#3D0000" />
          </radialGradient>

          <filter id="sphereGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>

        {/* Sculptural 3D Outer Ring Ribbons */}
        <path
          d="M 220,480 C 120,320 200,120 450,110 C 720,100 880,260 840,460 C 800,640 540,680 340,600 C 220,550 160,420 240,300 C 320,180 560,160 720,240 C 840,300 880,450 810,550"
          stroke="url(#chromeRibbon1)"
          strokeWidth="38"
          strokeLinecap="round"
          className="transition-all duration-1000"
        />

        {/* Secondary Inner Chrome Ribbon */}
        <path
          d="M 280,450 C 220,330 280,170 470,160 C 690,150 820,280 780,450 C 750,590 540,630 380,560 C 270,510 240,400 300,300 C 370,190 570,180 700,260"
          stroke="url(#chromeRibbon2)"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Highlight Specular Edge */}
        <path
          d="M 380,125 C 520,110 680,140 780,240"
          stroke="url(#specularGleam)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Glowing Orb / Chrome Sphere in Electric Red (#FF0000) */}
        <circle cx="580" cy="240" r="16" fill="url(#floatingSphereGrad)" filter="url(#sphereGlow)" opacity="0.9" />
        <circle cx="580" cy="240" r="13" fill="url(#floatingSphereGrad)" />
        <circle cx="575" cy="235" r="4" fill="#ffffff" opacity="0.9" />

        {/* Delicate Orbiting Geometry Lines */}
        <circle cx="500" cy="380" r="280" stroke="rgba(149,1,1,0.12)" strokeDasharray="4 8" />
        <circle cx="500" cy="380" r="360" stroke="rgba(255,0,0,0.08)" strokeDasharray="6 12" />
      </motion.svg>
    </div>
  );
}
