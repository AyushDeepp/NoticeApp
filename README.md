# Class Notice Board Application

A web application for managing class notices using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: Signup and login for teachers, students, and administrators
- **Notice Management**: Teachers can post and delete their own notices
- **User Management**: Administrators can add users and delete old notices
- **Responsive Design**: Works well on both desktop and mobile browsers
- **Date-wise Display**: Notices are displayed in chronological order

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js/Express backend API
- `/server/models` - MongoDB schemas
- `/server/routes` - API routes
- `/server/controllers` - Business logic

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the development servers:

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend client
cd ../client
npm start
```

The application will be available at http://localhost:3000

## Deployment

This application is configured for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment Steps:

1. **Set up MongoDB Atlas** - Create a free MongoDB Atlas cluster
2. **Deploy Backend** - Deploy the server as a Web Service on Render
3. **Deploy Frontend** - Deploy the client as a Static Site on Render
4. **Configure Environment Variables** - Set up the required environment variables

### Environment Variables for Production:

**Backend (Server):**
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A strong secret key for JWT tokens
- `PORT`: `10000`

**Frontend (Client):**
- `REACT_APP_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Notices
- `GET /api/notices` - Get all notices
- `GET /api/notices/:id` - Get a specific notice
- `POST /api/notices` - Create a new notice (teachers only)
- `DELETE /api/notices/:id` - Delete a notice (author or admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create a new user (admin only)
- `PUT /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

## User Roles

- **Student**: Can view notices
- **Teacher**: Can view, create, and delete their own notices
- **Admin**: Can view, create, delete all notices and manage users

## Technologies Used

- **Frontend**: React.js, React Bootstrap, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap 5
- **Icons**: React Icons
- **Date Handling**: Moment.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
#   N o t i c e A p p  
 