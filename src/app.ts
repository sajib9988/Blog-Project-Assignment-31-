import express, { Request, Response } from 'express'
import { authRouter } from './module/auth/auth.router'
import globalErrorHandler from './middlewares/globalErrorHandler'
import { blogRoutes } from './module/blog/blog.route'
import { adminRoutes } from './module/admin/admin.route'


const app = express()

// Middleware
app.use(express.json())

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRoutes)
app.use('/api/blogs', blogRoutes)

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// Global Error Handler
app.use(globalErrorHandler)

// Handle Undefined Routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  })
})

export default app
