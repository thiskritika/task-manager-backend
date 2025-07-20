const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskSummary
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // All below routes are protected

router.post('/create', createTask);
router.get('/Task', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/summary', getTaskSummary);

module.exports = router;
