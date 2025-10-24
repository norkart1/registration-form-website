# Registration Form Application

## Overview

A full-stack registration form application built with Next.js 16, featuring simple user registration (Full Name and Email only), an admin dashboard for managing registrations, and MongoDB for data persistence. The application includes client-side form validation, responsive design using Tailwind CSS and shadcn/ui components, and basic token-based admin authentication.

**Platform**: Running on Replit (migrated from Vercel on October 24, 2025)

## Recent Changes

### October 24, 2025 - Warm Theme Design & Performance Update
- Implemented warm brown/orange gradient theme inspired by team login design
- Added lucide-react icons (User, Mail, LogIn) to enhance user experience
- Created glassmorphic card design with warm color palette
- Orange gradient button with hover effects
- Added Anek Latin font from Google Fonts for improved typography
- Fixed slow form submission by implementing MongoDB connection pooling
- Created shared MongoDB client using singleton pattern for better performance
- Updated all API routes to use pooled MongoDB connections

### October 24, 2025 - Form Simplification
- Simplified registration form to only collect Full Name and Email (removed country, state, and address fields)
- Updated API routes to handle simplified data structure
- Updated admin dashboard to display only Full Name and Email columns
- Updated edit dialog to only show Full Name and Email fields

### October 24, 2025 - Replit Migration
- Migrated project from Vercel to Replit environment
- Installed all dependencies using npm with --legacy-peer-deps flag
- Updated Next.js dev and production servers to bind to 0.0.0.0:5000 for Replit compatibility
- Removed deprecated eslint configuration from next.config.mjs (Next.js 16 compatibility)
- Updated TypeScript from 5.0.2 to 5.9.3 to resolve Next.js compatibility warnings
- Configured deployment settings for Replit autoscale deployment
- Connected MongoDB via MONGODB_URI environment secret
- Verified workflow is running successfully

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 16 with App Router
- Server and client components for optimal rendering
- App Router for file-based routing (`app/` directory)
- React Server Components by default, with `"use client"` for interactive components

**UI Components**: shadcn/ui with Radix UI primitives
- Pre-built accessible components (Button, Card, Dialog, Input, Select, Toast)
- Tailwind CSS for styling with custom design tokens
- Dark mode support via CSS variables (though not actively used)
- Responsive, mobile-first design approach

**State Management**: React hooks (useState, useEffect)
- Local component state for forms and UI interactions
- No global state management library
- Client-side localStorage for admin authentication token

**Form Handling**: 
- Manual form state management with controlled inputs
- Client-side validation before submission
- Toast notifications for user feedback

### Backend Architecture

**Runtime**: Next.js API Routes (Edge/Node.js runtime)
- RESTful API endpoints in `app/api/` directory
- Route handlers for CRUD operations

**API Endpoints**:
- `POST /api/registrations` - Create new registration
- `GET /api/registrations` - Fetch all registrations
- `PUT /api/registrations/[id]` - Update registration by ID
- `DELETE /api/registrations/[id]` - Delete registration by ID
- `POST /api/admin/login` - Admin authentication

**Authentication**: Simple token-based system
- Hardcoded credentials (admin/12345)
- Base64-encoded tokens stored in localStorage
- No JWT or session management
- No server-side token validation or expiration

**Data Validation**: Basic server-side checks
- Required field validation
- No schema validation library

### Data Storage

**Database**: MongoDB
- Direct MongoDB driver (no ORM)
- Connection string via `MONGODB_URI` environment variable
- Database: `registration_db`
- Collection: `registrations`

**Schema** (implicit):
```javascript
{
  _id: ObjectId,
  fullName: string,
  email: string,
  createdAt: Date,
  updatedAt: Date (only on updates)
}
```

**Connection Management**:
- New connection created per request (no connection pooling shown)
- May need optimization for production use

### Routing Structure

**Public Routes**:
- `/` - Registration form (home page)
- `/admin/login` - Admin login page

**Protected Routes**:
- `/admin/dashboard` - Admin dashboard (client-side protection via localStorage check)

### Static Data

**Country/State Data**: Hardcoded in `lib/countries-states.ts`
- Array of 50+ country names
- State/province mappings for each country
- Used for dynamic dropdown population

## External Dependencies

### Core Framework
- **Next.js** - React framework with server-side rendering and API routes
- **React** - UI library (version managed by Next.js)
- **TypeScript** - Type safety

### UI Libraries
- **@radix-ui/* packages** - Headless UI component primitives (Dialog, Select, Toast, etc.)
- **shadcn/ui** - Pre-styled component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant styling
- **tailwind-merge** - Utility for merging Tailwind classes
- **clsx** - Conditional class name utility
- **lucide-react** - Icon library

### Database & Backend
- **mongodb** - Official MongoDB Node.js driver
- **@mongodb-js/zstd** - Compression library for MongoDB

### Additional Services
- **@vercel/analytics** - Vercel analytics integration for deployment metrics

### Development Tools
- **next-themes** - Theme provider (dark mode support, though not actively toggled)
- **autoprefixer** - CSS vendor prefixing

### Notable Architectural Decisions

**Why Next.js**: Provides both frontend and backend in a single framework, simplifying deployment and development workflow

**Why MongoDB without ORM**: Direct driver usage provides flexibility but lacks type safety and schema validation that ORMs like Prisma or Mongoose would provide

**Why shadcn/ui**: Provides accessible, customizable components without being a heavy dependency since components are copied into the project

**Authentication Approach**: Simple token system is sufficient for single-admin use case but would need enhancement (JWT, bcrypt, session management) for production

**Form State Management**: Manual state management is acceptable for small forms but could benefit from libraries like React Hook Form or Formik for more complex validation needs