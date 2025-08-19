import pkg from "pg";
const { Pool } = pkg;

// Datenbank-Verbindung konfigurieren
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

// Verbindung testen
pool.on("connect", () => {
  console.log("✅ Verbunden mit PostgreSQL Datenbank");
});

pool.on("error", (err) => {
  console.error("❌ Datenbank Fehler:", err);
});

export default pool;
