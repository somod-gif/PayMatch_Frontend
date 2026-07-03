# PayMatch - Automatic Payment Reconciliation Platform

A modern, premium fintech landing page for PayMatch, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

PayMatch is an automated payment reconciliation platform that helps Nigerian SMEs track and match customer bank transfer payments using Nomba Virtual Accounts. The landing page showcases the product with a modern, professional design inspired by leading fintech companies like Stripe, Linear, and Vercel.

## Features

### 🎨 Design System

- **Modern, Premium UI** - Clean, minimal design with professional spacing
- **Glassmorphism Effects** - Blur and backdrop effects for depth
- **Responsive Design** - Desktop-first approach with perfect mobile responsiveness
- **Smooth Animations** - Framer Motion animations for engaging interactions
- **Color Palette**:
  - Primary: Deep Teal (`#0F766E`)
  - Secondary: Light Teal (`#14B8A6`)
  - Accent: Green (`#22C55E`)
  - Background: Light Slate (`#F8FAFC`)
  - Text: Dark Slate (`#1E293B`)

### 📱 Components

#### UI Components (`components/ui/`)

1. **Button** - Flexible button component with variants
   - Variants: primary, secondary, outline, ghost
   - Sizes: sm, md, lg
   - Icon support

2. **Card** - Reusable card container
   - Hover effects
   - Blur/backdrop support
   - Soft shadows

3. **Container** - Responsive content wrapper
   - Size options: sm, md, lg
   - Consistent padding and max-widths

#### Page Sections (`components/sections/`)

1. **HeroSection** - Landing hero with CTA
   - Large headlines with gradient text
   - Animated dashboard mockup with floating cards
   - Real-world data examples

2. **TrustSection** - Tech stack showcase
   - Badge highlighting hackathon partnership
   - Tech icons and labels
   - Hover effects

3. **ProblemSection** - Problem statement
   - Split layout with illustration
   - 6 key pain points
   - Icon-based problem cards

4. **SolutionSection** - Animated timeline
   - 7-step process visualization
   - Desktop and mobile friendly
   - Animated timeline dots

5. **FeaturesSection** - Feature cards grid
   - 9 key features
   - Icon-based visualization
   - Gradient accents per feature

6. **HowItWorksSection** - 3-step process
   - Step-by-step breakdown
   - Detailed descriptions
   - Desktop arrow connectors

7. **WhyPayMatchSection** - Benefits showcase
   - 6 key metrics
   - Gradient icons
   - Performance highlights

8. **TargetUsersSection** - User personas
   - 8 target user types
   - Use case examples
   - Icon representations

9. **FAQSection** - Accordion FAQ
   - 6 common questions
   - Smooth animations
   - Expandable answers

10. **CTASection** - Final call-to-action
    - Main conversion CTA
    - Trust badges
    - Feature highlights

#### Navigation Components

1. **Navbar** - Sticky navigation
   - Logo and branding
   - Responsive menu
   - Mobile hamburger menu
   - Glassmorphism effect on scroll
   - CTA buttons

2. **Footer** - Comprehensive footer
   - Company info
   - Link categories
   - Tech stack badges
   - Copyright and attribution

## Project Structure

```
paymatch-frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles and theme
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   └── index.ts
│   └── sections/
│       ├── HeroSection.tsx
│       ├── TrustSection.tsx
│       ├── ProblemSection.tsx
│       ├── SolutionSection.tsx
│       ├── FeaturesSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── WhyPayMatchSection.tsx
│       ├── TargetUsersSection.tsx
│       ├── FAQSection.tsx
│       ├── CTASection.tsx
│       └── index.ts
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   └── image/
│       └── logo.png        # PayMatch logo
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React 0.372
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd paymatch-frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Color Palette Reference

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | `#0F766E` | Buttons, primary accents |
| Secondary | `#14B8A6` | Hover states, secondary elements |
| Accent | `#22C55E` | Success states, badges |
| Dark | `#0F172A` | Footer background, text |
| Background | `#F8FAFC` | Page background |
| Text | `#1E293B` | Body text |
| Border | `#E2E8F0` | Card borders |
| White | `#FFFFFF` | Card backgrounds |

## Typography

- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800
- **Sizes**:
  - Hero: 48-64px (bold)
  - Section titles: 36-48px (bold)
  - Subheadings: 20-24px (semibold)
  - Body: 14-18px (regular/medium)

## Responsive Design

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

Mobile-first responsive approach with smooth breakpoints for all sections.

## Performance Optimizations

- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Client-side animations with Framer Motion
- SEO metadata configuration
- Smooth scrolling and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Contrast ratios meet WCAG standards
- Focus indicators on interactive elements

## SEO

- Meta tags configured
- Open Graph metadata
- Structured heading hierarchy
- Optimized for search engines
- Social sharing metadata

## Customization

### Updating Colors

Edit `/app/globals.css` to change the color palette:

```css
:root {
  --color-primary: #0f766e;
  /* ... other colors ... */
}
```

### Modifying Content

All text content is in the component files. Edit the respective section component to update content.

### Adding New Sections

1. Create new file in `components/sections/`
2. Export from `components/sections/index.ts`
3. Import and use in `app/page.tsx`

## GitHub

Repository: [PayMatch](https://github.com/paymatch)

## Built For

- **Nomba Hackathon 2026**
- **DevCareer**

## Technologies Used

- Next.js
- NestJS (Backend)
- TypeScript
- PostgreSQL
- Nomba APIs

## License

MIT

## Support

For support, email `hello@paymatch.app` or open an issue on GitHub.

---

Built with ❤️ for Nigerian SMEs
