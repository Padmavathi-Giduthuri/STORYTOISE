const sql = require('mssql');
require('dotenv').config();

//reads from .env file
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// sql.connect(config)
//   .then(() => console.log('Connected to SQL Server'))
//   .catch(err => console.error('DB connection failed:', err));

let pool;

async function connectDB() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log('✅ Connected to SQL Server');
    } catch (err) {
      console.error('❌ DB connection failed:', err);
      throw err;
    }
  }
  return pool;
}

// -------------------------------
// 1. Get User By Email
// -------------------------------
async function getUserByEmail(email) {
  const pool = await connectDB();
  const result = await pool
    .request()
    .input("email", sql.NVarChar, email)
    .query("SELECT * FROM Users WHERE Email = @email"); // Adjust table/column names

  return result.recordset[0] || null;
}

// -------------------------------
// 2. Save Refresh Token
// -------------------------------
async function saveRefreshToken(email, refreshToken) {
  const pool = await connectDB();
  await pool
    .request()
    .input("email", sql.NVarChar, email)
    .input("refreshToken", sql.NVarChar, refreshToken)
    .query(`
      INSERT INTO UserTokens (Email, RefreshToken, CreatedAt)
      VALUES (@email, @refreshToken, GETDATE())
    `);
}

// -------------------------------
// 3. Find Refresh Token
// -------------------------------
async function findRefreshToken(refreshToken) {
  const pool = await connectDB();
  const result = await pool
    .request()
    .input("refreshToken", sql.NVarChar, refreshToken)
    .query("SELECT * FROM UserTokens WHERE RefreshToken = @refreshToken");

  return result.recordset[0] || null;
}

// -------------------------------
// 4. Update Refresh Token
// -------------------------------
async function updateRefreshToken(email, newRefreshToken) {
  const pool = await connectDB();
  await pool
    .request()
    .input("email", sql.NVarChar, email)
    .input("newToken", sql.NVarChar, newRefreshToken)
    .query(`
      UPDATE UserTokens 
      SET RefreshToken = @newToken, CreatedAt = GETDATE()
      WHERE Email = @email
    `);
}

// -------------------------------
// 5. Delete Refresh Token
// -------------------------------
async function deleteRefreshToken(email) {
  const pool = await connectDB();
  await pool
    .request()
    .input("email", sql.NVarChar, email)
    .query("DELETE FROM UserTokens WHERE Email = @email");
}

module.exports = {
  sql,
  connectDB,
  getUserByEmail,
  saveRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  deleteRefreshToken,
};
