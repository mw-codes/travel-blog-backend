import http from "http";
import url from "url";
import pool from "./config/db.js";

// Server erstellen
const server = http.createServer(async (req, res) => {
  // CORS Headers setzen
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // URL und HTTP-Methode auslesen
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`📥 ${method} ${path}`); // ← Hilft beim Debugging

  try {
    // ROUTING - Welche Route wurde aufgerufen?
    if (method === "GET" && path === "/posts") {
      // GET /posts - Alle Posts abrufen
      const result = await pool.query("SELECT * FROM posts ORDER BY date DESC");

      res.writeHead(200);
      res.end(
        JSON.stringify({
          success: true,
          data: result.rows,
          count: result.rows.length,
        })
      );
    } else {
      // Fallback - Route nicht gefunden
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Route nicht gefunden" }));
    }
  } catch (error) {
    console.error("❌ Server Fehler:", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Server-Fehler" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/posts`);
});

/* Stell dir vor, der Server ist ein Restaurant:

createServer() = Restaurant eröffnen
(req, res) = Für jeden Gast (req) bereitest du ein Gericht (res) zu
CORS Headers = "Alle Gäste willkommen!"
Content-Type = "Wir servieren JSON-Food" */
