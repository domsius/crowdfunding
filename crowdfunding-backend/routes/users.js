const express = require('express');
const router = express.Router();
const db = require('../config/db');
const md5 = require('md5');

// Fetch all users
router.get('/', (req, res) => {
  const sql = 'SELECT id, name, email, role FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Fetch user by ID
router.get('/profile', (req, res) => {
  const userId = req.query.userId;
  const sql = 'SELECT name, email, role FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'User deleted successfully' });
    }
  });
});

// Register a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, md5(password)], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, name, email });
    }
  });
});

// User login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, md5(password)], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

module.exports = router;