require('dotenv').config();

const express = require('express');
const {connectDB} = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { connect } = require('http2');
const geminiRoutes = require('./routes/gemini.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const { generateTokens, verifyAccessToken } = require("./tokenUtils"); 
const authMiddleware = require("./middleware/auth");
// import express from "express";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth',authRoutes);
app.use("/api/gemini", authMiddleware, geminiRoutes);

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