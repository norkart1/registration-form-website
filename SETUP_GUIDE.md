# Complete Setup Guide

## What's Included

This is a complete, production-ready registration form website with:

✅ **Registration Form Page** (`/`)
- Full name input
- Email input
- Address input
- Country dropdown (50+ countries)
- State/Province dropdown (auto-populated based on country)
- Form validation
- Success/error notifications
- Responsive design

✅ **Admin Dashboard** (`/admin/dashboard`)
- View all registrations in a table
- Edit registrations with a dialog
- Delete registrations with confirmation
- Real-time updates
- Responsive table layout

✅ **Admin Login** (`/admin/login`)
- Secure login page
- Database-stored credentials with bcrypt hashing
- Token-based authentication
- Dark theme UI

✅ **API Routes**
- POST /api/registrations - Submit new registration
- GET /api/registrations - Fetch all registrations
- PUT /api/registrations/[id] - Update registration
- DELETE /api/registrations/[id] - Delete registration
- POST /api/admin/login - Admin authentication (MongoDB + bcrypt)
- POST /api/admin/setup - Create admin users (bcrypt hashed)

✅ **Database**
- MongoDB integration
- Automatic schema creation
- Timestamps for all records

✅ **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons
- Optimized layouts

## Quick Start

### 1. Set MongoDB Connection

Create `.env.local`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017
\`\`\`

Or use MongoDB Atlas:
\`\`\`
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/registration_db
\`\`\`

### 2. Install & Run

\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Create Admin User

\`\`\`bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_secure_password"}'
\`\`\`

### 4. Access the App

- **Registration Form**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## File Structure

\`\`\`
registration-app/
├── app/
│   ├── page.tsx                          # Home - Registration form
│   ├── layout.tsx                        # Root layout
│   ├── globals.css                       # Global styles
│   ├── admin/
│   │   ├── login/page.tsx               # Admin login page
│   │   └── dashboard/page.tsx           # Admin dashboard
│   └── api/
│       ├── registrations/
│       │   ├── route.ts                 # GET/POST registrations
│       │   └── [id]/route.ts            # PUT/DELETE registration
│       └── admin/
│           └── login/route.ts           # Admin login API
├── components/
│   ├── registration-form.tsx            # Registration form
│   ├── admin-login-form.tsx             # Admin login form
│   ├── admin-dashboard.tsx              # Dashboard table
│   ├── edit-registration-dialog.tsx     # Edit dialog
│   └── ui/                              # shadcn/ui components
├── lib/
│   ├── countries-states.ts              # Country/state data
│   └── utils.ts                         # Utilities
├── hooks/
│   └── use-toast.ts                     # Toast notifications
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
└── postcss.config.mjs
\`\`\`

## Features Breakdown

### Registration Form
- **Validation**: All fields required
- **Country Dropdown**: 50+ countries
- **State Dropdown**: Auto-populated (100+ states/provinces)
- **Toast Notifications**: Success/error feedback
- **Form Reset**: Clears after successful submission

### Admin Dashboard
- **Authentication**: Token-based login
- **Table View**: All registrations displayed
- **Edit Functionality**: Modal dialog for editing
- **Delete Functionality**: Confirmation before deletion
- **Real-time Updates**: Immediate UI refresh
- **Logout**: Secure session termination

### Responsive Design
- **Mobile**: Optimized for 320px+
- **Tablet**: Optimized for 768px+
- **Desktop**: Optimized for 1024px+
- **Touch-friendly**: Large buttons and inputs
- **Flexible Layouts**: Adapts to all screen sizes

## Database Schema

### Registrations Collection
\`\`\`javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  address: String,
  country: String,
  state: String,
  createdAt: Date,
  updatedAt: Date (optional)
}
\`\`\`

### Admin Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  username: String,
  password: String (bcrypt hashed),
  createdAt: Date
}
\`\`\`

## API Documentation

### POST /api/registrations
Submit a new registration
\`\`\`json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "country": "United States",
  "state": "California"
}
\`\`\`

### GET /api/registrations
Fetch all registrations
\`\`\`json
[
  {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "country": "United States",
    "state": "California",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
\`\`\`

### PUT /api/registrations/[id]
Update a registration
\`\`\`json
{
  "_id": "...",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "address": "456 Oak Ave",
  "country": "Canada",
  "state": "Ontario"
}
\`\`\`

### DELETE /api/registrations/[id]
Delete a registration (returns 200 on success)

### POST /api/admin/login
Admin authentication (checks MongoDB with bcrypt)
\`\`\`json
{
  "username": "your_username",
  "password": "your_password"
}
\`\`\`
Response:
\`\`\`json
{
  "token": "base64_encoded_token",
  "success": true
}
\`\`\`

### POST /api/admin/setup
Create new admin user (bcrypt hashed)
\`\`\`json
{
  "username": "admin",
  "password": "secure_password"
}
\`\`\`
Response:
\`\`\`json
{
  "success": true,
  "message": "Admin user created successfully"
}
\`\`\`

## Customization

### Add Admin Users
Use the setup API to create admin users:
\`\`\`bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"newadmin","password":"secure_password"}'
\`\`\`

### Add More Countries/States
Edit `lib/countries-states.ts` and add to the COUNTRIES and STATES objects.

### Customize Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes in components

## Production Checklist

- [x] Password hashing with bcrypt implemented
- [ ] Protect `/api/admin/setup` endpoint (e.g., one-time use, admin-only)
- [ ] Set up proper MongoDB Atlas cluster
- [ ] Add environment variables to deployment platform
- [ ] Implement proper authentication (JWT with expiration)
- [ ] Add rate limiting to API endpoints
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Add input validation and sanitization
- [ ] Implement CORS properly
- [ ] Add database backups
- [ ] Set up monitoring and alerts

## Support

For issues or questions, check:
1. MongoDB connection string
2. Environment variables are set
3. Node.js version is 18+
4. Port 3000 is available
5. All dependencies are installed

## License

MIT - Feel free to use this project for personal or commercial purposes.
