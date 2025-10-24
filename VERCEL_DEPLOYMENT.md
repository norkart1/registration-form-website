# Vercel Deployment Guide

## Issues Fixed

### 1. Package Manager Conflict ✅
**Problem:** The project had both `pnpm-lock.yaml` and `package-lock.json`, causing Vercel to fail with:
```
ESM_PKGM_AND_MODFILE_ENTRY_CONFLICT Cannot install with "frozen-lockfile"
```

**Solution:**
- Removed `pnpm-lock.yaml` to use npm exclusively
- Added `"packageManager": "npm@10.8.2"` to package.json
- Created `.npmrc` for consistent npm behavior

### 2. Build Configuration ✅
**Verified:**
- Build completes successfully locally
- All routes compile correctly
- Static and dynamic routes properly configured

## Environment Variables Required

You must configure the following environment variable in your Vercel project:

### MONGODB_URI
Your MongoDB connection string.

**For MongoDB Atlas (Recommended for Production):**
```
mongodb+srv://username:password@cluster.mongodb.net/registration_db?retryWrites=true&w=majority
```

**For local testing:**
```
mongodb://localhost:27017/registration_db
```

## Vercel Setup Steps

1. **Add Environment Variables:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `MONGODB_URI` with your MongoDB connection string
   - Make sure to add it for all environments (Production, Preview, Development)

2. **Deploy:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Vercel will automatically trigger a new deployment
   - The build should now succeed

## Build Commands (Already Configured)

- **Build Command:** `npm run build`
- **Install Command:** `npm install` (automatic)
- **Output Directory:** `.next` (automatic)

## Verification

To verify the build locally before deploying:
```bash
npm run build
npm start
```

The build should complete without errors and show:
- ✓ Compiled successfully
- ✓ Generating static pages
- Route listing with proper indicators (○ Static, ƒ Dynamic)

## Common Issues

### If build still fails:
1. Make sure `MONGODB_URI` is set in Vercel environment variables
2. Check that package-lock.json is committed to your repository
3. Verify you're using Node.js 18.x or higher in Vercel settings

### If MongoDB connection fails:
1. Whitelist Vercel's IP addresses in MongoDB Atlas (or use 0.0.0.0/0 for all IPs)
2. Ensure the MongoDB user has proper read/write permissions
3. Check that the database name in the URI matches your application

## Support

For deployment issues, check:
- Vercel deployment logs
- MongoDB Atlas logs (if using Atlas)
- Network access settings in MongoDB Atlas
