const Task = require("../models/Task");

// -------------------------------------------------------
// GET /api/tasks
// Fetch all tasks, optionally filter by category
// -------------------------------------------------------
const getAllTasks = async (req, res) => {
  try {
    const filter = {};

    // If ?category=Maths is passed in URL, filter by it
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// -------------------------------------------------------
// POST /api/tasks
// Create a brand new task
// -------------------------------------------------------
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    // Validate — title is required
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      category,
      priority,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// -------------------------------------------------------
// PUT /api/tasks/:id
// Update an existing task's fields
// -------------------------------------------------------
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, priority } = req.body;

    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description, category, priority },
      { new: true, runValidators: true },
      // new: true       → returns the updated document
      // runValidators   → re-checks schema rules on update
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// -------------------------------------------------------
// DELETE /api/tasks/:id
// Remove a task permanently
// -------------------------------------------------------
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

// -------------------------------------------------------
// PATCH /api/tasks/:id/complete
// Flip completed true ↔ false
// -------------------------------------------------------
const toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed; // flip the value
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle task", error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
};
