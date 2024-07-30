const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new donation
router.post('/', (req, res) => {
  const { story_id, donor_name, amount } = req.body;
  const sql = 'INSERT INTO donations (story_id, donor_name, amount) VALUES (?, ?, ?)';
  db.query(sql, [story_id, donor_name, amount], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateSql = 'UPDATE stories SET collected_amount = collected_amount + ? WHERE id = ?';
      db.query(updateSql, [amount, story_id], (err, updateResult) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send({ id: result.insertId, story_id, donor_name, amount });
        }
      });
    }
  });
});

// Get donations for a story
router.get('/:story_id', (req, res) => {
  const sql = 'SELECT * FROM donations WHERE story_id = ?';
  db.query(sql, [req.params.story_id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;