import Task from "../model/taskModel.js";
import User from "../model/userModel.js";
import sendNotification from "../firebase.js";

export const triggerNotifications = async (req, res) => {
  try {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const allTasks = await Task.find({ notified: false });

    for (const task of allTasks) {
      const [time, mod] = task.taskTime.split(" ");
      let [h, m] = time.split(":").map(Number);

      if (mod === "PM" && h < 12) h += 12;
      if (mod === "AM" && h === 12) h = 0;

      if (h === hours && m === minutes) {
        const user = await User.findById(task.userId);
        if (user && user.firebaseToken) {
          await sendNotification(user.firebaseToken, "Reminder", `Task: ${task.taskName}`);
        }

        task.notified = true;
        await task.save();
      }
    }

    res.json({ message: "Notifications checked and sent." });
  } catch (err) {
    res.status(500).json({ message: "Error triggering notifications", error: err });
  }
};
