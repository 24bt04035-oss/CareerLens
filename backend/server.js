const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const { store } = require('./data/store');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const skillsRoutes = require('./routes/skills');
const careersRoutes = require('./routes/careers');
const analysisRoutes = require('./routes/analysis');
const recommendationsRoutes = require('./routes/recommendations');
const projectsRoutes = require('./routes/projects');
const certificationsRoutes = require('./routes/certifications');
const internshipsRoutes = require('./routes/internships');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'CareerLens API',
    version: '1.0.0',
    postgresConnected: db.isPostgresConnected(),
    timestamp: new Date().toISOString()
  });
});

// Demo Data Reset Endpoint (Ideal for Hackathon Judges)
app.post('/api/reset-demo', (req, res) => {
  store.resetToDemo();
  res.json({
    success: true,
    message: 'Reset demo state to Arya Tia baseline successfully!'
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/internships', internshipsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CareerLens Backend Server listening on http://localhost:${PORT}`);
  console.log(`📊 Mode: ${db.isPostgresConnected() ? 'PostgreSQL Database' : 'Fast In-Memory / Resilience Engine'}`);
});
