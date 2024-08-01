const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Create
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User added!', userId: result.insertId });
  });
});

// Read
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, email, phone, id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User updated!' });
  });
});

// Delete
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User deleted!' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
