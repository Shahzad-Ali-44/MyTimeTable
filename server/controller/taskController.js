import Task from "../model/taskModel.js";
import User from "../model/userModel.js"; 
import sendNotification from "../firebase.js"; 


const notificationTimeouts = new Map();

export const fetchTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
};

export const addTask = async (req, res) => {
  try {
    const { taskName, taskTime, taskDescription } = req.body;
    const userId = req.userId;

    const newTask = new Task({
      taskName,
      taskTime,
      taskDescription,
      userId,
    });

    await newTask.save();

    // Setup notification
    scheduleNotification(newTask, userId);

    res.status(201).json({ task: newTask });
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;

    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.deleteOne({ _id: taskId });

    // Clear scheduled notification
    const timeoutId = notificationTimeouts.get(taskId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      notificationTimeouts.delete(taskId);
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });
  }
};

export const editTask = async (req, res) => {
  try {
    const { taskName, taskTime, taskDescription } = req.body;
    const taskId = req.params.id;
    const userId = req.userId;

    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.taskName = taskName || task.taskName;
    task.taskTime = taskTime || task.taskTime;
    task.taskDescription = taskDescription || task.taskDescription;

    await task.save();

    // Re-schedule notification after editing
    const oldTimeoutId = notificationTimeouts.get(taskId);
    if (oldTimeoutId) {
      clearTimeout(oldTimeoutId);
      notificationTimeouts.delete(taskId);
    }
    scheduleNotification(task, userId);

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
};

// ========== Helper function to schedule notification ==========

const scheduleNotification = async (task, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.firebaseToken) return;

    const [time, mod] = task.taskTime.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (mod === "PM" && h < 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;

    const now = new Date();
    const fireAt = new Date();
    fireAt.setHours(h, m, 0, 0);

    const delay = fireAt.getTime() - now.getTime();

    if (delay <= 0) return; 

    const timeoutId = setTimeout(() => {
      sendNotification(
        user.firebaseToken,
        "Reminder",
        `Task: ${task.taskName}`,
      );
    }, delay);

    notificationTimeouts.set(task._id.toString(), timeoutId);
  } catch (err) {
    console.error("Error scheduling notification:", err);
  }
};
