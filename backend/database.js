import { pool, initializeDatabase } from './postgres.js';

// Initialize PostgreSQL tables
initializeDatabase().then(() => {
  console.log('PostgreSQL database initialized');
}).catch((err) => {
  console.error('Error initializing PostgreSQL database:', err);
});

export default pool;
