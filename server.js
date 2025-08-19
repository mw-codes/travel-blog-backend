import http from "http";
import pool from "./config/db.js";

// Server erstellen
const server = http.createServer(async (req, res) => {
  // CORS Headers setzen (damit Frontend zugreifen kann)
  /* "Erlaube allen Webseiten, auf diesen Server zuzugreifen" Warum wichtig: Ohne das blockiert der Browser Anfragen vom Frontend! */
  res.setHeader("Access-Control-Allow-Origin", "*");
  /*"Ich sende JSON-Daten zurück" Warum wichtig: Browser weiß, wie er die Antwort behandeln soll */
  res.setHeader("Content-Type", "application/json");

  try {
    // Datenbank testen
    const result = await pool.query("SELECT NOW()");

    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Server und Datenbank laufen!",
        database_time: result.rows[0].now,
      })
    );
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Datenbank-Fehler" }));
  }
});

// Server auf Port 3000 starten
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

/* Stell dir vor, der Server ist ein Restaurant:

createServer() = Restaurant eröffnen
(req, res) = Für jeden Gast (req) bereitest du ein Gericht (res) zu
CORS Headers = "Alle Gäste willkommen!"
Content-Type = "Wir servieren JSON-Food" */
