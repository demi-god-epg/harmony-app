import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Harmony Lifebond API is running' })
})

// Auth Routes (placeholder)
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Registration endpoint' })
})

app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' })
})

// Member Routes (placeholder)
app.get('/api/members', (req, res) => {
  res.json({ message: 'Get all members' })
})

app.get('/api/members/:id', (req, res) => {
  res.json({ message: 'Get member by ID' })
})

// Payment Routes (placeholder)
app.post('/api/payments/initiate', (req, res) => {
  res.json({ message: 'Initiate payment' })
})

app.post('/api/payments/verify', (req, res) => {
  res.json({ message: 'Verify payment' })
})

// Financial Support Routes (placeholder)
app.post('/api/support/apply', (req, res) => {
  res.json({ message: 'Apply for financial support' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Harmony Lifebond API running on port ${PORT}`)
})
