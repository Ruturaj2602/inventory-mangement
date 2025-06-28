const express = require('express');
const cors = require('cors');

const app = express();

// Allow CORS from Vercel frontend
app.use(cors({
  origin: 'https://inventorymangement.vercel.app'
}));

app.use(express.json());

// Your routes
app.use('/api/products', require('./routes/products'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
