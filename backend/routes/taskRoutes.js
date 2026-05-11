const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete
} = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', toggleComplete);

module.exports = router;