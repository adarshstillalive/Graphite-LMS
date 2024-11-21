# Graphite LMS Client
This is the client-side application for the Learning Management System (LMS). It provides a responsive and user-friendly interface for users, instructors, instructor helpers, and administrators.

# Features

# User:

Browse and enroll in courses.
View purchased courses and progress.
Chat with instructors or helpers.
Manage their profile.

# Instructor:

Create, edit, and manage courses.
Interact with enrolled students.
View analytics for their courses.
Instructor Helper:

Assist instructors by resolving student queries.
Respond to student chats promptly.

# Admin:

Manage users, courses, and revenue reports.
Add, edit, or delete coupons.
Oversee platform-wide activity.
Technologies Used
Frontend Framework: React (with TypeScript)
Styling: Tailwind CSS
State Management: Redux
API Communication: Axios
Routing: React Router
Prototyping: Figma
Getting Started
Prerequisites
Node.js (>= 14.x)
npm
A running backend server (LMS Server)

# Setup

Clone the Repository

git clone : 
cd lms-client
Install Dependencies

npm install

Environment Variables Create a .env file in the root directory and configure the following variables:


REACT_APP_API_URL=http://localhost:5173
REACT_APP_AUTH_SECRET=your-secret
Start the Development Server

npm start


# Folder Structure

src/
│
├── components/          # Reusable UI components
├── pages/               # Page components for different routes
├── context/             # Context API for global state management
├── hooks/               # Custom React hooks
├── services/            # API calls and utility functions
├── styles/              # Global and reusable styles
├── utils/               # Helper functions
├── App.tsx              # Root application component
├── index.tsx            # Entry point for React

# Scripts

npm start: Run the development server.
npm run build: Build the project for production.
npm run lint: Lint and fix code errors.
npm run test: Run tests.

# Contact
For queries, contact Adarsh KS at adarshstillalive@gmail.com.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
