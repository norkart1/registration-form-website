# Registration Form Application

## Overview

A full-stack registration form application built with Next.js 16, React 19, and MongoDB. The application provides a public-facing registration form where users can submit their details (full name, WhatsApp number, mobile number, email, profile image), along with a secure admin dashboard for managing submissions and editing registrations. The system features token-based authentication, data export capabilities (PDF/Excel), secure image upload validation, and a modern glassmorphic UI with a warm green/emerald color scheme.

## Recent Changes

### November 5, 2025 - Complete Registration Form Implementation
- ✅ **Added WhatsApp Number field** with phone icon and validation
- ✅ **Added Mobile Number field** with phone icon and validation
- ✅ **Added Profile Image Upload** with:
  - Drag & drop / click to upload interface
  - Image preview before submission
  - Client-side validation (5MB limit, image types only)
  - Server-side validation (MIME type allowlist: JPEG, PNG, GIF, WebP)
  - Base64 encoding for storage
  - Remove/replace image functionality
- ✅ **Updated API endpoints** with comprehensive server-side validation:
  - POST /api/registrations: Create with all fields including image
  - PUT /api/registrations/[id]: Update with image replacement/removal support
  - Validates image type, size, and format on server
- ✅ **Enhanced admin dashboard** to display all new fields:
  - Profile image thumbnails in table view
  - Horizontal scroll for wide table on mobile
  - All fields visible and editable
- ✅ **Updated edit dialog** with full field editing including image upload
- ✅ **Enhanced export utilities**:
  - PDF exports include all fields + "Image" indicator column (landscape mode)
  - Excel exports include all fields + "Has Profile Image" column
- 🔒 **Security improvements**: Server-side image validation, MIME type restrictions, size limits

### November 5, 2025 - Vercel to Replit Migration
- Successfully migrated project from Vercel to Replit environment
- Configured development workflow with Next.js dev server on port 5000 with host 0.0.0.0
- Configured deployment settings for production (autoscale mode with build and start scripts)
- Added Replit-specific files to .gitignore (.replit, replit.nix, .config/)
- MONGODB_URI environment variable configured in Replit Secrets
- All dependencies installed and application running successfully

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 16 with App Router
- Server-side rendering and React Server Components for optimal performance
- Client-side interactivity handled through React 19 with TypeScript
- Custom font loading using Anek Latin from Google Fonts
- Analytics integration via Vercel Analytics

**UI Component System**: shadcn/ui with Radix UI primitives
- Accessible, customizable component library based on Radix UI
- Styled using Tailwind CSS v4.1 with custom CSS variables
- Configuration in `components.json` defines aliases and theme settings
- Components include dialogs, buttons, cards, inputs, labels, toasts, and form controls

**State Management**: React hooks (useState, useEffect) for local component state
- No global state management library (Redux/Zustand) used
- Form data managed within individual components
- Authentication state stored in localStorage with token-based approach

