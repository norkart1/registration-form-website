# 📝 Registration Form Application

<div align="center">

![Project Logo](./public/logo.png)

**A modern, full-stack registration form application with admin dashboard**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-latest-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo-mockups) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-endpoints)

</div>

---

## 🌟 Features

### 🎯 Core Functionality
- ✅ **Simple Registration Form** - Collect Full Name and Email
- ✅ **Real-time Validation** - Client-side form validation with instant feedback
- ✅ **Admin Dashboard** - Comprehensive management interface
- ✅ **CRUD Operations** - Create, Read, Update, and Delete registrations
- ✅ **Secure Authentication** - Token-based admin login system
- ✅ **MongoDB Integration** - Reliable data persistence with connection pooling
- ✅ **Export Functionality** - Export data to PDF and Excel formats
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🎨 Design Highlights
- 🌅 **Warm Theme** - Beautiful brown/orange gradient design
- 💎 **Glassmorphic Cards** - Modern frosted glass effect
- 🎭 **Smooth Animations** - Elegant transitions and hover effects
- 📱 **Mobile-First** - Fully responsive across all devices
- 🔤 **Custom Typography** - Anek Latin Google Font
- 🎨 **shadcn/ui Components** - Beautiful, accessible UI primitives

### 🔒 Security Features
- 🔐 **Password Hashing** - bcrypt for secure password storage
- 🎫 **Token Authentication** - Base64-encoded auth tokens
- 🛡️ **Input Validation** - Both client and server-side validation
- 🔒 **Environment Variables** - Secure credential management

---

## 📱 Demo Mockups

### Desktop View

#### 🏠 Registration Form (Home Page)
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🌐 Registration Form                                     Admin Login →     │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                     ╔═══════════════════════════════╗                      │
│                     ║                               ║                      │
│                     ║    📝 Registration Form       ║                      │
│                     ║    ─────────────────────      ║                      │
│                     ║                               ║                      │
│                     ║    👤 Full Name               ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │ Enter your name...  │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║                               ║                      │
│                     ║    ✉️  Email Address          ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │ your@email.com...   │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║                               ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │  Submit Registration │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║         (Orange Gradient)     ║                      │
│                     ╚═══════════════════════════════╝                      │
│                                                                             │
│                         Glassmorphic Card Design                           │
│                         with Warm Brown/Orange Theme                        │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

#### 🔐 Admin Login Page
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🌐 Admin Login                                          ← Back to Home    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                     ╔═══════════════════════════════╗                      │
│                     ║                               ║                      │
│                     ║    🔐 Admin Login             ║                      │
│                     ║    ─────────────              ║                      │
│                     ║                               ║                      │
│                     ║    Username                   ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │ Enter username...   │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║                               ║                      │
│                     ║    Password                   ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │ ••••••••••••••••    │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║                               ║                      │
│                     ║    ┌─────────────────────┐   ║                      │
│                     ║    │    🚀 Login         │   ║                      │
│                     ║    └─────────────────────┘   ║                      │
│                     ║                               ║                      │
│                     ╚═══════════════════════════════╝                      │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

