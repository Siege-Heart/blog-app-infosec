# Blog Web Application - Activity 4

## Full-stack MERN Application with JWT Authentication

### 🚀 Features
- **User Authentication**: JWT-based registration and login
- **Role-based Access**: User vs Admin permissions  
- **Blog Management**: Create, view blog posts
- **Comment System**: Authenticated users can comment
- **Admin Dashboard**: User management and data overview
- **MongoDB Atlas**: Cloud database integration
- **Protected Routes**: Middleware for secure access

### 🛠️ Tech Stack
- **Frontend**: React 19, React Router 7, Bootstrap 5
- **Backend**: Express 5, Node.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Development**: Concurrently for full-stack dev

### 📁 Project Structure

myblog/                              # ROOT PROJECT DIRECTORY
│
├── backend/                         # EXPRESS BACKEND SERVER
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   │
│   ├── controllers/                 # BUSINESS LOGIC CONTROLLERS
│   │   ├── authController.js        # User registration & login
│   │   ├── blogPostController.js    # Blog post CRUD operations
│   │   ├── commentController.js     # Comment management
│   │   └── userController.js        # User data management
│   │
│   ├── middleware/                  # AUTHENTICATION MIDDLEWARE
│   │   └── authMiddleware.js        # JWT protect() & admin() middleware
│   │
│   ├── models/                      # MONGOOSE DATA MODELS
│   │   ├── userModel.js             # User schema with role field
│   │   ├── blogPostModel.js         # Blog post schema
│   │   └── commentModel.js          # Comment schema with references
│   │
│   ├── routes/                      # API ROUTE DEFINITIONS
│   │   ├── authRoutes.js            # /api/auth endpoints
│   │   ├── blogRoutes.js            # /api/blog endpoints
│   │   ├── commentRoutes.js         # /api/comments endpoints
│   │   └── userRoutes.js            # /api/users endpoints
│   │
│   ├── .env                         # ENVIRONMENT VARIABLES (not committed)
│   └── server.js                    # MAIN EXPRESS SERVER (port 5001)
│
├── src/                             # REACT FRONTEND APPLICATION
│   ├── components/                  # REUSABLE UI COMPONENTS
│   │   ├── AppNavbar.js             # Navigation bar with role-based menu
│   │   ├── Login.js                 # User login form with JWT handling
│   │   ├── Register.js              # User registration form
│   │   ├── HomePage.js              # Blog post listing page
│   │   ├── SinglePostView.js        # Individual post with comments
│   │   ├── CommentSection.js        # Comment input and display
│   │   ├── Dashboard.js             # User dashboard (basic)
│   │   ├── AdminPost.js             # Simple admin post creation
│   │   ├── About.js                 # About page
│   │   ├── Services.js              # Services page
│   │   ├── Contact.js               # Contact page
│   │   ├── Footer.js                # Site footer
│   │   └── LogoutModal.js           # Logout confirmation modal
│   │
│   ├── pages/admin/                 # ADMIN-ONLY PAGES
│   │   ├── AdminDashboard.js        # Admin overview with all data
│   │   ├── AdminPostList.js         # List all posts for management
│   │   ├── CreatePostPage.js        # Advanced post creation form
│   │   └── AdminPostEdit.js         # Post editing interface
│   │
│   ├── App.js                       # MAIN APP WITH ROUTING & AUTH STATE
│   └── index.js                     # REACT ENTRY POINT (with Bootstrap)
│
├── .gitignore                       # GIT IGNORE RULES
├── package.json                     # FULL-STACK DEPENDENCIES & SCRIPTS
├── README.md                        # PROJECT DOCUMENTATION
└── (node_modules)                   # DEPENDENCIES (not committed)

### ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/blog-app-activity4.git
   cd myblog

2. **Install Dependencies**
    ```bash
    npm install

3. **Environment Setup**
    ```bash
    PORT=5001
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_super_secret_key_here

4. **Run the Application**
    ```bash
    # Run both frontend and backend
    npm run dev

    # Or separately:
    # Terminal 1: npm run backend  # Backend on port 5001
    # Terminal 2: npm start        # Frontend on port 3000

5. **Access the Application**
    ```bash
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5001
    - API Test: http://localhost5001/api/test

### Default Usage
1. Register a new account (choose "Admin" role for admin access)

2. Login with your credentials

3. Admins can create posts via Dashboard or Create Post page

4. Users can view posts and add comments

5. Admins can view all users, posts, and comments in Dashboard

## 🔐 API Endpoints
| Method       | Endpoint                  | Description           | Access         |
|--------------|---------------------------|-----------------------|----------------|
| **POST**     | `/api/auth/register`      | User registration     | Public         |
| **POST**     | `/api/auth/login`         | User login            | Public         |
| **GET**      | `/api/blog`               | Get all posts         | Public         |
| **POST**     | `/api/blog`               | Create post           | Admin only     |
| **GET**      | `/api/blog/:id`           | Get single post       | Public         |
| **POST**     | `/api/comments`           | Add comment           | Authenticated  |
| **GET**      | `/api/comments/:postId`   | Get post comments     | Public         |
| **GET**      | `/api/users`              | Get all users         | Admin only     |

### Group Members
- Gonzales, Charles Andrew R.
- Corpuz, Jullienne Viktoria
- Medina, Gelli Mariz
- Peralta, Keith Clarence
- Salvador, Lawrence Nero

### Important Notes
- Never commit .env files to version control
- Use strong JWT secrets in production
- MongoDB Atlas connection string required
- Admin role required for post creation