**Styling Approach**: Utility-first CSS with Tailwind CSS v4
- Custom color palette defined in `app/globals.css` using CSS variables
- Green/emerald gradient theme (from #064e3b through #065f46 to #047857)
- Glassmorphic card designs with backdrop blur and opacity
- Responsive design using mobile-first breakpoints (sm, lg)
- Custom animations and transitions for smooth user experience

### Backend Architecture

**API Layer**: Next.js API Routes (App Router format)
- RESTful endpoints located in `app/api/` directory
- Routes organized by resource (`registrations`, `admin`)
- Dynamic routes for individual resource operations (`[id]/route.ts`)

**Key API Endpoints**:
1. `POST /api/registrations` - Create new registration
2. `GET /api/registrations` - Fetch all registrations (admin only)
3. `PUT /api/registrations/[id]` - Update specific registration
4. `DELETE /api/registrations/[id]` - Delete specific registration
5. `POST /api/admin/login` - Authenticate admin user
6. `POST /api/admin/change-password` - Update admin password
7. `POST /api/admin/setup` - Initialize admin account

**Authentication & Authorization**:
- bcrypt.js for password hashing (10 salt rounds)
- Base64-encoded tokens for session management
- Token format: `base64(username:timestamp)`
- Tokens stored in browser localStorage
- Client-side route protection using useEffect guards
- No JWT implementation - simple token-based approach for admin access

**Data Validation**:
- Client-side validation in form components (required fields, email format)
- Server-side validation in API routes (field presence checks)
- No schema validation library (Zod/Yup) currently implemented

### Data Storage

**Database**: MongoDB with native Node.js driver
- Connection pooling configuration in `lib/mongodb.ts`
- Pool settings: maxPoolSize=10, minPoolSize=5, timeouts configured
- Singleton pattern for connection management in development
- Environment-based connection handling (dev vs production)

**Database Structure**:
- Database name: `registration_db`
- Collections:
  - `registrations` - User submissions (fullName, whatsappNumber, mobileNumber, email, profileImage, createdAt, updatedAt)
  - `admin_users` - Admin accounts (username, password hash, createdAt)

**Data Model**:
```typescript
Registration {
  _id: ObjectId
  fullName: string
  whatsappNumber: string
  mobileNumber: string
  email: string
  profileImage?: string (base64 encoded)
  createdAt: Date
  updatedAt?: Date
}

AdminUser {
  _id: ObjectId
  username: string
  password: string (hashed)
  createdAt: Date
}
```

**Connection Management**:
- Global connection promise in development to prevent multiple connections
- Connection timeout: 5000ms
- Socket timeout: 10000ms
- Automatic connection cleanup in request handlers where needed

### Export Functionality

**PDF Export**: jsPDF with autoTable plugin
- Generates formatted PDF reports of registrations
- Includes title, timestamp, and tabular data
- Custom styling with column widths and formatting

**Excel Export**: SheetJS (xlsx library)
- Creates .xlsx files with registration data
- Column configuration for optimal display
- Sequential numbering and date formatting

### Authentication Flow

1. Admin setup via `scripts/setup-admin.js` (creates initial admin account)
2. Login via `/admin/login` page submits credentials to `/api/admin/login`
3. Server validates against MongoDB `admin_users` collection using bcrypt
4. On success, generates Base64 token and returns to client
5. Client stores token in localStorage
6. Protected routes check for token presence in useEffect
7. Password changes validated through `/api/admin/change-password` endpoint

### Routing Structure

**Public Routes**:
- `/` - Registration form (home page)
- `/admin/login` - Admin authentication

**Protected Routes** (client-side guards):
- `/admin/dashboard` - Admin management interface

**Component Organization**:
- `/components` - Shared React components
- `/components/ui` - shadcn/ui primitives
- `/app` - Next.js app router pages and layouts
- `/lib` - Utility functions and database connection
- `/scripts` - Setup and maintenance scripts

## External Dependencies

### Core Framework
- **Next.js 16** - React framework with App Router, server components, and API routes
- **React 19** - UI library with latest concurrent features
- **TypeScript 5.1** - Type safety and developer experience

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework with custom configuration
- **shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Unstyled, accessible component primitives (22+ components)
- **class-variance-authority** - CSS class variant management
- **clsx & tailwind-merge** - Conditional className utilities
- **Lucide React** - Icon library (via iconLibrary setting)
- **Anek Latin** (Google Fonts) - Custom typography

### Database & Authentication
- **MongoDB** - NoSQL database with native Node.js driver
- **mongodb** package - Official MongoDB driver with connection pooling
- **bcryptjs** - Password hashing and verification
- **@mongodb-js/zstd** - MongoDB compression support

### Form Management
- **react-hook-form** - Form state and validation (implied by @hookform/resolvers)
- **@hookform/resolvers** - Schema validation resolvers for react-hook-form

### Export Utilities
- **jspdf** - PDF generation library
- **jspdf-autotable** - Table plugin for jsPDF
- **xlsx (SheetJS)** - Excel file generation and manipulation

### Analytics & Monitoring
- **@vercel/analytics** - Analytics integration for Vercel deployments

### Cloud Dependencies
- **@aws-sdk/credential-providers** - AWS credential management (likely for potential S3/cloud storage)
- **gcp-metadata** - Google Cloud Platform metadata access (potential cloud deployment support)

### Development Tools
- **autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting (configured but config not shown)

### Environment Variables Required
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment designation (development/production)

### Database Schema Notes
- No ORM or schema validation library currently in use
- Direct MongoDB driver operations without Mongoose
- Schema enforced through TypeScript interfaces and runtime validation
- Future consideration: May benefit from adding Zod or similar for API validation