# To-Do List Application

![Badge](https://img.shields.io/badge/License-MIT-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## Description

A full-stack, interactive to-do application with user authentication that allows you to securely create, manage, and track your tasks. Built with the MERN stack (MongoDB, Express, React, Node.js) and GraphQL for efficient data management.

## ✨ Features

- 🔐 **User Authentication** - Secure sign up and login with JWT tokens
- ✅ **Create Todos** - Add tasks with title and description
- ✏️ **Update Todos** - Mark tasks as complete or incomplete
- 🗑️ **Delete Todos** - Remove completed or unwanted tasks
- 💾 **Persistent Storage** - All data saved to MongoDB database
- 🎨 **Responsive Design** - Works on desktop and mobile devices
- 🔒 **Secure** - Password hashing with bcrypt and protected routes

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Apollo Client (GraphQL)
- React Router DOM
- React Bootstrap
- Axios

**Backend:**
- Node.js
- Express.js
- Apollo Server Express
- GraphQL
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contributors](#contributors)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)
- **MongoDB Compass** (optional, for database visualization)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-3
   ```

2. **Install all dependencies** (root, server, and client)
   ```bash
   npm run install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running locally on port 27017, OR
   - Have a MongoDB Atlas connection string ready

4. **Configure environment variables** (see next section)

5. **Start the application**
   ```bash
   npm run develop
   ```
   This will start both the server (port 3001) and client (port 3000) concurrently.

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory with the following:

```env
REACT_APP_MONGOOSE_STRING=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
```

**Configuration Details:**
- `REACT_APP_MONGOOSE_STRING`: Your MongoDB connection string
  - Local: `mongodb://localhost:27017/todoapp`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/todoapp`
- `JWT_SECRET`: A secure random string for signing tokens (create your own!)
- `PORT`: Server port (default: 3001)

## 💻 Usage

1. **Access the application**
   - Open your browser to `http://localhost:3000`

2. **Create an account**
   - Click "Sign Up" in the navigation
   - Enter your email and password
   - Click "Sign Up" button

3. **Login**
   - After signing up, you'll be redirected to login
   - Enter your credentials
   - Click "Login"

4. **Manage your todos**
   - Navigate to "To-Do List" in the navbar
   - Add new tasks with title and description
   - Click on a task to mark it complete/incomplete
   - Click delete button to remove tasks

5. **Logout**
   - Your session is maintained via JWT token
   - Clear browser localStorage to logout

## 📁 Project Structure

```
project-3/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── styles/         # CSS files
│       └── utils/          # Apollo Client, queries, mutations
├── server/                 # Node.js backend
│   ├── config/            # Database connection
│   ├── models/            # Mongoose models
│   ├── schemas/           # GraphQL schema and resolvers
│   └── utils/             # Authentication utilities
└── package.json           # Root package file
```

## 🔌 API Endpoints

**GraphQL Endpoint:** `http://localhost:3001/graphql`

**Queries:**
- `todos` - Get all todos for authenticated user

**Mutations:**
- `registerUser(input: RegisterUserInput!)` - Create new user account
- `loginUser(input: LoginUserInput!)` - Login and receive JWT token
- `createTodo(title: String!, description: String!)` - Create new todo
- `updateTodo(id: ID!, completed: Boolean!)` - Update todo status
- `deleteTodo(id: ID!)` - Delete a todo

## 🔧 Troubleshooting

### Server won't start
- Make sure MongoDB is running
- Check that ports 3000 and 3001 are not in use
- Kill processes: `npx kill-port 3000 3001`

### Connection errors
- Verify MongoDB connection string in `.env`
- Ensure MongoDB Compass shows active connection
- Check server terminal for error messages

### Authentication issues
- Clear browser localStorage
- Create a new account with different email
- Verify JWT_SECRET is set in `.env`

### GraphQL errors
- Check browser console for detailed error messages
- Verify you're logged in (have valid token)
- Test queries in GraphQL playground at `http://localhost:3001/graphql`

## 📜 License

This application is covered by the MIT license.

## 👥 Contributors

- Github: [Brusomaroff](https://github.com/Brusomaroff), [eregaldo92](https://github.com/eregaldo92), [johnfitz3](https://github.com/johnfitz3), and [prestontravis](https://github.com/prestontravis)

---

**Made with ❤️ using the MERN Stack**
   
