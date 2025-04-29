import Task from "../model/taskModel.js";
import User from "../model/userModel.js";
import sendNotification from "../firebase.js";
import moment from "moment-timezone";

export const triggerNotifications = async (req, res) => {
  try {
    const allTasks = await Task.find({ notified: false });
    for (const task of allTasks) {
      const user = await User.findById(task.userId);
      if (!user) continue;

      const userTimezone = user.timezone || "Asia/Karachi";
      const nowInUserTimezone = moment().tz(userTimezone);
      const hours = nowInUserTimezone.hours();
      const minutes = nowInUserTimezone.minutes();
      const [time, mod] = task.taskTime.split(" ");
      let [h, m] = time.split(":").map(Number);

      if (mod === "PM" && h < 12) h += 12;
      if (mod === "AM" && h === 12) h = 0;

      if (h === hours && m === minutes) {
        if (user.firebaseToken) {
          await sendNotification(
            user.firebaseToken,
            "Reminder",
            `Task: ${task.taskName}`
          );
          task.notified = true;
          await task.save();
        }
      }
    }
    res.json({
      message: 'Notifications API.'});
  } catch (err) {
    console.error("Error in triggerNotifications:", err);
    res
      .status(500)
      .json({ message: "Error triggering notifications", error: err.message });
  }
};
