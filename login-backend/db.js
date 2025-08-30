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

module.exports = {
  sql,
  connectDB,
};
