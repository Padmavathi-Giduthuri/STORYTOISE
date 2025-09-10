const express = require('express');
const bcrypt = require('bcryptjs');
const { sql, connectDB } = require('../db');
const { generateTokens, verifyRefreshToken } = require("../tokenUtils");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  const { name, type, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !type || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Name, Type, Email, Password, and Confirm Password are required' });
  }

  // Confirm password check
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Password and Confirm Password do not match' });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!strongRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Password must include uppercase, lowercase, number, and special character' 
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await connectDB();

    // Call usp_UserAuth to insert/update user (ConfirmPassword removed)
    const result = await pool.request()
      .input('Name', sql.VarChar, name)
      .input('Type', sql.VarChar, type)
      .input('Email', sql.VarChar, email)
      .input('PasswordHash', sql.VarChar, hashedPassword)
      .execute('usp_UserAuth');

    const status = result.recordset[0].ReturnStatus;

     console.log(status)
    if (status === 1) {
      return res.status(200).json({ message: 'User registered successfully.' });
    } else if (status === -1) {
      return res.status(400).json({ error: 'Only Gmail and Yahoo email addresses are allowed.' });
    } else if (status === -2) {
      return res.status(200).json({ error: 'A user with this email already exists.' });
    } else {
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("Email", sql.VarChar, email)
      .input("PasswordHash", sql.VarChar, password)
      .query("SELECT * FROM Users WHERE Email=@Email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

   const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token in DB
   await pool.request()
      .input("Email", sql.VarChar, email)
      .input("RefreshToken", sql.VarChar, refreshToken)
      .execute("usp_SaveRefreshToken");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.Id, name: user.Name, email: user.Email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= REFRESH TOKEN =================
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
   console.log("Login Request Body:", req.body);
  console.log("Refresh Request Body:", req.body);
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);   //decode
    if (!decoded) {
      return res.status(403).json({ error: "Refresh token expired → login again" });
    }
    console.log("decoded:",decoded);

   const pool = await connectDB();
    const result = await pool.request()
      .input("Email", sql.VarChar, decoded.email)
      .input("RefreshToken", sql.VarChar, refreshToken)
      .query("SELECT * FROM usertokens WHERE Email=@Email AND RefreshToken=@RefreshToken");

    if (result.recordset.length === 0) {
      return res.status(403).json({ error: "Refresh token not found in DB" });
    }

    const { accessToken } = generateTokens(result.recordset[0]);

    return res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= LOGOUT =================
router.post("/logout", async (req, res) => {
  const { email } = req.body;
  const pool = await connectDB();
  await pool.request()
    .input("Email", sql.VarChar, email)
    .query("DELETE FROM usertokens WHERE Email=@Email");

    console.log(`User logged out: ${email}`);

  res.json({ success: true, message: "Logged out" });
});

module.exports = router;
