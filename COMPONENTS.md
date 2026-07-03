# PayMatch Component Documentation

## Overview

This document describes all components used in the PayMatch landing page.

---

## UI Components (`components/ui/`)

### Button Component

**File**: `Button.tsx`

```tsx
<Button 
  variant="primary" 
  size="lg" 
  icon={<ArrowRight size={20} />}
>
  Get Started
</Button>
```

**Props**:
- `children` (ReactNode) - Button text
- `variant` ("primary" | "secondary" | "outline" | "ghost") - Style variant
- `size` ("sm" | "md" | "lg") - Button size
- `className` (string) - Additional CSS classes
- `icon` (ReactNode) - Optional icon to display

**Variants**:
- **primary**: Solid teal background, white text, shadow (for CTAs)
- **secondary**: Teal background, light text
- **outline**: Border style, useful for secondary actions
- **ghost**: Transparent, text-only, hover background

---

### Card Component

**File**: `Card.tsx`

```tsx
<Card hover={true} blur={false}>
  <h3>Feature Title</h3>
  <p>Feature description</p>
</Card>
```

**Props**:
- `children` (ReactNode) - Card content
- `className` (string) - Additional CSS classes
- `hover` (boolean) - Enable hover effects (default: true)
- `blur` (boolean) - Enable backdrop blur (default: false)

**Features**:
- Rounded corners (2xl)
- Soft shadows
- White background
- Smooth hover animations
- Optional glassmorphism effect

---

### Container Component

**File**: `Container.tsx`

```tsx
<Container size="lg">
  <h1>Page Content</h1>
</Container>
```

**Props**:
- `children` (ReactNode) - Container content
- `className` (string) - Additional CSS classes
- `size` ("sm" | "md" | "lg") - Container max-width

**Sizes**:
- **sm**: max-width 896px (2xl)
- **md**: max-width 1024px (4xl)
- **lg**: max-width 1536px (6xl)

---

## Section Components (`components/sections/`)

### HeroSection

**File**: `HeroSection.tsx`

**Features**:
- Large headline with gradient text
- Supporting description
- Dual CTA buttons (Get Started, View GitHub)
- Animated dashboard mockup on right
- Floating cards with real data
- Background gradient decoration

**Data**:
- Total Customers: 1,245
- Invoices: 3,892
- Payments Received: ₦2.4M
- Pending Payments: ₦856K
- Recent Transactions with status badges

---

### TrustSection

**File**: `TrustSection.tsx`

**Features**:
- Hackathon badge with pulse animation
- Tech stack grid (6 items)
- Icon representations
- Hover effects
- Responsive grid layout

**Tech Stack**:
- Nomba Virtual Accounts
- Nomba Webhooks
- Transactions API
- NestJS
- Next.js
- PostgreSQL

---

### ProblemSection

**File**: `ProblemSection.tsx`

**Features**:
- Split layout (left illustration, right content)
- 6 problem cards
- Icon per problem
- Hover states
- Animated illustration cards

**Problems Covered**:
1. Checking WhatsApp for confirmations
2. Matching transfers manually
3. Spreadsheet reconciliation
4. Unknown payers
5. Partial payments
6. Duplicate records

---

### SolutionSection

**File**: `SolutionSection.tsx`

**Features**:
- 7-step animated timeline
- Desktop connecting line
- Mobile arrow connectors
- Animated dots on timeline
- Alternating layout for visual interest

**Steps**:
1. Create Customer
2. Generate Invoice
3. Assign Virtual Account
4. Customer Pays
5. Nomba sends Webhook
6. PayMatch matches payment automatically
7. Dashboard updates instantly

---

### FeaturesSection

**File**: `FeaturesSection.tsx`

**Features**:
- 9 feature cards grid
- Gradient icons (different color per feature)
- Hover lift animations
- Responsive 2-3 column layout
- Icons from Lucide React

**Features**:
1. Automatic Payment Matching (Zap icon)
2. Virtual Accounts (DollarSign icon)
3. Real-Time Webhooks (Clock icon)
4. Invoice Tracking (BarChart3 icon)
5. Partial Payment Detection (CheckCircle2 icon)
6. Business Dashboard (Shield icon)
7. Transaction History (FileText icon)
8. Smart Alerts (AlertCircle icon)
9. Audit Logs (AuditLog icon)

---

### HowItWorksSection

**File**: `HowItWorksSection.tsx`

**Features**:
- 3-step process
- Large step numbers
- Icons for each step
- Detailed descriptions
- Desktop arrow connectors
- Mobile arrow separators

**Steps**:
1. **Assign Payment Account** - Link unique virtual account per customer
2. **Receive Payment** - Customer transfers to virtual account
3. **Automatic Reconciliation** - PayMatch instantly matches payment

---

### WhyPayMatchSection

**File**: `WhyPayMatchSection.tsx`

**Features**:
- 6 benefit cards
- Large metrics/numbers
- Gradient icons
- Hover animations
- Key benefits highlighted

**Benefits**:
1. Reduce Manual Work (80%)
2. Real-Time Updates (0s)
3. Zero Spreadsheet Tracking (100%)
4. Faster Reconciliation (99%)
5. Scalable Payment Tracking (∞)
6. Peace of Mind (✓)

---

### TargetUsersSection

**File**: `TargetUsersSection.tsx`

**Features**:
- 8 user persona cards
- Icons per user type
- Use case examples
- Responsive 4-column grid
- Icon variations

**User Types**:
1. Schools - Track student fees
2. Landlords - Reconcile rent payments
3. Freelancers - Manage client payments
4. SMEs - Scale payment operations
5. Cooperatives - Coordinate member payments
6. Agencies - Track client payments
7. Service Businesses - Automate service payments
8. NGOs & Non-Profits - Manage donations