#### 📊 Admin Dashboard
```
┌────────────────────────────────────────────────────────────────────────────┐
│  📊 Admin Dashboard                                    👤 Admin  [Logout]  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📝 Registrations                              [📥 Export PDF] [📊 Excel]  │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │ #  │ Full Name        │ Email                  │ Created    │ Actions││ │
│  ├────┼──────────────────┼────────────────────────┼────────────┼────────┤│ │
│  │ 1  │ John Doe         │ john@example.com       │ Oct 24     │ ✏️  🗑️ ││ │
│  │ 2  │ Jane Smith       │ jane@example.com       │ Oct 24     │ ✏️  🗑️ ││ │
│  │ 3  │ Bob Johnson      │ bob@example.com        │ Oct 25     │ ✏️  🗑️ ││ │
│  │ 4  │ Alice Williams   │ alice@example.com      │ Oct 25     │ ✏️  🗑️ ││ │
│  │ 5  │ Charlie Brown    │ charlie@example.com    │ Oct 25     │ ✏️  🗑️ ││ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  Showing 5 registrations                                                   │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### Mobile View

#### 📱 Mobile Registration Form
```
┌─────────────────────────┐
│  ☰  Registration   🔐   │
├─────────────────────────┤
│                         │
│  ╔═══════════════════╗  │
│  ║                   ║  │
│  ║  📝 Registration  ║  │
│  ║  Form             ║  │
│  ║  ────────         ║  │
│  ║                   ║  │
│  ║  👤 Full Name     ║  │
│  ║  ┌──────────────┐ ║  │
│  ║  │ Enter name.. │ ║  │
│  ║  └──────────────┘ ║  │
│  ║                   ║  │
│  ║  ✉️  Email        ║  │
│  ║  ┌──────────────┐ ║  │
│  ║  │ your@email.. │ ║  │
│  ║  └──────────────┘ ║  │
│  ║                   ║  │
│  ║  ┌──────────────┐ ║  │
│  ║  │   Submit     │ ║  │
│  ║  └──────────────┘ ║  │
│  ║                   ║  │
│  ╚═══════════════════╝  │
│                         │
│  Touch-optimized design │
│  Large input fields     │
│                         │
└─────────────────────────┘
```

#### 📱 Mobile Admin Dashboard
```
┌─────────────────────────┐
│  ☰  Dashboard   [Logout]│
├─────────────────────────┤
│                         │
│  📝 Registrations       │
│  [📥 PDF] [📊 Excel]    │
│                         │
│  ┌───────────────────┐  │
│  │ John Doe          │  │
│  │ john@example.com  │  │
│  │ Oct 24, 2025      │  │
│  │ [✏️ Edit] [🗑️ Del] │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Jane Smith        │  │
│  │ jane@example.com  │  │
│  │ Oct 24, 2025      │  │
│  │ [✏️ Edit] [🗑️ Del] │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Bob Johnson       │  │
│  │ bob@example.com   │  │
│  │ Oct 25, 2025      │  │
│  │ [✏️ Edit] [🗑️ Del] │  │
│  └───────────────────┘  │
│                         │
│  Card-based layout      │
│  for mobile             │
│                         │
└─────────────────────────┘
```

### Tablet View
```
┌──────────────────────────────────────────────────┐
│  📊 Dashboard                    👤 [Logout]     │
├──────────────────────────────────────────────────┤
│                                                  │
│  📝 Registrations          [📥 PDF] [📊 Excel]  │
│  ────────────────────────────────────────────   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ Name           │ Email           │ Actions│   │
│  ├────────────────┼─────────────────┼────────┤   │
│  │ John Doe       │ john@example.com│ ✏️  🗑️ │   │
│  │ Jane Smith     │ jane@example.com│ ✏️  🗑️ │   │
│  │ Bob Johnson    │ bob@example.com │ ✏️  🗑️ │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  Optimized for 768px - 1024px screens           │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd registration-form-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/registration_db
   ```
   
   For MongoDB Atlas (recommended):
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/registration_db?retryWrites=true&w=majority
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Registration Form: `http://localhost:5000`
   - Admin Login: `http://localhost:5000/admin/login`

### Creating Your First Admin User

Use the setup script (recommended):
```bash
npm run setup-admin
```

Or manually via API:
```bash
curl -X POST http://localhost:5000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_secure_password"}'
```

**Default credentials** (if using setup script):
- Username: `admin`
- Password: `12345` (⚠️ Change this immediately!)

---

## 📚 Documentation

### Project Structure

