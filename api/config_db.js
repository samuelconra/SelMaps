const { Pool } = require('pg');

const pool = new Pool({
  user: 'geo_admin',
  host: 'localhost',
  database: 'selmaps_db',
  password: 'Password.',
  port: 5432,
});

module.exports = pool;