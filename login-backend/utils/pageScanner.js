// utils/pageScanner.js
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function getAllPages() {
  const pagesDir = path.join(__dirname, "../../src/app/pages"); 
  // 👆 adjust this path if your Next.js "pages" folder is elsewhere

  const files = fs.readdirSync(pagesDir);

  return files
    .filter((file) => file.endsWith(".js") || file.endsWith(".tsx"))
    .map((file) => {
      const name = file.replace(/\.(js|tsx)$/, "");
      const url = name === "index" ? "/" : `/${name}`;
      const fullUrl = `${BASE_URL}${url}`;

      return {
        name,
        url,      // relative path like "/programs"
        fullUrl,  // absolute URL like "http://localhost:3000/programs"
        link: `👉 [${name}](${fullUrl})` // clickable Markdown link
      };
    });
}

module.exports = { getAllPages };
