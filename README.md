# RenewEdge - Dynamic Website Project

A modern, dynamic website built with **Next.js** frontend and **Strapi CMS** backend, designed for efficient content management and optimal performance.

## 🚀 Project Overview

RenewEdge is a dynamic website project that combines the power of Next.js for the frontend with Strapi CMS for content management. The project enables content creators to manage website content through Strapi's admin panel, with changes automatically reflected on the Next.js frontend through intelligent caching and revalidation.

### ✨ Key Features

- **🔄 Dynamic Content Management**: Content managed through Strapi CMS with real-time updates
- **🧩 Component-Based Architecture**: Modular, reusable components for different content types
- **⚡ Performance Optimized**: Intelligent caching with ISR (Incremental Static Regeneration)
- **📱 Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **🎨 Rich Animations**: GSAP-powered animations and interactions
- **🔍 SEO Optimized**: Dynamic meta tags and SEO components
- **🔄 Real-time Updates**: Webhook-based cache invalidation for instant content updates

## 🏗️ Architecture

```
Content Creator → Strapi Admin Panel → PostgreSQL Database
                                           ↓
                                    Strapi API Endpoints
                                           ↓
Next.js Frontend ← API Calls ← Dynamic Component Rendering
                                           ↓
                                    End User Website
```

## 📁 Project Structure

```
RenewEdge/
├── Frontend/                    # Next.js Frontend Application
│   ├── app/                    # Next.js App Router
│   ├── components/             # React Components
│   ├── lib/                    # Utility functions
│   ├── public/                 # Static assets
│   └── package.json           # Frontend dependencies
├── Backend_strapi/             # Strapi CMS Backend
│   ├── src/                   # Source code
│   │   ├── api/               # Content types & API endpoints
│   │   └── components/        # Reusable content components
│   ├── config/                # Configuration files
│   └── package.json          # Backend dependencies
└── PROJECT_DOCUMENTATION.md   # Detailed project documentation
```

## 🛠️ Technology Stack

### Frontend (Next.js)
- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4.x
- **Animations**: GSAP 3.13.0
- **Content Rendering**: Strapi Blocks React Renderer
- **UI Components**: Lucide React, React Dropzone, Swiper

### Backend (Strapi)
- **CMS**: Strapi v5.16.1
- **Database**: PostgreSQL (production) / SQLite (development)
- **Plugins**: 
  - Deep Populate plugin
  - SEO plugin
  - Users & Permissions
  - Nodemailer for email

## 🚀 Quick Start

### Prerequisites

- Node.js (18.0.0 to 22.x.x)
- npm (6.0.0+)
- PostgreSQL (recommended) or SQLite (development)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RenewEdge
```

### 2. Backend Setup (Strapi)

```bash
# Navigate to backend directory
cd Backend_strapi

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

### 3. Frontend Setup (Next.js)

```bash
# Navigate to frontend directory (from project root)
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your Strapi API URL and tokens

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password

# Server Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys_here

# JWT Configuration
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
```

### Frontend (.env.local)
```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token

# Revalidation Secret
REVALIDATE_SECRET=your_revalidation_secret
```

## 📋 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run develop  # Start development with auto-reload
npm run build    # Build admin panel
npm run start    # Start production server
npm run console  # Strapi console
```

## 🎯 Content Management

### Content Types Available:
- **Home**: Homepage content and hero sections
- **Articles**: Blog posts and news articles
- **Pages**: Service and informational pages
- **Who We Are**: About page content
- **What We Do**: Services overview
- **Contact**: Contact page content
- **Global**: Site-wide settings and navigation

### Dynamic Components:
- **Hero Sections**: Main page headers with CTAs
- **Content Blocks**: Rich text content areas
- **Feature Cards**: Highlight cards with icons
- **Process Steps**: Numbered process items
- **Service Sections**: Service offering grids

## 🔄 Content Update Workflow

1. **Create/Edit Content** in Strapi admin panel
2. **Configure SEO** settings for each page
3. **Publish Content** (draft → published)
4. **Automatic Cache Invalidation** via webhooks
5. **Content Appears Live** on frontend immediately

## 🚀 Deployment

### Production Build

#### Frontend:
```bash
cd Frontend
npm run build
npm start
```

#### Backend:
```bash
cd Backend_strapi
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured for your production environment, including:
- Database credentials
- JWT secrets
- API tokens
- CORS settings

## 📖 Documentation

For detailed documentation, please refer to:
- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - Comprehensive project documentation
- [Frontend README](./Frontend/README.md) - Frontend-specific documentation
- [Backend README](./Backend_strapi/README.md) - Backend-specific documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Check the [troubleshooting section](./PROJECT_DOCUMENTATION.md#troubleshooting) in the project documentation
- Review [Next.js Documentation](https://nextjs.org/docs)
- Review [Strapi Documentation](https://docs.strapi.io)

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js and Strapi**