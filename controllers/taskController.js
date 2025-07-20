const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskSummary = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const summary = { pending: 0, 'in-progress': 0, completed: 0 };
    let overdueCount = 0;
    const now = new Date();

    tasks.forEach(task => {
      summary[task.status] += 1;
      if (task.dueDate && task.dueDate < now && task.status !== 'completed') {
        overdueCount += 1;
      }
    });

    res.json({ summary, overdueCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
