import React from 'react';
import TaskItem from './TaskItem';
import '../styles/task-list.css';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  if (!tasks.length) return <p>No tasks yet...</p>;

  return (
    <div className="list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};

export default TaskList;