import { useState } from 'react';
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing && newTitle.trim() !== task.title) {
      onEdit(task.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span onClick={() => onToggle(task.id)} className="task-title">
          {task.title}
        </span>
      )}

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)} className="complete-btn">
          {task.status === 'completed' ? 'Undo' : 'Done'}
        </button>
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;