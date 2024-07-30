const mysql = require('mysql2');
const md5 = require('md5');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'crowdfunding',
});

db.connect(function (err) {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      email VARCHAR(80) NOT NULL UNIQUE,
      role SET('admin', 'user', 'editor') NOT NULL DEFAULT 'user',
      password CHAR(32) NOT NULL,
      session CHAR(32) NULL
    )`;

  db.query(sql, function (err) {
    if (err) throw err;
    console.log('Users table created');
  });
};

const seedUsersTable = () => {
  const sql = `
    INSERT INTO users
    (name, email, role, password)
    VALUES
    ('Briedis', 'briedis@gmail.com', 'admin', '${md5('123')}'),
    ('Bebras', 'bebras@gmail.com', 'user', '${md5('123')}'),
    ('Barsukas', 'barsukas@gmail.com', 'editor', '${md5('123')}')
  `;
  db.query(sql, function (err) {
    if (err) throw err;
    console.log('Users table seeded');
  });
};

const createStoriesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS stories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255),
      target_amount DECIMAL(10, 2) NOT NULL,
      collected_amount DECIMAL(10, 2) DEFAULT 0,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  db.query(sql, function (err) {
    if (err) throw err;
    console.log('Stories table created');
  });
};

const createDonationsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      story_id INT,
      donor_name VARCHAR(100),
      amount DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  db.query(sql, function (err) {
    if (err) throw err;
    console.log('Donations table created');
  });
};

// createUsersTable();
// seedUsersTable();
// createStoriesTable();
// createDonationsTable();

module.exports = db;