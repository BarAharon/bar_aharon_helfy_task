import React, { useState } from 'react';
import '../styles/task-list.css';

const TaskItem = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>
      <p className="description">{task.description}</p>
      <p className="created-at">Created At: {new Date(task.createdAt).toLocaleString()}</p>
      <label>
        <input type="checkbox" checked={completed} onChange={toggleCompleted} /> Completed
      </label>
    </div>
  );
};

export default TaskItem;