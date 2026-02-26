const taskService = require('../services/tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !priority) {
            return res.status(400).json({ error: 'Title and priority are required' });
        }

        const task = await taskService.createTask({ title, description, priority });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTask = await taskService.updateTask(id, req.body);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task', details: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedTask = await taskService.deleteTask(id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task', details: err.message });
    }
};

const toggleTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const toggledTask = await taskService.toggleTaskCompletion(id);

        if (!toggledTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(toggledTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle task', details: err.message });
    }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, toggleTask };