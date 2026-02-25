const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // must be provided, can't be empty
      trim: true, // removes accidental spaces
    },

    description: {
      type: String,
      trim: true,
      default: "", // optional field, defaults to empty string
    },

    category: {
      type: String,
      enum: ["Maths", "Science", "History", "English", "Art"],
      required: true, // must be one of these values
    },

    priority: {
      type: String,
      enum: ["critical", "high", "medium", "low"],
      default: "medium", // if not provided, defaults to medium
    },

    completed: {
      type: Boolean,
      default: false, // new tasks start as incomplete
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt fields
  },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
