                                                               # Blog Project Backend Assignment 3
This is a backend project for a blog management system. It is built using Node.js, Express.js, and MongoDB, with TypeScript for enhanced type safety. The application provides APIs for user authentication, blog management, and administrative functionalities.

Features
User Authentication

User registration and login with JWT-based authentication.
Secure password handling using bcrypt.
Blog Management

Create, update, delete, and fetch blogs.
Blogs are associated with authors and have options for publishing.
Administrative Control

Admin can block users.
Admin has permissions to delete blogs.
Error Handling

Centralized error handling with custom error classes.
Environment Configuration

Configuration is loaded dynamically using dotenv.

src/
├── app.ts                  # Main application setup
├── config/
│   └── index.ts            # Application configuration
├── middlewares/            # Custom middleware
│   ├── auth.ts             # Authentication middleware
│   ├── globalErrorHandler.ts  # Centralized error handling middleware
│   └── validateRequest.ts  # Request validation middleware
├── module/                 # Application modules
│   ├── admin/              # Admin module
│   ├── auth/               # Authentication module
│   ├── blog/               # Blog module
│   └── user/               # User module
├── utils/                  # Utility functions
│   ├── AppError.ts         # Custom error class
│   ├── catchAsync.ts       # Wrapper for async functions
│   └── sendResponse.ts     # Utility for standardized responses
└── server.ts               # Application entry point

