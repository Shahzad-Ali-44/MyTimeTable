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
      console.log("Current time:", hours, minutes);
      console.log("Task time:", h, m);
      
      if (h === hours && m === minutes) {
        const user = await User.findById(task.userId);
        if (user && user.firebaseToken) {
          await sendNotification(user.firebaseToken, "Reminder", `Task: ${task.taskName}`);
          res.json({ message: "Notifications checked and sent." });
        }

        task.notified = true;
        await task.save();
      }else{
        res.json({ message: "Notifications not sent.", Current_time: `${hours} , ${minutes} `,Task_time: `${h} , ${m} `,  });
      }
    }


  } catch (err) {
    res.status(500).json({ message: "Error triggering notifications", error: err });
  }
};
