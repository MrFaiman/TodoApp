# TodoApp - Backend (Server)

A robust Express.js TypeScript backend API for the TodoApp application, featuring user authentication, task management, and MongoDB integration.

## 🚀 Features

- **RESTful API** design with Express.js
- **User Authentication** with bcrypt password hashing
- **Session Management** using Express sessions with MongoDB store
- **MongoDB Integration** with Mongoose ODM
- **TypeScript** for type safety and better development experience
- **Security Middleware** with Helmet and CORS
- **Environment Configuration** with dotenv
- **Development Hot Reload** with nodemon

## 🛠️ Tech Stack

- **Express.js 5.1.0** - Web application framework
- **TypeScript 5.9.2** - Static type checking
- **MongoDB** - NoSQL database
- **Mongoose 8.18.0** - MongoDB object modeling
- **bcrypt 6.0.0** - Password hashing
- **Express Session 1.18.2** - Session middleware
- **Helmet 8.1.0** - Security middleware
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.2** - Environment variable management

## 📁 Project Structure

```
server/
├── src/
│   ├── models/             # Database models
│   │   ├── User.ts         # User model schema
│   │   └── Task.ts         # Task model schema
│   ├── routes/             # API routes
│   │   ├── index.ts        # Route exports
│   │   ├── users.ts        # User authentication routes
│   │   └── tasks.ts        # Task management routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.ts         # Authentication middleware
│   ├── database.ts         # Database connection
│   └── server.ts           # Main server file
├── dist/                   # Compiled JavaScript (after build)
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variables template
├── .env                   # Environment variables (not in git)
└── README.md              # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```bash
   PORT=3000
   SECRET_KEY=your-super-secret-session-key
   ORIGIN_URL=http://localhost:5173
   MONGO_URI=mongodb://localhost:27017/todoapp
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Server will be running on**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build first)
- `npm run clean` - Remove dist directory
- `npm test` - Run tests (not implemented yet)

## 🔌 API Endpoints

### Authentication Routes (`/api/users`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Register new user | `{ email, password, name }` |
| POST | `/api/users/login` | User login | `{ email, password }` |
| POST | `/api/users/logout` | User logout | - |
| GET | `/api/users/me` | Get current user | - |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get user's tasks | - |
| POST | `/api/tasks` | Create new task | `{ title, description?, completed? }` |
| PUT | `/api/tasks/:id` | Update task | `{ title?, description?, completed? }` |
| DELETE | `/api/tasks/:id` | Delete task | - |

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## 🗄️ Database Models

### User Model
```typescript
interface IUser {
  email: string;        // Unique email address
  password: string;     // Hashed password
  name: string;         // User's display name
  createdAt: Date;      // Account creation date
  updatedAt: Date;      // Last update date
}
```

### Task Model
```typescript
interface ITask {
  title: string;        // Task title
  description?: string; // Optional task description
  completed: boolean;   // Task completion status
  userId: ObjectId;     // Reference to user
  createdAt: Date;      // Task creation date
  updatedAt: Date;      // Last update date
}
```

## 🔒 Authentication & Security

### Session-Based Authentication
- Sessions are stored in MongoDB using `connect-mongo`
- Session cookies are HTTP-only and secure in production
- Passwords are hashed using bcrypt with salt rounds

### Security Middleware
- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configured to allow requests from frontend origin
- **Express Session**: Secure session management

### Authentication Middleware
Protected routes require authentication:
```typescript
// Usage in routes
router.get('/protected-route', authMiddleware, (req, res) => {
  // req.user is available here
});
```

## 🔧 Development

### Environment Variables

Required environment variables:

- `PORT` - Server port (default: 3000)
- `SECRET_KEY` - Session secret key (use a strong, random string)
- `ORIGIN_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `MONGO_URI` - MongoDB connection string

### Database Connection

The server automatically connects to MongoDB on startup. Make sure your MongoDB instance is running:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud database
# Update MONGO_URI in .env with your Atlas connection string
```

### Adding New Routes

1. Create route file in `src/routes/`
2. Define routes with proper TypeScript types
3. Add authentication middleware if needed
4. Export routes in `src/routes/index.ts`
5. Import and use in `src/server.ts`

### Adding New Models

1. Create model file in `src/models/`
2. Define Mongoose schema with TypeScript interface
3. Export the model

## 🏗️ Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🚀 Deployment

### Environment Setup for Production

1. Set production environment variables
2. Use a production MongoDB instance
3. Set `NODE_ENV=production`
4. Use a reverse proxy (nginx) for SSL termination

### Docker Deployment (Optional)

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   sudo systemctl status mongod
   # Or check MongoDB Atlas connection string
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

3. **Environment Variables Not Loading**
   ```bash
   # Make sure .env file exists and is in server root
   # Check if dotenv is properly configured
   ```

4. **TypeScript Compilation Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

## 📊 Monitoring & Logging

The server includes basic console logging. For production, consider adding:

- Winston for structured logging
- Morgan for HTTP request logging
- Health check endpoints
- Performance monitoring

## 🤝 Contributing

When contributing to the backend:

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Update API documentation
5. Test your endpoints
6. Update this README if needed

## 📝 License

ISC License

---

*Built with ❤️ using Node.js, Express, and TypeScript*