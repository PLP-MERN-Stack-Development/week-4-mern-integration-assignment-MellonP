# MERN Blog Application

   ## Overview
   A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features include CRUD operations for posts and categories, user authentication, image uploads, pagination, and comments.

   ## Features
   - RESTful API for posts and categories
   - User authentication (register/login)
   - Image upload for posts
   - Pagination, search, and filtering
   - Comments on blog posts
   - Responsive UI

   ## Setup Instructions

   ### Prerequisites
   - Node.js (v18+)
   - MongoDB

   ### Installation

   1. **Clone the repository:**
      ```bash
      git clone <your-repo-url>
      cd <your-repo-directory>
      ```

   2. **Install server dependencies:**
      ```bash
      cd server
      npm install
      ```

   3. **Install client dependencies:**
      ```bash
      cd ../client
      npm install
      ```

   4. **Configure environment variables:**
      - Copy `.env.example` to `.env` in both `client` and `server` directories and update values as needed.

   5. **Start the development servers:**
      ```bash
      # In the server directory
      npm run dev

      # In the client directory
      npm run dev
      ```

   ## API Documentation

   ### Posts
   - `GET /api/posts` - Get all posts
   - `GET /api/posts/:id` - Get a single post
   - `POST /api/posts` - Create a post
   - `PUT /api/posts/:id` - Update a post
   - `DELETE /api/posts/:id` - Delete a post

   ### Categories
   - `GET /api/categories` - Get all categories
   - `POST /api/categories` - Create a category

   ### Authentication
   - `POST /api/auth/register` - Register a new user
   - `POST /api/auth/login` - Login


   ## Technologies Used
   - MongoDB, Mongoose
   - Express.js
   - React.js, Vite
   - Node.js
   - JWT for authentication
   - Multer for image uploads

   ## License
   MIT

   ---
