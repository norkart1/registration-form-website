# Registration Form Application - Technical Guide

## Overview

A full-stack registration form application built with Next.js 16 and React 19, featuring a modern green-themed UI with glassmorphic design. The application provides a public-facing registration form and a secure admin dashboard for managing registrations, with data export capabilities and WhatsApp integration.

**Core Purpose**: Enable users to register with their details (name, contact information, profile image) and provide administrators with a comprehensive interface to view, edit, delete, and export registration data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering**
- **Next.js 16 App Router**: Server-side rendering with React Server Components for optimal performance
- **React 19**: Latest React features with improved concurrent rendering
- **TypeScript**: Full type safety across the application
- **Routing**: File-based routing with separate routes for public registration (`/`), admin login (`/admin/login`), and admin dashboard (`/admin/dashboard`)

**UI Component System**
- **shadcn/ui**: Pre-built, customizable UI components based on Radix UI primitives
- **Radix UI**: Accessible, unstyled component primitives for dialogs, dropdowns, forms
- **Tailwind CSS v4**: Utility-first styling with custom green theme
- **Design Pattern**: Glassmorphic cards with warm emerald/green gradient theme
- **Custom Font**: Anek Latin from Google Fonts for brand consistency

**State Management**
- **Client-Side State**: React hooks (useState, useEffect) for local component state
- **Authentication State**: localStorage for admin token persistence
- **Form State**: react-hook-form with zod validation (via @hookform/resolvers)

**Key UI Features**
- Real-time form validation with instant feedback
- Image upload with preview (base64 encoding, max 5MB)
- Responsive design (mobile-first approach)
- Auto-hiding header on scroll
- Export functionality (PDF and Excel)
- Success/error dialogs for user feedback

### Backend Architecture

**API Structure**
- **Next.js API Routes**: Server-side endpoints in `/app/api` directory
- **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE)

**API Endpoints**:
- `GET /api/registrations` - Fetch all registrations
- `POST /api/registrations` - Create new registration
- `PUT /api/registrations/[id]` - Update existing registration
- `DELETE /api/registrations/[id]` - Delete registration
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/change-password` - Update admin password
- `POST /api/admin/setup` - Initial admin user creation

**Data Validation**
- **Client-Side**: Form validation with real-time feedback
- **Server-Side**: Request body validation, image format/size checks
- **Image Validation**: Type checking (JPEG, PNG, GIF, WebP), size limit enforcement (5-7MB)

### Data Storage

**Database: MongoDB**
- **Connection Strategy**: Singleton pattern with connection pooling
- **Collections**:
  - `registrations`: User registration data with profile images (base64)
  - `admin_users`: Admin credentials with bcrypt-hashed passwords
- **Connection Pooling**: Configured for 5-10 concurrent connections with timeout handling
- **Database Name**: `registration_db`

**Data Model - Registrations**:
```typescript
{
  _id: ObjectId,
  fullName: string,
  whatsappNumber: string,
  mobileNumber: string,
  email: string,
  profileImage: string (base64),
  createdAt: Date,
  updatedAt?: Date
}
```

**Data Model - Admin Users**:
```typescript
{
  _id: ObjectId,
  username: string,
  password: string (bcrypt hashed),
  createdAt: Date
}
```

**Design Rationale**: MongoDB chosen for flexibility with unstructured data (base64 images), easy horizontal scaling, and simple document-based querying without complex joins.

### Authentication & Authorization

**Admin Authentication**
- **Password Hashing**: bcrypt (10 salt rounds) for secure credential storage
- **Token System**: Base64-encoded tokens containing username and timestamp
- **Storage**: Client-side localStorage for token persistence
- **Session Management**: Token validation on protected routes
- **Route Protection**: Client-side checks in dashboard, redirects to login if unauthenticated

**Security Considerations**:
- Passwords never transmitted or stored in plain text
- Token-based auth (consideration: could be upgraded to JWT for enhanced security)
- Environment variable protection for sensitive credentials
- Input validation on both client and server

### Image Handling

**Strategy**: Base64 encoding for simplicity
- **Upload**: Client-side FileReader API converts images to base64
- **Storage**: Base64 strings stored directly in MongoDB documents
- **Validation**: Type checking, size limits (5MB user-facing, 7MB backend buffer)
- **Preview**: Immediate client-side preview using base64 data URLs

**Trade-offs**:
- **Pros**: Simple implementation, no external file storage needed, atomic database operations
- **Cons**: Larger database size (~33% overhead), potential performance issues with many images
- **Alternative Considered**: Cloud storage (AWS S3, Cloudinary) - rejected for MVP simplicity

### Export Functionality

**PDF Export**
- **Library**: jsPDF with autoTable plugin
- **Features**: Formatted table layout, custom styling, automatic page breaks
- **Data**: All registration fields except profile images (to reduce file size)

**Excel Export**
- **Library**: xlsx (SheetJS)
- **Features**: Formatted spreadsheet with custom column widths
- **Data**: Complete registration data with image indicators

**Design Decision**: Client-side export generation reduces server load and provides instant downloads without API calls.

## External Dependencies

### Third-Party Services

**WhatsApp Cloud API Integration**
- **Purpose**: Send automated messages to registered users
- **API Version**: v21.0
- **Authentication**: Bearer token (access token)
- **Configuration Required**:
  - `WHATSAPP_ACCESS_TOKEN`: Meta Business API access token
  - `WHATSAPP_PHONE_NUMBER_ID`: WhatsApp Business phone number ID
  - `WHATSAPP_BUSINESS_PHONE`: Business phone number
- **Implementation**: `/lib/whatsapp.ts` utility for message sending
- **Status**: Infrastructure present, integration ready but not actively used in current flow

**Vercel Analytics**
- **Purpose**: Performance monitoring and usage analytics
- **Integration**: `@vercel/analytics/next` package
- **Implementation**: Wrapped in root layout for automatic tracking

### Database

**MongoDB**
- **Connection**: Via `mongodb` native driver
- **URI**: Configured via `MONGODB_URI` environment variable
- **Features Used**:
  - Connection pooling (5-10 connections)
  - Timeout handling (5s connect, 10s socket)
  - Development mode connection caching
  - Native ObjectId operations

### UI Libraries

**shadcn/ui Components**
- Comprehensive set of 25+ Radix UI-based components
- Custom configuration in `components.json`
- New York style variant with neutral base color
- Tailwind CSS integration with CSS variables

**Styling**
- **Tailwind CSS**: v4 with custom theme configuration
- **tw-animate-css**: Animation utilities
- **class-variance-authority**: Component variant management
- **clsx + tailwind-merge**: Utility class composition

### Utility Libraries

**Form Handling**
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation resolver integration
- `zod`: Schema validation (implied by resolver usage)

**Date Handling**
- `date-fns`: Date formatting and manipulation

**Carousel**
- `embla-carousel-react`: Touch-friendly carousel implementation

**Icons**
- `lucide-react`: Icon library (Lucide icons)

**PDF/Excel Generation**
- `jspdf` + `jspdf-autotable`: PDF generation
- `xlsx`: Excel file generation

**Security**
- `bcryptjs`: Password hashing

### Environment Variables Required

```
MONGODB_URI=mongodb://...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_BUSINESS_PHONE=...
```

### Development Tools

**Package Manager**: npm 10.8.2 (specified via packageManager field)
**Port Configuration**: Default port 5000 on all interfaces (0.0.0.0)
**Scripts**:
- `dev`: Development server
- `build`: Production build
- `start`: Production server
- `setup-admin`: Initial admin user creation script