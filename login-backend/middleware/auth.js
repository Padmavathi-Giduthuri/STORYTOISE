// middleware/auth.js
const { verifyAccessToken } = require("../tokenUtils");

const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded; // store decoded user info
  next();
    } catch (err) {
    return res.status(403).json({ error: "Invalid or expired access token" });
  }
}

module.exports = authMiddleware;
