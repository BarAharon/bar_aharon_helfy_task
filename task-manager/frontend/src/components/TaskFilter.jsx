import React, { useState } from 'react';
import '../styles/task-filter.css';

const TaskFilter = ({ onFilter }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter(value);
  };

  return (
    <div className="task-filter">
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default TaskFilter;