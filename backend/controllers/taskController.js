const pool = require('../config/db');

exports.getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title) VALUES (?)',
      [title]
    );
    res.status(201).json({ id: result.insertId, title, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    await pool.query('UPDATE tasks SET title = ? WHERE id = ?', [title, id]);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleComplete = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT status FROM tasks WHERE id = ?', [id]);
    const newStatus = rows[0].status === 'pending' ? 'completed' : 'pending';
    
    await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, id]);
    res.json({ message: 'Status updated', status: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};