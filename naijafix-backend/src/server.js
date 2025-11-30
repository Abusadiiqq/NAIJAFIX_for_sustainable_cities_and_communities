const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📊 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
  } catch (error) {
    console.log('❌ MongoDB Atlas connection error:', error.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check your MONGODB_URI in .env file');
    console.log('   2. Verify MongoDB Atlas cluster is running');
    console.log('   3. Check network access IP whitelist in Atlas');
    console.log('   4. Verify database username/password');
    process.exit(1);
  }
};

// Connect to MongoDB Atlas
connectDB();

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB Atlas');
});

// Routes
app.use('/api/reports', require('./routes/reports'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🚀 NaijaFix Backend API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected to MongoDB Atlas' : 'Disconnected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🇳🇬 NaijaFix Community Reporter Backend',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      reports: '/api/reports',
      docs: 'Coming soon...'
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🎉 ==========================================`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Local: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️ Database: MongoDB Atlas`);
  console.log(`🌍 Project: Nigerian Community Issues Reporter`);
  console.log(`🎉 ==========================================\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔻 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});