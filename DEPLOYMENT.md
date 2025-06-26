# Deployment Guide for Class Notice Board Application

This guide will help you deploy both the client and server parts of the Class Notice Board application on Render.

## Prerequisites

1. **MongoDB Atlas Account**: You'll need a MongoDB Atlas account for the database
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **GitHub Repository**: Push your code to a GitHub repository

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create an account
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Deploy the Backend (Server)

1. **Go to Render Dashboard**
   - Sign in to your Render account
   - Click "New +" and select "Web Service"

2. **Connect Repository**
   - Connect your GitHub repository
   - Select the repository containing your project

3. **Configure the Service**
   - **Name**: `notices-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose the closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server` (since your server code is in the server folder)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add the following environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens (generate a random string)
   - `PORT`: `10000` (Render will use this port)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Note the URL (e.g., `https://notices-backend.onrender.com`)

## Step 3: Deploy the Frontend (Client)

1. **Go to Render Dashboard**
   - Click "New +" and select "Static Site"

2. **Connect Repository**
   - Connect the same GitHub repository
   - Select the repository containing your project

3. **Configure the Service**
   - **Name**: `notices-frontend` (or any name you prefer)
   - **Environment**: `Static Site`
   - **Region**: Choose the same region as your backend
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `client` (since your client code is in the client folder)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Environment Variables**
   Add the following environment variable:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://notices-backend.onrender.com`)

5. **Deploy**
   - Click "Create Static Site"
   - Wait for the deployment to complete
   - Note the URL (e.g., `https://notices-frontend.onrender.com`)

## Step 4: Test Your Deployment

1. **Test the Backend**
   - Visit your backend URL + `/api/notices` (e.g., `https://notices-backend.onrender.com/api/notices`)
   - You should see an empty array `[]` or any existing notices

2. **Test the Frontend**
   - Visit your frontend URL
   - Try to register a new user
   - Try to log in
   - Create a notice (if you're a teacher/admin)

## Step 5: Set up Custom Domain (Optional)

1. **Backend Custom Domain**
   - Go to your backend service settings
   - Add a custom domain (e.g., `api.yourdomain.com`)
   - Update your DNS settings accordingly

2. **Frontend Custom Domain**
   - Go to your frontend service settings
   - Add a custom domain (e.g., `yourdomain.com`)
   - Update your DNS settings accordingly

3. **Update Environment Variables**
   - Update `REACT_APP_API_URL` in your frontend to use your custom backend domain

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Render
   - Ensure all dependencies are in `package.json`
   - Verify the build command is correct

2. **Database Connection Issues**
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has correct permissions

3. **CORS Issues**
   - The backend is already configured with CORS
   - If you're using custom domains, update the CORS configuration in `server.js`

4. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Ensure no extra spaces or quotes in the values

### Logs and Debugging

1. **View Logs**
   - Go to your service in Render
   - Click on "Logs" tab
   - Check for any error messages

2. **Redeploy**
   - If you make changes, push to your GitHub repository
   - Render will automatically redeploy
   - You can also manually redeploy from the Render dashboard

## Security Considerations

1. **JWT Secret**
   - Use a strong, random string for JWT_SECRET
   - Never commit secrets to your repository

2. **MongoDB Security**
   - Use strong passwords for database users
   - Regularly rotate database credentials
   - Consider using MongoDB Atlas VPC peering for production

3. **Environment Variables**
   - Keep all sensitive data in environment variables
   - Never expose secrets in client-side code

## Cost Optimization

1. **Free Tier Limits**
   - Render free tier has limitations
   - Services may sleep after inactivity
   - Consider upgrading for production use

2. **Database Optimization**
   - Use MongoDB Atlas free tier for development
   - Consider paid plans for production workloads

## Support

If you encounter issues:
1. Check the Render documentation
2. Review the application logs
3. Verify all configuration steps
4. Test locally before deploying

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure backups for your database
3. Set up CI/CD pipelines
4. Consider implementing SSL certificates
5. Set up error tracking (e.g., Sentry) 