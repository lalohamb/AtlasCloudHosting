# Atlas Cloud Hosting - Marketing Website

A modern, production-ready marketing website for Atlas Cloud Hosting - a professional web hosting service offering WordPress hosting, Web3 infrastructure, and enterprise cloud solutions.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git (for version control)

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd atlascloudhosting-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## 📦 Build for Production

### Build the Application

```bash
npm run build
```

This command:
- Compiles TypeScript
- Optimizes all assets
- Generates static HTML pages
- Creates production-ready bundles
- Outputs to the `.next` folder

### Test the Production Build

```bash
npm run start
```

This runs the production build locally at [http://localhost:3000](http://localhost:3000).

### Type Checking

```bash
npm run typecheck
```

Runs TypeScript type checking without emitting files.

### Linting

```bash
npm run lint
```

Checks code quality and enforces coding standards using ESLint.

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project and deploy.

### Deploy to DigitalOcean App Platform

1. **Via GitHub/GitLab:**
   - Push your code to a Git repository
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App" and connect your repository
   - Select the branch to deploy
   - Configure build settings:
     - Build Command: `npm run build`
     - Run Command: `npm run start`
   - Click "Deploy"

2. **Via doctl CLI:**
   ```bash
   doctl apps create --spec .do/app.yaml
   ```

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Static Export (Optional)

If you want a fully static site:

1. Add to `next.config.js`:
   ```javascript
   module.exports = {
     output: 'export',
   }
   ```

2. Build:
   ```bash
   npm run build
   ```

3. The static files will be in the `out` folder, ready to deploy to any static hosting service.

## 📁 Project Structure

```
atlascloudhosting-v1/
├── app/                      # Next.js 13+ App Router
│   ├── page.tsx             # Home page
│   ├── plans/               # Pricing page
│   ├── about/               # About page
│   ├── partners/            # Partners program page
│   ├── contact/             # Contact page
│   ├── status/              # System status page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── layout.tsx           # Root layout with navigation & footer
│   └── globals.css          # Global styles & Tailwind
├── components/              # Reusable React components
│   ├── ui/                  # ShadCN UI components
│   ├── navigation.tsx       # Main navigation
│   ├── footer.tsx           # Site footer
│   ├── atlas-logo.tsx       # Animated logo
│   ├── animated-background.tsx
│   ├── grid-background.tsx
│   ├── server-illustration.tsx
│   └── structured-data.tsx  # SEO schema markup
├── lib/                     # Utility functions
├── public/                  # Static assets
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Tech Stack

- **Framework:** Next.js 13.5 (React 18.2)
- **Language:** TypeScript 5.2
- **Styling:** Tailwind CSS 3.3
- **UI Components:** ShadCN UI (Radix UI primitives)
- **Icons:** Lucide React
- **Animations:** CSS animations + Canvas API
- **Forms:** React Hook Form + Zod validation
- **Font:** Inter (Google Fonts)

## 🎯 Features

### Pages
- **Home:** Hero section, features, testimonials
- **Plans:** Pricing tiers with comparison table and FAQ
- **About:** Company information and values
- **Partners:** Affiliate and reseller programs
- **Status:** System uptime monitoring (Grafana placeholder)
- **Contact:** Contact form with Calendly integration
- **Legal:** Privacy policy and terms of service

### Design Features
- Fully responsive (mobile-first)
- Dark theme with glassmorphism effects
- Animated network background
- Custom SVG logo and illustrations
- Grid pattern overlays
- Smooth transitions and hover effects
- Accessibility compliant

### SEO Optimization
- Optimized meta tags on all pages
- Open Graph and Twitter card support
- Structured data (Organization, Services, FAQ)
- Semantic HTML
- Fast load times (static generation)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment-specific variables here
# Example:
# NEXT_PUBLIC_SITE_URL=https://atlascloud.hosting
# FORMSPREE_ENDPOINT=your-formspree-id
# CALENDLY_URL=your-calendly-link
```

### Customization

#### Brand Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  'space-blue': '#0F172A',
  'electric-cyan': '#06B6D4',
  'soft-silver': '#F1F5F9',
  'accent-orange': '#FB923C',
}
```

#### Content
All page content is located in the respective `app/*/page.tsx` files. Simply edit the text, links, and data directly.

#### Contact Form
The contact form in `app/contact/page.tsx` is currently set up with client-side handling. To connect it to a backend:

1. Install a form service (Formspree, Form.io, or custom API)
2. Update the `handleSubmit` function in `app/contact/page.tsx`
3. Add your endpoint URL to environment variables

## 📊 Performance

- **Build Time:** ~15-20 seconds
- **First Load JS:** ~79-99 KB (optimized)
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **Static Pages:** All pages pre-rendered at build time

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear cache and reinstall:
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. Check Node.js version:
   ```bash
   node --version  # Should be 18.x or higher
   ```

### Development Issues

If the dev server won't start:

1. Check port availability (default: 3000)
2. Try a different port:
   ```bash
   npm run dev -- -p 3001
   ```

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 🤝 Support

For questions or issues:
- Email: support@atlascloud.hosting
- Documentation: Review this README and GRAPHICS_SUMMARY.md
- Issues: Open an issue in the repository (if applicable)

## 📄 License

© 2024 Atlas Cloud Hosting. A service by Prestige Holdings Enterprise Group.

---

**Built with ❤️ by Blockchain Dev3 Consulting**
