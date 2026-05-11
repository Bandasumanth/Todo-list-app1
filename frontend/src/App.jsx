import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { getTasks, addTask, updateTask, deleteTask, toggleComplete } from './services/api';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    try {
      const res = await addTask(title);
      setTasks([res.data, ...tasks]);
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleComplete(id);
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
      ));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      await updateTask(id, newTitle);
      setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const filteredTasksCount = tasks.filter(t => 
    filter === 'all' || t.status === filter
  ).length;

  return (
    <div className="app">
      <div className="container">
        <h1>✅ My Todo List</h1>
        
        <AddTask onAdd={handleAdd} />

        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="error">{error}</p>}

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <p className="task-count">{filteredTasksCount} task{filteredTasksCount !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}

export default App;