# Dynamic Website Project Documentation
## Next.js Frontend + Strapi CMS Backend

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Data Flow & Architecture](#data-flow--architecture)
5. [Local Development Setup](#local-development-setup)
6. [Content Management Workflow](#content-management-workflow)
7. [Dynamic Content System](#dynamic-content-system)
8. [API Integration](#api-integration)
9. [Caching & Performance](#caching--performance)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

This is a dynamic website project built with **Next.js** as the frontend framework and **Strapi v5** as the headless CMS backend. The project implements a sophisticated content management system where content creators can manage website content through Strapi's admin panel, and changes are automatically reflected on the Next.js frontend with intelligent caching and revalidation.

### Key Features
- **Dynamic Content Management**: Content is managed through Strapi and dynamically rendered on the frontend
- **Component-Based Architecture**: Modular, reusable components for different content types
- **Real-time Updates**: Content changes in Strapi trigger automatic frontend updates via webhook revalidation
- **SEO Optimization**: Dynamic meta tags and SEO components
- **Performance Optimized**: Intelligent caching with ISR (Incremental Static Regeneration)
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS

---

## Technology Stack

### Frontend (Next.js)
- **Framework**: Next.js 15.3.4 (App Router)
- **React Version**: 19.0.0
- **Styling**: Tailwind CSS 4.x
- **Animations**: GSAP 3.13.0
- **Content Rendering**: Strapi Blocks React Renderer
- **Image Optimization**: Next.js Image component
- **State Management**: React built-in state (useState, useCallback)

### Backend (Strapi)
- **CMS**: Strapi v5.16.1
- **Database**: PostgreSQL (configurable)
- **Plugins**: 
  - Deep Populate plugin for complex data fetching
  - SEO plugin for meta management
  - Users & Permissions for authentication
  - Nodemailer for email functionality

### Additional Technologies
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: Strapi JWT tokens
- **Image Hosting**: Multiple domains supported (localhost, staging, production)
- **Package Management**: npm
- **Version Control**: Git

---

## Project Structure

### Frontend Directory Structure (`/Frontend`)

```
Frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.js                # Root layout with header/footer
│   ├── page.js                  # Home page
│   ├── not-found.js             # 404 error page
│   ├── blocksMap.js             # Component mapping for dynamic content
│   ├── api/                     # API routes
│   │   ├── revalidate/          # Webhook revalidation endpoint
│   │   └── sitemap/             # Dynamic sitemap generation
│   ├── who-we-are/              # About page
│   ├── what-we-do/              # Services page
│   ├── article/                 # Blog/article pages
│   ├── contact/                 # Contact page
│   ├── privacy-policy/          # Privacy policy page
│   ├── strategic-partnership/   # Partnership page
│   └── think-forward/           # Blog listing page
├── components/                   # Reusable React components
│   ├── Header/                  # Navigation components
│   ├── Footer/                  # Footer components
│   ├── Home/                    # Homepage-specific components
│   ├── WhoWeAre/               # About page components
│   ├── WhatWeDo/               # Services page components
│   ├── Contact/                # Contact form components
│   ├── Article/                # Blog/article components
│   └── [SharedComponents]       # Button, Container, inputs, etc.
├── lib/                         # Utility functions and configurations
│   ├── strapiApi.js            # Strapi API fetch functions
│   ├── populateMap.js          # Data population configurations
│   ├── parseStrapiRichText.js  # Rich text content parser
│   └── data.js                 # Static data and configurations
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── jsconfig.json            # JavaScript configuration
```

### Backend Directory Structure (`/Backend_strapi`)

```
Backend_strapi/
├── src/                         # Source code
│   ├── api/                     # Content types and API endpoints
│   │   ├── home/               # Home page content type
│   │   ├── article/            # Blog article content type
│   │   ├── who-we-are/         # About page content type
│   │   ├── what-we-do/         # Services page content type
│   │   ├── contact/            # Contact page content type
│   │   ├── page/               # Dynamic page content type
│   │   ├── global/             # Global site settings
│   │   └── [other-types]/      # Additional content types
│   ├── components/             # Reusable content components
│   │   ├── layout/             # Layout components (hero, content-block, etc.)
│   │   ├── elements/           # UI elements (buttons, cards, etc.)
│   │   └── shared/             # Shared components (SEO, etc.)
│   ├── extensions/             # Strapi extensions
│   └── admin/                  # Admin panel customizations
├── config/                     # Configuration files
│   ├── database.ts            # Database configuration
│   ├── server.ts              # Server configuration
│   ├── admin.ts               # Admin panel configuration
│   ├── api.ts                 # API configuration
│   ├── middlewares.ts         # Middleware configuration
│   └── plugins.ts             # Plugin configuration
├── types/                     # TypeScript type definitions
├── database/                  # Database files (SQLite in development)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Strapi documentation
```

---

## Data Flow & Architecture

### High-Level Architecture

```
Content Creator → Strapi Admin Panel → PostgreSQL Database
                                           ↓
                                    Strapi API Endpoints
                                           ↓
Next.js Frontend ← API Calls ← Dynamic Component Rendering
                                           ↓
                                    End User Website
```

### Detailed Data Flow

1. **Content Creation**:
   - Content creators log into Strapi admin panel
   - Create/edit content using dynamic zones and components
   - Publish content (draft/publish workflow)

2. **API Data Retrieval**:
   - Next.js pages call `fetchStrapi()` function
   - API requests include populate parameters for related data
   - Authentication via Bearer token for secure endpoints

3. **Dynamic Rendering**:
   - Content is structured as dynamic zones with component types
   - `blocksMap.js` maps component types to React components
   - Components receive data props and render accordingly

4. **Cache Management**:
   - Next.js ISR provides automatic caching (3600s revalidation)
   - Strapi webhooks trigger immediate cache invalidation
   - Tag-based revalidation for granular cache control

### Component Mapping System

The project uses a sophisticated component mapping system where Strapi content types are dynamically rendered as React components:

```javascript
// Example from blocksMap.js
export const homeBlocksMap = {
  "layout.hero": HomeHero, 
  "layout.content-block": ServicesBlock,
  "layout.feature-card": FeatureCard, 
  "layout.feature-item": WhyChooseUs, 
  "layout.step-item": OurProcess,
  "layout.target-audience-section": WhatWeDo,
};
```

---

## Local Development Setup

### Prerequisites
- Node.js (18.0.0 to 22.x.x)
- npm (6.0.0+)
- PostgreSQL (recommended) or SQLite (development)
- Git

### Backend Setup (Strapi)

1. **Navigate to backend directory**:
   ```bash
   cd Backend_strapi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the Backend_strapi directory:
   ```env
   # Database Configuration
   DATABASE_CLIENT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=strapi_db
   DATABASE_USERNAME=strapi_user
   DATABASE_PASSWORD=your_password
   DATABASE_SSL=false

   # Server Configuration
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_app_keys_here

   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret

   # Email Configuration (optional)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USERNAME=your_email
   SMTP_PASSWORD=your_email_password
   ```

4. **Start development server**:
   ```bash
   npm run develop
   ```

5. **Create admin user**:
   - Navigate to `http://localhost:1337/admin`
   - Create your first admin user
   - Configure content types and create sample content

### Frontend Setup (Next.js)

1. **Navigate to frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file in the Frontend directory:
   ```env
   # Strapi Configuration
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_strapi_api_token

   # Revalidation Secret
   REVALIDATE_SECRET=your_revalidation_secret
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Strapi Admin: `http://localhost:1337/admin`

### Production Deployment

#### Frontend Deployment
```bash
cd Frontend
npm run build
npm start
```

#### Backend Deployment
```bash
cd Backend_strapi
npm run build
npm start
```

---

## Content Management Workflow

### Creating Content in Strapi

1. **Access Admin Panel**:
   - Navigate to Strapi admin (`http://localhost:1337/admin`)
   - Log in with admin credentials

2. **Content Types Available**:
   - **Home**: Single type for homepage content
   - **Article**: Collection type for blog posts
   - **Page**: Collection type for service pages
   - **Who We Are**: Single type for about page
   - **What We Do**: Single type for services overview
   - **Contact**: Single type for contact page
   - **Global**: Single type for site-wide settings

3. **Dynamic Zone Components**:
   Each content type uses dynamic zones with these components:
   - **Hero**: Main page header with title and CTA
   - **Content Block**: Text content with optional background
   - **Feature Card**: Highlight cards with icons/images
   - **Feature Item**: List items with descriptions
   - **Step Item**: Process steps or numbered items
   - **Target Audience Section**: Service offerings grid

4. **Content Creation Process**:
   - Select content type from sidebar
   - Add components to dynamic zone
   - Fill in component fields (text, images, buttons)
   - Configure SEO settings
   - Save as draft or publish immediately

### SEO Management

Each content type includes SEO components:
- **Meta Title**: Page title for search engines
- **Meta Description**: Page description for search results
- **Keywords**: Relevant keywords for SEO
- **Open Graph**: Social media sharing configuration
- **Canonical URL**: Preferred URL for search engines

---

## Dynamic Content System

### How Dynamic Zones Work

Dynamic zones in Strapi allow content creators to build pages by combining different component types. The frontend renders these components dynamically based on their type.

#### Example: Home Page Structure

```javascript
// Strapi returns this structure
{
  "Home": [
    {
      "__component": "layout.hero",
      "id": 1,
      "text": "Welcome to Our Website",
      "smallText": "Leading solutions provider",
      "Button": { "text": "Learn More", "url": "/about" }
    },
    {
      "__component": "layout.content-block",
      "id": 2,
      "leftText": "Our Services",
      "rightText": "We provide comprehensive solutions...",
      "Background": false
    }
  ]
}
```

#### Frontend Rendering

```javascript
// HomeClient.js processes this data
{blocks.map((block) => {
  switch (block.__component) {
    case "layout.hero":
      return <HomeHero key={block.id} data={block} />;
    case "layout.content-block":
      return <ServicesBlock key={block.id} data={block} />;
    // ... other components
  }
})}
```

### Rich Text Processing

The project uses Strapi's blocks format for rich text content:

```javascript
// parseStrapiRichText.js
export function parseStrapiRichText(textArray) {
  if (!Array.isArray(textArray)) return [];
  const parts = [];
  textArray.forEach((paragraph) => {
    paragraph.children.forEach((child) => {
      if (child.code) {
        parts.push({ span: true, text: child.text });
      } else {
        parts.push({ text: child.text });
      }
    });
    parts.push({ br: true });
  });
  return parts;
}
```

---

## API Integration

### Strapi API Functions

The `strapiApi.js` file provides the main interface between frontend and backend:

```javascript
export async function fetchStrapi(endpoint, { populate, tag, revalidate } = {}) {
  const queryString = populate
    ? "?" + qs.stringify({ populate }, { encodeValuesOnly: true })
    : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: {
        tags: tag ? [tag] : undefined,
        revalidate: revalidate || undefined,
      },
    }
  );

  return res.ok ? (await res.json()).data : null;
}
```

### Population Strategies

Content relationships are populated using the populate parameter:

```javascript
// Simple population
const homeData = await fetchStrapi("home", {
  populate: "*"
});

// Complex population for nested relationships
const complexData = await fetchStrapi("article", {
  populate: {
    SEO: { populate: "*" },
    author: { populate: "*" },
    categories: { populate: "*" }
  }
});
```

### API Endpoints

Common endpoints used in the project:
- `GET /api/home` - Homepage content
- `GET /api/articles` - Blog articles list
- `GET /api/articles/:slug` - Individual article
- `GET /api/who-we-are` - About page content
- `GET /api/what-we-do` - Services content
- `GET /api/global` - Site-wide settings

---

## Caching & Performance

### ISR (Incremental Static Regeneration)

Next.js pages use ISR for optimal performance:

```javascript
// Automatic revalidation every hour
export const revalidate = 3600;

// Or per-request revalidation
const data = await fetchStrapi("home", {
  populate: "*",
  revalidate: 3600
});
```

### Webhook-Based Revalidation

When content is updated in Strapi, webhooks trigger immediate cache invalidation:

```javascript
// app/api/revalidate/route.js
export async function POST(request) {
  const { model, entry } = await request.json();
  
  switch (model) {
    case 'home':
      revalidatePath('/');
      break;
    case 'article':
      const slug = entry?.slug;
      revalidatePath('/think-forward');
      if (slug) revalidatePath(`/article/${slug}`);
      break;
    // ... other content types
  }
  
  return NextResponse.json({ revalidated: true });
}
```

### Tag-Based Caching

Granular cache control using Next.js cache tags:

```javascript
// Fetch with cache tag
const globalData = await fetchStrapi("global", {
  populate: "*",
  tag: "global"
});

// Invalidate specific tag
revalidateTag('global');
```

---

## Troubleshooting

### Common Issues

#### 1. **API Connection Issues**
- **Problem**: Frontend can't connect to Strapi
- **Solution**: 
  - Check `NEXT_PUBLIC_STRAPI_API_URL` in `.env.local`
  - Ensure Strapi is running on correct port (1337)
  - Verify API token is correct and has proper permissions

#### 2. **Content Not Updating**
- **Problem**: Changes in Strapi don't appear on frontend
- **Solutions**:
  - Check if content is published (not draft)
  - Verify webhook revalidation is configured
  - Manually clear Next.js cache: delete `.next` folder and restart
  - Check browser cache (hard refresh with Ctrl+F5)

#### 3. **Image Loading Issues**
- **Problem**: Images from Strapi not displaying
- **Solutions**:
  - Verify image domains in `next.config.mjs`
  - Check image permissions in Strapi
  - Ensure proper image upload settings

#### 4. **Build Errors**
- **Problem**: Next.js build fails
- **Solutions**:
  - Check for TypeScript errors (set `ignoreBuildErrors: true` temporarily)
  - Ensure all environment variables are set
  - Verify all imports are correct

#### 5. **Database Connection Issues**
- **Problem**: Strapi can't connect to database
- **Solutions**:
  - Verify database credentials in `.env`
  - Ensure PostgreSQL is running
  - Check database exists and user has permissions

### Environment Variables Checklist

#### Frontend (.env.local)
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token
REVALIDATE_SECRET=your_secret
```

#### Backend (.env)
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_admin_secret
```

### Performance Optimization Tips

1. **Image Optimization**:
   - Use Next.js Image component
   - Configure proper image domains
   - Use appropriate image formats (WebP, AVIF)

2. **Bundle Size**:
   - Use dynamic imports for heavy components
   - Analyze bundle with `npm run build`
   - Remove unused dependencies

3. **Database Optimization**:
   - Use proper indexing in PostgreSQL
   - Limit population depth in API calls
   - Implement pagination for large datasets

4. **Caching Strategy**:
   - Set appropriate revalidation times
   - Use tag-based invalidation
   - Implement client-side caching where appropriate

### Development Best Practices

1. **Content Structure**:
   - Plan component hierarchy before creating
   - Use consistent naming conventions
   - Document component purposes and props

2. **Code Organization**:
   - Keep components focused and reusable
   - Use TypeScript for better type safety
   - Implement proper error boundaries

3. **Testing**:
   - Test API endpoints manually
   - Verify responsive design on multiple devices
   - Test content updates end-to-end

4. **Version Control**:
   - Use meaningful commit messages
   - Separate frontend and backend deployments
   - Tag releases for easy rollbacks

---

## Conclusion

This documentation provides a comprehensive guide to understanding, setting up, and maintaining the Next.js + Strapi dynamic website project. The architecture enables content creators to manage website content efficiently while providing developers with a flexible, performant, and maintainable codebase.

For additional support or questions, refer to the official documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [React Documentation](https://react.dev)

---

*Last updated: [Current Date]*
*Version: 1.0*