import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks';

const getAllTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return [];
  }
};

const createTask = async ({ title, description, priority }) => {
  try {
    const response = await axios.post(API_URL, { title, description, priority });
    return response.data;
  } catch (err) {
    console.error('Error creating task:', err);
    return null;
  }
};

const updateTask = async (id, { title, description, priority }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { title, description, priority });
    return response.data;
  } catch (err) {
    console.error(`Error updating task ${id}:`, err);
    return null;
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error deleting task ${id}:`, err);
    return null;
  }
};

const toggleTaskCompletion = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/toggle`);
    return response.data;
  } catch (err) {
    console.error(`Error toggling task ${id}:`, err);
    return null;
  }
};

export default { getAllTasks, createTask, updateTask, deleteTask, toggleTaskCompletion };