let tasks = [
  {
    id: 1,
    title: "Do dishes",
    description: "plate are not clean",
    completed: false,
    createdAt: new Date(),
    priority: "high"
  },
  {
    id: 2,
    title: "make laundary",
    description: "clothes are not clean",
    completed: true,
    createdAt: new Date(),
    priority: "medium"
  }
];
let nextId = 3;

const getAllTasks = async () => tasks;

const createTask = async ({ title, description, priority }) => {
  const newTask = {
    id: nextId++,
    title,
    description: description,
    completed: false,
    createdAt: new Date(),
    priority
  };
  tasks.push(newTask);
  return newTask;
}

const updateTask = async (id, data) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  const { title, description, completed, priority } = data;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;

  return task;
};

const deleteTask = async (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  return tasks.splice(index, 1)[0];
};

const toggleTaskCompletion = async (id) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, toggleTaskCompletion };