const { Pool } = require('pg');

let pool = null;
let isPostgresConnected = false;

// If PG environment variables or connection string is provided, attempt connection
if (process.env.DATABASE_URL || (process.env.PGHOST && process.env.PGDATABASE)) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      database: process.env.PGDATABASE || 'careerlens_db',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      connectionTimeoutMillis: 2000
    });

    pool.query('SELECT NOW()')
      .then(() => {
        isPostgresConnected = true;
        console.log('✅ PostgreSQL connected successfully to database');
      })
      .catch((err) => {
        console.warn('⚠️  PostgreSQL connection failed, activating robust in-memory fallback store:', err.message);
        isPostgresConnected = false;
      });
  } catch (err) {
    console.warn('⚠️  PostgreSQL initialization skipped, using resilient in-memory fallback store');
  }
} else {
  console.log('ℹ️  No PostgreSQL credentials provided. Running in high-performance Demo In-Memory Mode.');
}

module.exports = {
  pool,
  isPostgresConnected: () => isPostgresConnected
};
