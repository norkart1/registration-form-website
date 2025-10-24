# Registration Form Website with Admin Dashboard

A full-stack registration form application with MongoDB database, admin dashboard, and responsive design.

## Features

- **Registration Form**: Collect user information (full name, email, address, country, state)
- **Dynamic Dropdowns**: Country and state dropdowns with automatic state population based on country selection
- **Admin Dashboard**: View, edit, and delete registrations
- **Admin Authentication**: Secure login with username and password (admin/12345)
- **Responsive Design**: Works seamlessly on all devices (mobile, tablet, desktop)
- **MongoDB Integration**: Persistent data storage

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB instance (local or cloud)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017
\`\`\`

For MongoDB Atlas (cloud):
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/registration_db?retryWrites=true&w=majority
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Registration Form
1. Navigate to the home page
2. Fill in all required fields:
   - Full Name
   - Email
   - Address
   - Country (select from dropdown)
   - State/Province (automatically populated based on country)
3. Click "Submit Registration"

### Admin Dashboard
1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with credentials:
   - Username: `admin`
   - Password: `12345`
3. View all registrations in a table format
4. **Edit**: Click the Edit button to modify registration details
5. **Delete**: Click the Delete button to remove a registration

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Home page with registration form
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login page
│   │   └── dashboard/page.tsx   # Admin dashboard page
│   ├── api/
│   │   ├── registrations/
│   │   │   ├── route.ts         # GET/POST registrations
│   │   │   └── [id]/route.ts    # PUT/DELETE specific registration
│   │   └── admin/
│   │       └── login/route.ts   # Admin authentication
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── registration-form.tsx    # Registration form component
│   ├── admin-login-form.tsx     # Admin login form
│   ├── admin-dashboard.tsx      # Dashboard with registrations table
│   ├── edit-registration-dialog.tsx # Edit dialog
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── countries-states.ts      # Country and state data
│   └── utils.ts                 # Utility functions
└── package.json
\`\`\`

## API Endpoints

### Registrations
- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Create new registration
- `PUT /api/registrations/[id]` - Update registration
- `DELETE /api/registrations/[id]` - Delete registration

### Admin
- `POST /api/admin/login` - Admin login

## Technologies Used

- **Frontend**: React 19, Next.js 16, TypeScript
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Form Handling**: React hooks
- **State Management**: React hooks (useState, useEffect)

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## Security Notes

- Admin credentials are hardcoded for demo purposes. In production, use proper authentication.
- Implement proper password hashing and JWT tokens for production.
- Add CORS and rate limiting for API endpoints.
- Validate all inputs on both client and server side.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

\`\`\`bash
npm run build
npm start
\`\`\`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your connection string
- For MongoDB Atlas, whitelist your IP address
- Check that the database name matches your connection string

### Port Already in Use
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
\`\`\`

### Build Errors
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
\`\`\`

## License

MIT
