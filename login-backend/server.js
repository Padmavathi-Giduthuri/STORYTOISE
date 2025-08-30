const express = require('express');
const {connectDB} = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { connect } = require('http2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

require ('dotenv').config();
const PORT = process.env.PORT || 5000;

// Browser confirmation route
app.get('/api/health', (req, res) => {
  res.send('Backend is running!');
});

//Terminal confirmation route
app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});