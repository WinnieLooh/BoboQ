const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'boboq.db');

let db;
try {
  db = new Database(dbPath);
  console.log('Database connection successful');
  initializeDatabase();
} catch (err) {
  console.error('Error opening database:', err);
}

function initializeDatabase() {
  // Users table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      address TEXT,
      city TEXT,
      postalCode TEXT,
      country TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Orders table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      totalPrice REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      guestEmail TEXT,
      guestFirstName TEXT,
      guestLastName TEXT,
      address TEXT,
      city TEXT,
      postalCode TEXT,
      country TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `).run();
}

module.exports = db;
