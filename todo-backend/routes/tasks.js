const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
} = require("../controllers/taskController");

// GET    /api/tasks         → fetch all tasks
// POST   /api/tasks         → create a new task
// PUT    /api/tasks/:id     → edit a task
// DELETE /api/tasks/:id     → delete a task
// PATCH  /api/tasks/:id/complete → toggle complete

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", toggleComplete);

module.exports = router;
