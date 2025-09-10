const express = require("express");
const router = express.Router();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import page scanner
const { getAllPages } = require("../utils/pageScanner");

// Init Gemini with key from .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Base URL for your frontend site
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; 

// Central object for known pages
const pageLinks = {
  dashboard: `${BASE_URL}/dashboard`,
  programs: `${BASE_URL}/pages/programs`,
  studio: `${BASE_URL}/pages/storytoise-studio`,
  workshop: `${BASE_URL}/pages/creating-workshop`,
  publishing: `${BASE_URL}/pages/publishing`,
  testimonials: `${BASE_URL}/pages/testimonials`,
  about: `${BASE_URL}/pages/our-details`,
  bookclub: `${BASE_URL}/pages/book-club`,
  contact: `${BASE_URL}/pages/contact`,
};

// Timeout helper
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Trim Gemini response
function trimResponse(text) {
  if (!text) return "Hmm, I couldn’t think of an answer 🤔";
  const sentences = text.split(/(?<=[.?!])\s+/);
  return sentences.slice(0, 2).join(" ");
}

// 📌 Load pages once when server starts
const pages = getAllPages();

// POST /api/gemini/ask
router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 🔹 Storytoise context
    let storytoiseContext = `
You are Storytoise 🐢, the helper for the Storytoise website.

Here are the main pages (use Markdown links so they are clickable):

- [Dashboard](${pageLinks.dashboard})
- [Programs](${pageLinks.programs})
- [Storytoise Studio](${pageLinks.studio})
- [Creating Workshop](${pageLinks.workshop})
- [Publishing](${pageLinks.publishing})
- [Testimonials](${pageLinks.testimonials})
- [About Us](${pageLinks.about})
- [Book Club](${pageLinks.bookclub})
- [Contact](${pageLinks.contact})
`;

    // 🔹 Add dynamically scanned pages
    if (pages && pages.length > 0) {
      storytoiseContext += `

Extra pages found on the site:
${pages.map((p) => `- [${p.name}](${BASE_URL}${p.url})`).join("\n")}
`;
    }

    storytoiseContext += `

Rules:
1. Always answer in 1–2 sentences, friendly and simple.
2. If user asks for a page, reply: "Sure! Visit 👉 [PAGE_NAME](PAGE_URL)".
3. If user asks about content of a page, explain briefly what’s on it.
4. If outside Storytoise, reply: "I'm Storytoise! I only help with Storytoise topics.".

Now answer the user:

User: ${prompt}
`;

    const result = await withTimeout(
      model.generateContent(storytoiseContext),
      5000
    );

    const response = await result.response;
    const text = trimResponse(response.text());

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ reply: "Sorry, Try again!" });
  }
});

module.exports = router;
