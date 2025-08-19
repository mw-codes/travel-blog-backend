import pkg from "pg";
const { Pool } = pkg;

// Datenbank-Verbindung konfigurieren
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_RsM4jFqV8nGH@ep-shiny-haze-a2iaejd3-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require/=postgresql://neondb_owner:npg_RsM4jFqV8nGH@ep-shiny-haze-a2iaejd3-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
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
