# RenewEdge Backend - Strapi CMS

A powerful Strapi v5 CMS backend designed to manage dynamic content for the RenewEdge website, featuring custom content types, dynamic zones, and API integrations.

## 🚀 Overview

This is the backend portion of the RenewEdge project, built with Strapi v5.16.1. It provides a headless CMS with custom content types, dynamic zones for flexible content creation, and API endpoints for the Next.js frontend.

## 🛠️ Tech Stack

- **CMS**: Strapi v5.16.1
- **Runtime**: Node.js (18.0.0 to 22.x.x)
- **Database**: PostgreSQL (production) / SQLite (development)
- **Language**: TypeScript
- **Plugins**: 
  - Deep Populate plugin
  - SEO plugin
  - Users & Permissions
  - Nodemailer for email

## 📁 Project Structure

```
Backend_strapi/
├── src/                         # Source code
│   ├── api/                     # Content types and API routes
│   │   ├── home/               # Homepage content type
│   │   ├── article/            # Blog articles
│   │   ├── who-we-are/         # About page content
│   │   ├── what-we-do/         # Services content
│   │   ├── contact/            # Contact page
│   │   ├── page/               # Dynamic pages
│   │   ├── global/             # Site-wide settings
│   │   └── [other-types]/      # Additional content types
│   ├── components/             # Reusable content components
│   │   ├── layout/             # Layout components
│   │   │   ├── hero/           # Hero sections
│   │   │   ├── content-block/  # Content blocks
│   │   │   ├── feature-card/   # Feature cards
│   │   │   └── [others]/       # Other layout components
│   │   ├── elements/           # UI elements
│   │   └── shared/             # Shared components (SEO, etc.)
│   ├── extensions/             # Strapi extensions
│   └── admin/                  # Admin panel customizations
├── config/                     # Configuration files
│   ├── database.ts            # Database configuration
│   ├── server.ts              # Server settings
│   ├── admin.ts               # Admin panel config
│   ├── api.ts                 # API configuration
│   ├── middlewares.ts         # Middleware setup
│   └── plugins.ts             # Plugin configuration
├── types/                     # TypeScript definitions
├── database/                  # Database files (SQLite)
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (18.0.0 to 22.x.x)
- npm (6.0.0+)
- PostgreSQL (recommended) or SQLite (development)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory:
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
   
   # Transfer Token Salt
   TRANSFER_TOKEN_SALT=your_transfer_token_salt
   
   # Email Configuration (optional)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USERNAME=your_email
   SMTP_PASSWORD=your_email_password
   ```

3. **Database Setup** (PostgreSQL):
   ```sql
   CREATE DATABASE strapi_db;
   CREATE USER strapi_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE strapi_db TO strapi_user;
   ```

4. **Start Development Server**:
   ```bash
   npm run develop
   ```

5. **Create Admin User**:
   - Navigate to `http://localhost:1337/admin`
   - Create your first admin user
   - Configure content types and permissions

## 📋 Available Scripts

```bash
npm run develop  # Start development server with auto-reload
npm run dev      # Alias for develop
npm run build    # Build admin panel for production
npm run start    # Start production server
npm run console  # Open Strapi console
npm run deploy   # Deploy to Strapi Cloud
npm run upgrade  # Upgrade Strapi to latest version
```

## 🎯 Content Types

### Single Types (One instance per type)

#### 1. **Home** (`/api/home`)
Homepage content with dynamic zones:
- Hero sections
- Feature cards
- Content blocks
- Process steps

#### 2. **Who We Are** (`/api/who-we-are`)
About page content:
- Company information
- Team details
- Mission and vision

#### 3. **What We Do** (`/api/what-we-do`)
Services overview:
- Service descriptions
- Target audience sections
- Process workflows

#### 4. **Contact** (`/api/contact`)
Contact page content:
- Contact information
- Office locations
- Contact forms

#### 5. **Global** (`/api/global`)
Site-wide settings:
- Navigation menus
- Footer content
- Social media links
- SEO defaults

### Collection Types (Multiple instances)

#### 1. **Articles** (`/api/articles`)
Blog posts and news articles:
- Title and content
- Author information
- Categories and tags
- Publication status
- SEO optimization

#### 2. **Pages** (`/api/pages`)
Dynamic service pages:
- Custom page content
- Dynamic zones
- SEO settings
- URL slugs

## 🧩 Dynamic Components

### Layout Components (`src/components/layout/`)

#### Hero (`layout.hero`)
Main page headers with:
- Title and subtitle text
- Call-to-action buttons
- Background images/videos
- Text positioning options

#### Content Block (`layout.content-block`)
Flexible content areas with:
- Left and right text columns
- Background color options
- Rich text support
- Image integration

#### Feature Card (`layout.feature-card`)
Highlight cards featuring:
- Icons or images
- Title and description
- Call-to-action buttons
- Various layouts

#### Feature Item (`layout.feature-item`)
List items with:
- Bullet points or icons
- Descriptions
- Grouping options