---

### FAQSection

**File**: `FAQSection.tsx`

**Features**:
- Expandable accordion
- 6 FAQ items
- Smooth animations
- Chevron rotation on open
- Hover states

**Questions**:
1. What is PayMatch?
2. How do Virtual Accounts work?
3. Is money stored in PayMatch?
4. How secure is PayMatch?
5. Can PayMatch handle partial payments?
6. How quickly does PayMatch match payments?

---

### CTASection

**File**: `CTASection.tsx`

**Features**:
- Large headline
- Supporting description
- Dual CTA buttons
- Trust badges (3 items)
- Background gradient
- Call-to-action focused

**Badges**:
- No Credit Card Required
- 7-Day Free Trial
- Instant Setup

---

## Navigation Components

### Navbar

**File**: `Navbar.tsx`

**Features**:
- Logo on left
- 5 navigation links
- Responsive mobile menu
- Sticky positioning
- Glassmorphism effect on scroll
- CTA buttons (GitHub, Launch Demo)

**Navigation Links**:
- Home
- Features
- How It Works
- Benefits
- FAQ

**Mobile Features**:
- Hamburger menu
- Dropdown navigation
- Full-width mobile menu

---

### Footer

**File**: `Footer.tsx`

**Features**:
- Logo/brand section
- 3 link categories (Product, Resources, Legal)
- Tech stack badges
- Copyright info
- Social links
- Attribution to partners

**Sections**:
- Brand info and description
- Product links
- Resource links
- Legal links
- Tech used badges
- Copyright and attribution

---

## Utility Functions

### `cn()` Function

**File**: `lib/utils.ts`

```tsx
cn('px-4 py-2', condition && 'bg-blue-500', undefined)
// Returns: 'px-4 py-2 bg-blue-500'
```

Combines class names, filtering out falsy values. Similar to `clsx` or `classnames`.

---

## Animation Patterns

### Container Variants (Stagger Animation)

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

Used for coordinated animations of child elements.

### Item Variants (Individual Animation)

```tsx
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
```

Used for smooth fade-in and slide-up animations.

### Hover Animations

```tsx
<motion.div
  whileHover={{ y: -5 }}
  transition={{ duration: 0.3 }}
>
  Card content
</motion.div>
```

Lift cards on hover for interactive feedback.

---

## Responsive Breakpoints

- **Mobile**: 320px+
- **Small**: 640px+
- **Medium (Tablet)**: 768px+
- **Large (Desktop)**: 1024px+
- **Extra Large**: 1280px+

Tailwind CSS classes used:
- `md:` for 768px and up
- `lg:` for 1024px and up
- `sm:` for 640px and up

---

## Color Variables (CSS Custom Properties)

Defined in `globals.css`:

```css
--color-primary: #0f766e       /* Deep Teal */
--color-primary-light: #14b8a6 /* Light Teal */
--color-accent: #22c55e        /* Green */
--color-dark: #0f172a          /* Navy */
--color-background: #f8fafc    /* Light Slate */
--color-text: #1e293b          /* Dark Text */
--color-white: #ffffff         /* White */
--color-border: #e2e8f0        /* Light Border */
```

---

## Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extra bold)

**Usage**:
- Hero titles: `text-5xl md:text-6xl font-bold`
- Section titles: `text-4xl md:text-5xl font-bold`
- Headings: `font-bold text-lg md:text-xl`
- Body: `text-base md:text-lg`
- Small: `text-sm md:text-base`

---

## Component Structure Pattern

All components follow this pattern:

```tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function ComponentName() {
  // Animation variants
  const containerVariants = { /* ... */ };
  const itemVariants = { /* ... */ };

  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Content */}
        </motion.div>
      </Container>
    </section>
  );
}
```

---

## Best Practices Used

1. ✅ Client components marked with "use client"
2. ✅ TypeScript for type safety
3. ✅ Responsive design with Tailwind
4. ✅ Animations with Framer Motion
5. ✅ Reusable component patterns
6. ✅ Semantic HTML
7. ✅ Proper spacing and hierarchy
8. ✅ Accessible forms and interactions
9. ✅ Performance optimized
10. ✅ Mobile-first approach

---

## Common Props Across Components

Most components accept:
- `className` - Additional Tailwind classes
- Standard HTML attributes (id, data-*, etc.)

Motion components accept:
- `initial`, `animate`, `whileHover`, `whileInView`
- `transition` - Animation timing
- `viewport` - Scroll trigger settings
- `variants` - Predefined animation states

---

## External Icons (Lucide React)

Icons used throughout components:
- `Menu`, `X` - Navigation menu
- `ArrowRight`, `Github` - CTA icons
- `Server`, `Webhook`, `Database`, `Code2`, `Radio`, `RefreshCw` - Tech stack
- `MessageCircle`, `BarChart3`, `AlertCircle`, `Users`, `Split`, `Copy` - Problem icons
- `Zap`, `DollarSign`, `Clock`, `CheckCircle2`, `Shield`, `FileText`, `AuditLog` - Feature icons
- `ChevronDown` - FAQ accordion
- `ExternalLink` - Footer links
- `Mail` - Contact

All from `lucide-react` library.

---

## Performance Considerations

1. **Images**: Use Next.js Image component for optimization
2. **CSS**: Tailwind purges unused styles
3. **JS**: Lazy loaded with Next.js
4. **Animations**: GPU-accelerated with Framer Motion
5. **Bundle Size**: Optimized imports, no unnecessary libraries

---

This documentation covers the complete component architecture. Each component is production-ready and can be easily extended or modified.