```
registration-form-app/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # Home page with registration form
│   ├── layout.tsx                    # Root layout with providers
│   ├── globals.css                   # Global styles and theme
│   ├── admin/
│   │   ├── login/page.tsx           # Admin login page
│   │   └── dashboard/page.tsx       # Admin dashboard page
│   └── api/                         # API Routes
│       ├── registrations/
│       │   ├── route.ts             # GET/POST registrations
│       │   └── [id]/route.ts        # PUT/DELETE by ID
│       └── admin/
│           ├── login/route.ts       # Admin authentication
│           └── setup/route.ts       # Create admin users
├── components/                       # React components
│   ├── registration-form.tsx        # Main registration form
│   ├── admin-login-form.tsx         # Admin login form
│   ├── admin-dashboard.tsx          # Dashboard with table
│   ├── admin-profile-dropdown.tsx   # Admin menu dropdown
│   ├── edit-registration-dialog.tsx # Edit dialog
│   ├── delete-confirmation-dialog.tsx # Delete confirmation
│   ├── change-password-dialog.tsx   # Change password
│   ├── header.tsx                   # App header
│   ├── theme-provider.tsx           # Theme context
│   ├── watermark.tsx                # App watermark
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── toast.tsx
├── hooks/
│   └── use-toast.ts                 # Toast notification hook
├── lib/
│   ├── mongodb.ts                   # MongoDB connection with pooling
│   ├── utils.ts                     # Utility functions
│   └── export-utils.ts              # PDF/Excel export utilities
├── public/                          # Static assets
│   ├── logo.png
│   └── placeholder-*.{png,svg,jpg}
├── scripts/
│   └── setup-admin.js               # Admin setup script
├── styles/
│   └── globals.css                  # Additional global styles
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.mjs                  # Next.js configuration
├── postcss.config.mjs               # PostCSS configuration
├── components.json                  # shadcn/ui configuration
└── README.md                        # This file
```

### Database Schema

#### Registrations Collection
```typescript
{
  _id: ObjectId,           // Auto-generated MongoDB ID
  fullName: string,        // User's full name
  email: string,           // User's email address
  createdAt: Date,         // Registration timestamp
  updatedAt?: Date         // Last update timestamp (optional)
}
```

#### Admin Users Collection
```typescript
{
  _id: ObjectId,           // Auto-generated MongoDB ID
  username: string,        // Admin username
  password: string,        // bcrypt hashed password (10 rounds)
  createdAt: Date          // Account creation timestamp
}
```

---

## 🔌 API Endpoints

### Registration Endpoints

#### `POST /api/registrations`
Create a new registration

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "success": true
}
```

#### `GET /api/registrations`
Fetch all registrations

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-24T12:00:00.000Z"
  }
]
```

#### `PUT /api/registrations/[id]`
Update a registration

**Request Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "success": true
}
```

#### `DELETE /api/registrations/[id]`
Delete a registration

**Response (200):**
```json
{
  "success": true
}
```

### Admin Endpoints

#### `POST /api/admin/login`
Admin authentication

**Request Body:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

**Response (200):**
```json
{
  "token": "base64_encoded_token",
  "success": true
}
```

#### `POST /api/admin/setup`
Create admin user (⚠️ Secure this endpoint in production!)

**Request Body:**
```json
{
  "username": "admin",
  "password": "secure_password"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin user created successfully"
}
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript 5.1
- **Styling:** Tailwind CSS 4.1
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Fonts:** Anek Latin (Google Fonts)
- **Form Handling:** React Hooks (useState, useEffect)
- **Notifications:** Toast (Sonner)

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** MongoDB (official driver)
- **Authentication:** bcrypt for password hashing
- **Exports:** jsPDF, xlsx

### Development Tools
- **Package Manager:** npm 10.8.2
- **Build Tool:** Next.js built-in
- **Code Quality:** ESLint
- **Deployment:** Supports Vercel and other cloud platforms

---

## 🎨 Theming & Customization

### Color Scheme
The application uses a warm brown/orange gradient theme:

- **Primary:** Orange gradient (`from-orange-500 to-amber-600`)
- **Background:** Warm brown tones
- **Accents:** Glassmorphic effects with backdrop blur
- **Text:** High contrast for accessibility

### Customizing Colors

