require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix: Fully configured CORS for Vercel origin
const corsOptions = {
  origin: 'https://inventorymangement.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Preflight support
app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

// ✅ Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Inventory Backend Running');
});

// ✅ Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
