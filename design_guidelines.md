# Design Guidelines: Soulaimane Ben Louaret Portfolio Website

## Design Approach
**Reference-Based Approach**: Nike/ASUS inspired modern tech aesthetic with glass morphism and 3D interactive elements. Dark, sophisticated design showcasing technical expertise through visual storytelling.

## Core Design Elements

### Color Palette
**Dark Mode Primary Colors:**
- Primary: Deep Teal `#0D4F5C` (196 73% 21%)
- Secondary: Soft Cream `#F7F3E9` (46 50% 94%)
- Accent: Bright Teal `#14B8A6` (173 80% 40%)
- Background: Dark Navy `#0F172A` (222 47% 11%)
- Text: Light Cream `#F8FAFC` (210 40% 98%)

**Gradient Applications:**
- Subtle teal-to-navy gradients for section backgrounds
- Cream-to-transparent for glass morphism overlays
- Circuit-pattern overlays at 10% opacity

### Typography
**Font Stack:**
- Primary: 'Inter' or 'Poppins' via Google Fonts (modern, tech-forward)
- Headings: Bold 700-900 weight, large scale (text-4xl to text-6xl)
- Body: Regular 400-500 weight, optimized readability (text-base to text-lg)
- Code/Tech: 'Fira Code' or 'JetBrains Mono' for tech elements

### Layout System
**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 20, 24, 32 (p-4, h-8, m-12, py-20, gap-8)
- Section Padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Container: max-w-7xl with px-6 to px-8 horizontal padding
- Component Gaps: gap-6 for cards, gap-12 between major sections

### Component Library

**Navigation:**
- Fixed glass morphism navbar with backdrop-blur-md
- Mobile: Hamburger menu with smooth slide-in drawer
- Smooth scroll behavior with offset for fixed header

**Hero Section:**
- Large heading with staggered character animation reveal
- Typing effect subtitle showcasing roles
- Circular profile image (300px) with 3D hover tilt effect
- Floating tech elements: circuit patterns, code snippets (animated)
- Scroll indicator with pulsing teal gradient arrow

**Project Cards:**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Glass morphism cards with 3D tilt-on-hover (perspective transform)
- Tech stack tags as rounded pills with teal accents
- Hover reveals: project details overlay with smooth transition
- GitHub link buttons with icon + text

**Skills Display:**
- Animated progress bars with gradient fills (teal)
- Grouped by category with expandable sections
- Visual percentage indicators that animate on scroll-into-view
- Tech stack icons integrated with skill names

**Contact Form:**
- Clean input fields with teal focus borders
- Glass morphism card container
- Floating labels on input focus
- Animated submit button with loading state

**Footer:**
- Social media icons with hover lift animations
- Tech-themed icon decorations
- Multi-column layout: About | Quick Links | Contact | Social

### Visual Effects & Animations

**Key Animations (Framer Motion):**
- Page Load: Staggered reveals with 0.2s delays per element
- Scroll Triggers: Fade-up animations at 0.3-0.5 viewport intersection
- Project Cards: 3D tilt on hover (rotateX/Y transforms)
- Skill Bars: Progressive fill from 0% to target on scroll
- Cursor Trail: Custom tech-themed particle effect following mouse
- Parallax: Subtle background layer movement at 0.3x scroll speed

**Interaction States:**
- Hover: Scale 1.02-1.05, subtle glow effects
- Active/Click: Scale 0.98 with haptic feedback visual
- Focus: Teal ring outline for accessibility

### Images

**Hero Section:**
- Circular profile photo placeholder (generic tech professional silhouette)
- Floating decorative elements: abstract circuit board patterns, code snippets (SVG illustrations)

**Project Cards:**
- Each project needs a representative screenshot/preview image (1200x800px)
- Use subtle border-radius (rounded-lg) with shadow effects
- Placeholder: gradient backgrounds with project icons until real images added

**Background Decorations:**
- Subtle circuit board patterns as SVG overlays (10% opacity)
- Abstract tech geometry shapes scattered across sections
- Gradient mesh backgrounds for visual depth

### Section-Specific Guidelines

**About Section:**
- Two-column layout: Professional summary | Skills visualization
- Skills grouped in expandable cards by category
- "What makes me unique" as highlighted callout box with teal border

**Education/Experience:**
- Timeline-style layout with connecting lines
- Animated course tags that float in on scroll
- Certification progress indicators with percentage complete

**Contact Section:**
- Split layout: Form (60%) | Info sidebar (40%)
- Location map placeholder or animated location pin icon
- Status badge: "Open to Opportunities" with pulsing indicator

### Responsive Behavior
- Mobile: Single column stack, reduced spacing (py-8 vs py-20)
- Tablet: Two-column grids where appropriate
- Desktop: Full multi-column layouts with expanded spacing
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

### Performance Optimizations
- All animations use `transform` and `opacity` only (GPU-accelerated)
- Lazy load project images with blur-up placeholders
- Reduce motion preference respected: `prefers-reduced-motion`
- Glass morphism limited to key UI elements to maintain 60fps

### Accessibility
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons
- Focus indicators with teal ring
- Color contrast ratio 4.5:1 minimum (cream on dark navy)
- Screen reader text for decorative animations