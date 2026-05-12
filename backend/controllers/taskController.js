const pool = require('../config/db');

exports.getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET TASKS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, status) VALUES (?, ?)',
      [title.trim(), 'pending']
    );

    res.status(201).json({
      id: result.insertId,
      title: title.trim(),
      status: 'pending'
    });
  } catch (err) {
    console.error('CREATE TASK ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE tasks SET title = ? WHERE id = ?',
      [title.trim(), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error('UPDATE TASK ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('DELETE TASK ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.toggleComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT status FROM tasks WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newStatus = rows[0].status === 'pending' ? 'completed' : 'pending';

    await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, id]);

    res.json({ message: 'Status updated', status: newStatus });
  } catch (err) {
    console.error('TOGGLE TASK ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};