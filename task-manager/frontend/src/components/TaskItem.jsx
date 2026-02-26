import React, { useState } from 'react';
import taskService from '../services/taskService';
import '../styles/task-item.css';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);

  const toggleCompleted = async () => {
    const updatedTask = await taskService.toggleTaskCompletion(task.id);
    if (updatedTask) {
      setCompleted(updatedTask.completed);
      onTaskUpdated(updatedTask);
    }
  };

  const handleDelete = async () => {
    const deleted = await taskService.deleteTask(task.id);
    if (deleted) {
      onTaskDeleted(task.id);
    }
  };

  const handleSave = async () => {
    try {
      const updatedTask = await taskService.updateTask(task.id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
      });
      if (updatedTask) {
        setIsEditing(false);
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>
            <span className={`priority ${task.priority}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
          <p className="description">{task.description}</p>
          <p className="created-at">
            Created At: {new Date(task.createdAt).toLocaleString()}
          </p>
          <div className="task-actions">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={toggleCompleted}
              />{' '}
              Completed
            </label>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;