Edit `app/globals.css`:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;    /* Orange */
    --primary-foreground: 60 9.1% 97.8%;
    /* ... other variables */
  }
}
```

### Adding Custom Components

This project uses shadcn/ui. Add new components:
```bash
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add popover
```

---

## 📤 Export Functionality

The admin dashboard supports exporting registration data:

### PDF Export
- Clean, professional layout
- Company logo included
- Formatted table with all registration data
- Timestamp and page numbers

### Excel Export
- Full data export in `.xlsx` format
- Formatted headers
- Auto-sized columns
- Compatible with Microsoft Excel, Google Sheets, etc.

**Usage:**
1. Navigate to Admin Dashboard
2. Click "Export PDF" or "Export Excel" button
3. File downloads automatically

---

## 🔒 Security Best Practices

### Implemented
✅ bcrypt password hashing (10 salt rounds)  
✅ Environment variable for database credentials  
✅ Client and server-side input validation  
✅ Token-based authentication  
✅ MongoDB connection pooling (prevents connection exhaustion)

### Recommended for Production
⚠️ **Protect `/api/admin/setup` endpoint** (one-time use or IP whitelist)  
⚠️ **Implement JWT with expiration** instead of simple tokens  
⚠️ **Add rate limiting** to prevent brute force attacks  
⚠️ **Enable CORS** properly for API endpoints  
⚠️ **Use HTTPS** in production (SSL/TLS)  
⚠️ **Add CSRF protection** for forms  
⚠️ **Implement logging & monitoring** for security events  
⚠️ **Regular dependency updates** for security patches

### Environment Variables
Never commit `.env.local` or `.env` files to version control!

Add to `.gitignore`:
```
.env*.local
.env
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect repository:**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Connect GitHub repository

3. **Add environment variables:**
   - Go to Vercel project settings
   - Add `MONGODB_URI` in Environment Variables section

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Build Commands
```bash
npm run build      # Production build
npm start          # Start production server
npm run dev        # Development server
npm run lint       # Run ESLint
```

---

## 🧪 Testing

### Manual Testing Checklist

**Registration Form:**
- [ ] Submit with valid name and email
- [ ] Submit with empty fields (should show validation)
- [ ] Submit with invalid email format
- [ ] Check success notification appears
- [ ] Verify form clears after successful submission

**Admin Login:**
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should fail)
- [ ] Verify redirect to dashboard on success
- [ ] Check token is stored in localStorage

**Admin Dashboard:**
- [ ] View all registrations
- [ ] Edit a registration (update name/email)
- [ ] Delete a registration with confirmation
- [ ] Export to PDF
- [ ] Export to Excel
- [ ] Logout functionality

**Responsive Design:**
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoServerError: Authentication failed`
- ✅ Check username and password in connection string
- ✅ Verify database user has proper permissions
- ✅ For MongoDB Atlas, whitelist your IP address

**Error:** `MongooseServerSelectionError`
- ✅ Check if MongoDB service is running
- ✅ Verify connection string format
- ✅ Check network connectivity

### Build Errors

**Error:** `Module not found`
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error:** `Port 5000 is already in use`
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Admin Can't Login

1. Verify admin user exists in database
2. Re-create admin user via setup API
3. Clear browser localStorage
4. Check browser console for errors

---

## 📊 Performance Optimizations

✅ **MongoDB Connection Pooling** - Reuses connections for better performance  
✅ **React Server Components** - Reduces client-side JavaScript  
✅ **Image Optimization** - Next.js automatic image optimization  
✅ **Code Splitting** - Automatic route-based code splitting  
✅ **Static Generation** - Pre-rendered pages where possible

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📝 Changelog

### v2.0.0 - October 24, 2025
- ✨ Simplified registration form (Full Name + Email only)
- 🎨 Implemented warm brown/orange gradient theme
- 💎 Added glassmorphic card design
- 🔥 Fixed slow form submission with connection pooling
- 📦 Updated to Next.js 16 and React 19

### v1.0.0 - Initial Release
- 🎉 Basic registration form with full address fields
- 👤 Admin dashboard with CRUD operations
- 🔐 Admin authentication system
- 📊 MongoDB integration

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - Database solution
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library

---

## 📞 Support

For issues, questions, or suggestions:

1. **Check the documentation** in this README
2. **Review existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Contact the development team**

---

<div align="center">

**Built with ❤️ using Next.js, React, and MongoDB**

⭐ Star this repo if you find it helpful!

[View Demo](#-demo-mockups) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>
