import React, { useState } from 'react';
import taskService from '../services/taskService';
import '../styles/task-form.css';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;
    const newTask = await taskService.createTask({ title, description, priority });

    if (newTask) {
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setPriority('low');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;