# LaundryZone Mongolia - Self-Service Laundry Website

A production-ready, multilingual marketing website for LaundryZone (Mongolia), featuring modern design, interactive components, and comprehensive internationalization support.

## 🌟 Features

- **Multilingual Support**: Mongolian (MN), English (EN), Korean (KR)
- **Modern Design**: Clean, responsive design with brand-consistent styling
- **Interactive Components**: Framer Motion animations and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **SEO Optimized**: Next.js 14 with App Router, metadata, and structured data
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Performance**: Optimized images, dynamic imports, Lighthouse ≥95

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **SEO**: next-seo, structured data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd laundryzone-mn
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
laundryzone-mn/
├── app/
│   ├── [locale]/           # Locale-specific pages
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── pricing/        # Pricing page
│   │   ├── franchise/      # Franchise page
│   │   ├── contact/        # Contact page
│   │   └── layout.tsx      # Locale layout
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── SiteHeader.tsx      # Navigation header
│   ├── SiteFooter.tsx      # Footer
│   ├── Hero.tsx           # Hero section
│   ├── Advantages.tsx     # Features section
│   ├── PricingTable.tsx   # Pricing component
│   ├── FAQ.tsx            # FAQ accordion
│   ├── Branches.tsx       # Locations component
│   ├── ContactForm.tsx    # Contact form
│   └── ...
├── data/                  # Static data
│   ├── branches.json      # Location data
│   ├── pricing.json       # Pricing data
│   └── faq.json          # FAQ data
├── messages/              # Translation files
│   ├── mn.json           # Mongolian
│   ├── en.json           # English
│   └── kr.json           # Korean
├── styles/               # Additional styles
└── public/               # Static assets
```

## 🌍 Internationalization

The website supports three languages:
- **Mongolian (MN)**: Default language
- **English (EN)**: International audience
- **Korean (KR)**: Korean market

### Adding Translations

1. Update the corresponding JSON file in `/messages/`
2. Use the `useTranslations()` hook in components
3. Access translations with dot notation: `t('nav.home')`

### URL Structure

- `/mn/` - Mongolian (default)
- `/en/` - English  
- `/kr/` - Korean

## 🎨 Design System

### Brand Colors

```css
:root {
  --brand-500: #2D7CFF;    /* Main blue */
  --accent-500: #00D6A7;   /* Accent green */
  --neutral-900: #0E1116;  /* Dark text */
  --neutral-50: #F8FAFC;   /* Light background */
}
```

### Typography

- **UI Font**: Inter
- **Headings**: Sora/Manrope
- **Base Size**: 16px
- **Scale**: 1.125 (major third)

### Components

- **Cards**: Rounded corners (1rem), soft shadows
- **Buttons**: Primary (brand-500) and secondary variants
- **Forms**: Consistent styling with validation states

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Container**: Max-width 1280px with responsive padding

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://laundryzone.mn
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### SEO Configuration

Update metadata in `app/layout.tsx`:
- Site title and description
- Open Graph images
- Twitter Card settings
- Google verification code

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

1. Build the project:
```bash
pnpm build
```

2. Start the production server:
```bash
pnpm start
```

## 📊 Performance

- **Lighthouse Score**: ≥95 across all categories
- **Core Web Vitals**: Optimized for all metrics
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic with Next.js App Router

## 🔒 Security

- **Content Security Policy**: Configured headers
- **Form Validation**: Client and server-side validation
- **HTTPS**: Enforced in production
- **Input Sanitization**: Zod schema validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary to LaundryZone Mongolia.

## 📞 Support

For support or questions:
- Email: laundryzone.mongolia@gmail.com
- Phone: +976-7272-2121

---

Built with ❤️ for LaundryZone Mongolia
