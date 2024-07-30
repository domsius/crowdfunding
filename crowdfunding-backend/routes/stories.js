const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new story
router.post('/', (req, res) => {
  const { title, description, image, target_amount, author_id } = req.body;

  
  const sql = 'INSERT INTO stories (title, description, image, target_amount, author_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, image, target_amount, author_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, title, description, image, target_amount, author_id });
    }
  });
});

// Get all stories
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM stories ORDER BY collected_amount < target_amount DESC, created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Delete a story
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM stories WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Story deleted successfully' });
    }
  });
});

// Get stories by author ID
router.get('/author/:authorId', (req, res) => {
  const { authorId } = req.params;
  const sql = 'SELECT * FROM stories WHERE author_id = ? ORDER BY collected_amount < target_amount DESC, created_at DESC';
  db.query(sql, [authorId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;