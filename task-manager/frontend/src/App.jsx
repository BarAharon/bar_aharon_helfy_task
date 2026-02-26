import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import taskService from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const sortTasksByPriority = (tasksArray) => {
    return [...tasksArray].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await taskService.getAllTasks();
      const sorted = sortTasksByPriority(data);
      setTasks(sorted);
      setFilteredTasks(sorted);
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    const updatedTasks = sortTasksByPriority([...tasks, newTask]);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleTaskUpdated = (updatedTask) => {
    const updatedTasks = sortTasksByPriority(
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleTaskDeleted = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleFilter = (search) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    const sortedFiltered = sortTasksByPriority(filtered);
    setFilteredTasks(sortedFiltered);
  };

  return (
    <>
      <TaskFilter onFilter={handleFilter} />
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={filteredTasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </>
  );
}

export default App;