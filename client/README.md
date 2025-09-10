# TodoApp - Frontend (Client)

A modern React TypeScript frontend for the TodoApp application, built with Vite for optimal development experience and performance.

## 🚀 Features

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Responsive Design** that works on desktop and mobile
- **Modern UI Components** for login and task management
- **Axios Integration** for seamless API communication
- **ESLint Configuration** for code quality
- **Hot Module Replacement** for instant development feedback

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Static type checking
- **Vite 7.1.2** - Next generation frontend tooling
- **Axios 1.11.0** - Promise-based HTTP client
- **React Icons 5.5.0** - Popular icon library
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── LoginForm.tsx   # User authentication form
│   │   └── TaskItem.tsx    # Individual task component
│   ├── api.ts             # API service functions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── types.ts           # TypeScript type definitions
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite environment types
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
├── vite.config.ts         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── .gitignore            # Git ignore rules
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Development

### Component Development

Components are located in `src/components/`. Each component is written in TypeScript with proper type definitions.

**Example component structure:**
```typescript
interface ComponentProps {
  // Define your props here
}

const MyComponent: React.FC<ComponentProps> = ({ ...props }) => {
  // Component logic
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

### API Integration

API calls are centralized in `src/api.ts`. This file contains all the functions for communicating with the backend server.

### Styling

Global styles are defined in `src/index.css`. The project uses vanilla CSS with modern CSS features.

### Type Definitions

Shared TypeScript types are defined in `src/types.ts` for consistency across components.

## 🏗️ Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

The build output will be in the `dist/` directory, ready for deployment.

## 🔗 API Integration

The frontend communicates with the backend API running on `http://localhost:3000`. Make sure the server is running before starting the client development server.

### API Endpoints Used

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Customization

### Styling
Modify `src/index.css` for global styles or add component-specific CSS modules.

### Configuration
- **Vite Config**: `vite.config.ts`
- **TypeScript Config**: `tsconfig.json`, `tsconfig.app.json`
- **ESLint Config**: `eslint.config.js`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Dependencies issues**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code style
2. Add TypeScript types for new components
3. Update this README if adding new features
4. Test your changes thoroughly
5. Run linting before committing: `npm run lint`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

*Built with ❤️ using React and TypeScript*