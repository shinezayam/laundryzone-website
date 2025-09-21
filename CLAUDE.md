# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev              # Start development server on localhost:3000
npm run build           # Build for production
npm start              # Start production server
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript type checking
```

## Current Version Status
- **Next.js**: 15.5.3 (latest)
- **next-intl**: 4.3.9 (latest)
- **Status**: All hydration errors resolved, Next.js 15 compatible

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + html2canvas
- **Email**: Resend
- **Testing**: Playwright (configured)

### Internationalization Setup

The project supports three locales:
- `mn` (Mongolian) - default locale
- `en` (English)
- `kr` (Korean)

**Key i18n files:**
- `middleware.ts` - Routes locale handling with `localePrefix: 'always'`
- `i18n/request.ts` - Configuration for next-intl
- `messages/{locale}.json` - Translation files
- `app/[locale]/layout.tsx` - Locale-specific layout wrapper

**URL structure:** All routes are prefixed with locale (`/mn/`, `/en/`, `/kr/`)

### File Structure

**App Router Structure:**
- `app/[locale]/` - Locale-specific pages (about, blog, contact, franchise, etc.)
- `app/layout.tsx` - Root layout with metadata and global styles
- `app/[locale]/layout.tsx` - Locale wrapper with NextIntlClientProvider
- `app/globals.css` - Global Tailwind styles

**Components:**
- `components/` - Reusable React components (25+ components)
- Key components: SiteHeader, SiteFooter, Hero, ContactForm, PricingTable, FAQ, Chatbot
- All components use TypeScript with `.tsx` extension
- Styled with Tailwind classes and custom design tokens

**Data & Content:**
- `data/` - Static JSON data (branches.json, pricing.json, faq.json)
- `messages/` - Translation files (mn.json, en.json, kr.json)
- Blog posts support with dynamic routing

### Design System

**Brand Colors (Tailwind config):**
- `brand-500: #2D7CFF` - Main blue
- `accent-500: #F4781F` - Orange for buttons/headings
- `neutral-*` - Grayscale system

**Typography:**
- `font-sans: Montserrat` - Body text (configured in Tailwind)
- `font-heading: Montserrat` - Headings

**Custom Shadows:**
- `shadow-soft` - Light shadow for cards
- `shadow-medium` - Medium depth shadow

**Custom Animations:**
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-scale-in` - Scale in animation

### Component Patterns

**Forms:** Use React Hook Form with Zod validation schemas
**Animations:** Framer Motion with custom Tailwind keyframes
**Responsive:** Mobile-first approach with Tailwind breakpoints
**Icons:** Lucide React components

### Translation Usage

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('section');
// Access with dot notation: t('nav.home')
```

### Page Layout Architecture

Each page follows this pattern:
```tsx
app/[locale]/page-name/page.tsx
```

**Layout Hierarchy:**
1. `app/layout.tsx` - Root layout with metadata, Inter font, global styles
2. `app/[locale]/layout.tsx` - Locale wrapper with NextIntlClientProvider, SiteHeader, SiteFooter, Chatbot
3. Page components - Individual page content

**Key Architectural Notes:**
- Locale validation happens in both middleware.ts and locale layout
- All pages are wrapped with NextIntlClientProvider for translations
- Error handling component included in locale layout
- Chatbot component available on all pages

## Development Notes

- The project uses absolute imports with `@/*` path mapping
- All pages use the locale layout wrapper for internationalization
- Image optimization configured for WebP/AVIF formats with remote patterns
- TypeScript strict mode is enabled
- Locale detection is disabled in middleware (relies on URL prefix only)
- SEO optimized with comprehensive metadata in root layout
- Responsive design with mobile-first approach