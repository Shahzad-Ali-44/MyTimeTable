import Task from '../model/taskModel.js';

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
      res.json({ task });
    } catch (err) {
      res.status(500).json({ message: 'Error updating task', error: err });
    }
  };
  
 
