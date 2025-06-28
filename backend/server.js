require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fully configured CORS to fix preflight errors
const corsOptions = {
  origin: 'https://inventorymangement.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Allow preflight requests for all routes
app.options('*', cors(corsOptions));

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});

// ✅ API Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Inventory Backend Running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
