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

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl
- **Icons**: Lucide React

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
- `app/[locale]/` - Locale-specific pages
- `app/layout.tsx` - Root layout with global styles
- `app/globals.css` - Global Tailwind styles

**Components:**
- `components/` - Reusable React components
- All components are TypeScript with `.tsx` extension
- Use Tailwind classes for styling

**Data:**
- `data/` - Static JSON data files (branches, pricing, FAQ)
- `messages/` - Internationalization translation files

### Design System

**Brand Colors (Tailwind config):**
- `brand-500: #2D7CFF` - Main blue
- `accent-500: #F4781F` - Orange for buttons/headings
- `neutral-*` - Grayscale system

**Typography:**
- `font-sans: Inter` - Body text
- `font-heading: Sora/Manrope` - Headings

**Custom Shadows:**
- `shadow-soft` - Light shadow for cards
- `shadow-medium` - Medium depth shadow

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

## Development Notes

- The project uses absolute imports with `@/*` path mapping
- All pages use the locale layout wrapper for internationalization
- Image optimization is configured for WebP/AVIF formats
- TypeScript strict mode is enabled
- Locale detection is disabled in middleware (relies on URL prefix only)