# RenewEdge Frontend

A modern Next.js frontend application built with React 19, Tailwind CSS, and GSAP animations, designed to work seamlessly with the Strapi CMS backend.

## 🚀 Overview

This is the frontend portion of the RenewEdge project, built with Next.js 15.3.4 using the App Router. It features dynamic content rendering from Strapi CMS, performance optimization through ISR, and modern animations with GSAP.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4.x
- **Animations**: GSAP 3.13.0
- **Content**: Strapi Blocks React Renderer
- **UI Components**: Lucide React, Swiper
- **Utilities**: DOMPurify, React Markdown, QS

## 📁 Project Structure

```
Frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.js                # Root layout
│   ├── page.js                  # Homepage
│   ├── blocksMap.js             # Component mapping
│   ├── api/                     # API routes
│   │   ├── revalidate/          # Webhook endpoints
│   │   └── sitemap/             # Dynamic sitemap
│   ├── who-we-are/              # About page
│   ├── what-we-do/              # Services page
│   ├── article/                 # Blog pages
│   ├── contact/                 # Contact page
│   └── [other-pages]/           # Additional pages
├── components/                   # React components
│   ├── Header/                  # Navigation
│   ├── Footer/                  # Footer
│   ├── Home/                    # Homepage components
│   ├── WhoWeAre/               # About components
│   ├── WhatWeDo/               # Services components
│   ├── Contact/                # Contact components
│   ├── Article/                # Blog components
│   └── [Shared]/               # Shared components
├── lib/                         # Utilities
│   ├── strapiApi.js            # API functions
│   ├── populateMap.js          # Data population
│   ├── parseStrapiRichText.js  # Content parser
│   └── data.js                 # Static data
├── public/                     # Static assets
└── config files               # Next.js, Tailwind, etc.
```

## 🚀 Getting Started

### Prerequisites

- Node.js (18.0.0 to 22.x.x)
- npm (6.0.0+)
- Running Strapi backend (see Backend_strapi/README.md)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   Create a `.env.local` file:
   ```env
   # Strapi Configuration
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_strapi_api_token
   
   # Revalidation Secret
   REVALIDATE_SECRET=your_revalidation_secret
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 📋 Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint linting
```

## 🔧 Key Features

### Dynamic Content Rendering

The frontend uses a component mapping system to dynamically render Strapi content:

```javascript
// blocksMap.js example
export const homeBlocksMap = {
  "layout.hero": HomeHero,
  "layout.content-block": ServicesBlock,
  "layout.feature-card": FeatureCard,
  // ... other mappings
};
```

### API Integration

Centralized API functions in `lib/strapiApi.js`:

```javascript
// Fetch data with population and caching
const data = await fetchStrapi("home", {
  populate: "*",
  tag: "home",
  revalidate: 3600
});
```

### Performance Optimization

- **ISR (Incremental Static Regeneration)**: Automatic page regeneration
- **Webhook revalidation**: Instant updates when content changes
- **Image optimization**: Next.js Image component with optimized loading
- **Code splitting**: Automatic route-based code splitting

### GSAP Animations

Rich animations powered by GSAP:
- Page transitions
- Component animations
- Scroll-triggered effects
- Interactive elements

## 🎨 Styling

### Tailwind CSS

- **Version**: 4.x
- **Configuration**: `tailwind.config.js`
- **Global styles**: `app/globals.css`
- **Custom utilities**: Defined in globals.css

### Component Structure

Components follow a consistent pattern:
- Props destructuring
- GSAP animations setup
- Conditional rendering
- Responsive design

## 🔄 Content Management

### Dynamic Zones

Content is structured using Strapi's dynamic zones:
- Components are mapped dynamically
- Content creators can arrange components
- Real-time updates through webhooks

### SEO Optimization

Each page includes:
- Dynamic meta tags
- Open Graph tags
- Structured data
- Canonical URLs

## 🚀 Deployment

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Ensure these are set in production:
- `NEXT_PUBLIC_STRAPI_API_URL`: Production Strapi URL
- `STRAPI_API_TOKEN`: API token for content access
- `REVALIDATE_SECRET`: Secret for webhook security

### Performance Checklist

- [ ] Image optimization enabled
- [ ] ISR configured for all pages
- [ ] Webhook revalidation set up
- [ ] Bundle size optimized
- [ ] SEO meta tags configured

## 🧪 Development

### Component Development

1. Create component in appropriate directory
2. Add to blocksMap if needed for dynamic rendering
3. Implement responsive design
4. Add GSAP animations if required
5. Test with various content scenarios

### Adding New Pages

1. Create page directory in `app/`
2. Add `page.js` with data fetching
3. Create necessary components
4. Update navigation if needed
5. Configure SEO metadata

### API Integration

1. Add fetch functions to `strapiApi.js`
2. Configure population parameters
3. Set up appropriate caching
4. Handle error states

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Check `NEXT_PUBLIC_STRAPI_API_URL`
   - Verify Strapi is running
   - Confirm API token permissions

2. **Content Not Updating**:
   - Check if content is published in Strapi
   - Verify webhook configuration
   - Clear Next.js cache (delete `.next` folder)

3. **Image Loading Issues**:
   - Check image domains in `next.config.mjs`
   - Verify image permissions in Strapi

4. **Build Errors**:
   - Check for TypeScript errors
   - Verify all imports are correct
   - Ensure environment variables are set

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [GSAP Documentation](https://greensock.com/docs)
- [Strapi Documentation](https://docs.strapi.io)

## 🤝 Contributing

1. Follow existing code patterns
2. Use TypeScript when possible
3. Ensure responsive design
4. Test across different devices
5. Update documentation as needed

---

For more detailed information, see the main [project documentation](../PROJECT_DOCUMENTATION.md).