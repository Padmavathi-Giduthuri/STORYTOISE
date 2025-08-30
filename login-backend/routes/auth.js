const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { sql, connectDB } = require('../db');

// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Name, Email, Password, and Confirm Password are required' });
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
    await pool.request()
      .input('Name', sql.VarChar, name)
      .input('Email', sql.VarChar, email)
      .input('PasswordHash', sql.VarChar, hashedPassword)
      .execute('usp_UserAuth');

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("Name", sql.VarChar, name)
      .input("Email", sql.VarChar, email)
      .input("PasswordHash", sql.VarChar, password)
       .query(`
        SELECT * FROM Users
        WHERE Name = @Name AND Email = @Email
      `);

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.recordset[0];
    return res.status(200).json({
      message: "Login successful",
      user: { id: user.Id, name: user.Name, email: user.Email }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
