import React from 'react';
import TaskItem from './TaskItem';
import '../styles/task-list.css';

const TaskList = ({ tasks }) => {
  if (!tasks.length) return <p>No tasks yet...</p>;

  return (
    <div className="list-container">
      {tasks.map((task, idx) => (
        <TaskItem key={idx} task={task} />
      ))}
    </div>
  );
};

export default TaskList;