#### Step Item (`layout.step-item`)
Process steps with:
- Numbered or sequential items
- Progress indicators
- Detailed descriptions

#### Target Audience Section (`layout.target-audience-section`)
Service offering grids with:
- Service categories
- Target demographics
- Feature highlights

### Element Components (`src/components/elements/`)
- Buttons with various styles
- Image galleries
- Video embeds
- Quote blocks
- Testimonials

### Shared Components (`src/components/shared/`)
- SEO metadata
- Social sharing
- Breadcrumbs
- Analytics tracking

## 🔧 Configuration

### Database Configuration (`config/database.ts`)

```typescript
export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

### Server Configuration (`config/server.ts`)

```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

### Plugin Configuration (`config/plugins.ts`)

```typescript
export default {
  'strapi-plugin-deep-populate': {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
    },
  },
};
```

## 🔐 Permissions & Authentication

### API Tokens
Create API tokens for frontend access:
1. Go to Settings → API Tokens
2. Create new token with appropriate permissions
3. Use token in frontend environment variables

### User Roles
- **Super Admin**: Full access to all content and settings
- **Editor**: Content creation and editing permissions
- **Author**: Limited content creation permissions

### Content Permissions
Configure permissions for each content type:
- Public access for published content
- Authenticated access for drafts
- Role-based editing permissions

## 🚀 Deployment

### Production Build

```bash
# Build the admin panel
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```env
# Production Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your_production_host
DATABASE_PORT=5432
DATABASE_NAME=production_db
DATABASE_USERNAME=production_user
DATABASE_PASSWORD=secure_password
DATABASE_SSL=true

# Security
APP_KEYS=production_app_keys
JWT_SECRET=production_jwt_secret
ADMIN_JWT_SECRET=production_admin_secret
API_TOKEN_SALT=production_api_salt
TRANSFER_TOKEN_SALT=production_transfer_salt

# Server
HOST=0.0.0.0
PORT=1337

# Email
SMTP_HOST=your_smtp_provider
SMTP_PORT=587
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_email_password
```

### Database Migration

For production deployment:
1. Export content from development
2. Set up production database
3. Import content to production
4. Configure webhooks and API tokens

## 🎨 Content Management Workflow

### Creating Content

1. **Login to Admin Panel**:
   - Access `http://localhost:1337/admin`
   - Use admin credentials

2. **Select Content Type**:
   - Choose from sidebar menu
   - Single types: direct editing
   - Collection types: create new entries

3. **Build Content with Dynamic Zones**:
   - Add components to dynamic zones
   - Configure component properties
   - Upload media files
   - Set SEO metadata

4. **Publish Content**:
   - Save as draft for review
   - Publish when ready
   - Triggers frontend revalidation

### SEO Management

Each content type includes SEO components:
- Meta title and description
- Keywords and tags
- Open Graph settings
- Canonical URLs
- Structured data

## 🔄 API Endpoints

### Available Endpoints

```
GET  /api/home                 # Homepage content
GET  /api/who-we-are          # About page
GET  /api/what-we-do          # Services page
GET  /api/contact             # Contact page
GET  /api/global              # Site settings
GET  /api/articles            # Blog articles list
GET  /api/articles/:id        # Single article
GET  /api/pages               # Dynamic pages list
GET  /api/pages/:id           # Single page
```

### Population Parameters

Use the Deep Populate plugin for complex data fetching:

```javascript
// Simple population
?populate=*

// Deep population
?populate[0]=components&populate[1]=SEO&populate[2]=author.avatar

// Using Deep Populate plugin
?populate=deep,10
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Database Connection**
- Verify database credentials
- Check PostgreSQL service status
- Confirm database exists and permissions

#### 2. **Admin Panel Access**
- Check server is running on port 1337
- Verify admin JWT secret
- Clear browser cache

#### 3. **API Token Issues**
- Regenerate API tokens
- Check token permissions
- Verify token format in requests

#### 4. **Plugin Errors**
- Check plugin compatibility with Strapi v5
- Verify plugin configuration
- Review plugin documentation

#### 5. **Content Not Saving**
- Check field validations
- Verify media upload permissions
- Review server logs for errors

### Performance Optimization

1. **Database Indexing**:
   - Add indexes for frequently queried fields
   - Optimize slug and ID lookups

2. **Media Optimization**:
   - Configure responsive images
   - Set up CDN for media files
   - Enable image optimization

3. **Caching**:
   - Implement Redis for sessions
   - Configure API response caching
   - Use database query optimization

## 📚 Resources

- [Strapi v5 Documentation](https://docs.strapi.io)
- [Deep Populate Plugin](https://www.npmjs.com/package/@fourlights/strapi-plugin-deep-populate)
- [SEO Plugin](https://www.npmjs.com/package/@strapi/plugin-seo)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Follow Strapi coding conventions
2. Test content type changes thoroughly
3. Document new components and fields
4. Update API documentation
5. Test with frontend integration

---

For more detailed information, see the main [project documentation](../PROJECT_DOCUMENTATION.md).
