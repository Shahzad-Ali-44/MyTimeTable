import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { messaging } from '../firebase';
import { getToken } from "firebase/messaging";
import { Slide, toast } from "react-toastify"
export default function Timetable() {

  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { register, handleSubmit, reset, setFocus } = useForm<FormData>();
  const formRef = useRef<HTMLDivElement>(null);
  const apiUrl = import.meta.env.VITE_MyTimeTable_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loadingTask, setLoadingTask] = useState(false);


  interface Task {
    _id: string;
    taskName: string;
    taskTime: string;
    taskDescription: string;
    notifiedToday: boolean;
  }

  interface FormData {
    taskName: string;
    taskTime: string;
    taskDescription: string;
  }

    // Helper to get current theme for toasts:-
    const getToastTheme = () => {
      const theme = localStorage.getItem("vite-ui-theme") || "system"
      if (theme === "dark") return "dark"
      if (theme === "light") return "light"
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    

  // Request permission to send notifications:
  const requestNotificationPermission = async () => {

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        toast.success("Notifications enabled 🎉", {
          theme: getToastTheme(),
        })
      } else if (permission === "denied") {
        toast.error("Notifications denied ❌", {
          theme: getToastTheme(),
        })
      }
    })

    try {
      await Notification.requestPermission();
      if (Notification.permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID,
        });
        if (token) {
          localStorage.setItem("fcmToken", token);
          const userToken = localStorage.getItem("token");
          const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID(); 
          localStorage.setItem("deviceId", deviceId);
          
          if (userToken) {
            await axios.post(
              `${apiUrl}/api/users/notificatons/notification-token`,
              { token, deviceId },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
          }
        }
      } else {
        console.error("Notification permission denied.");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };


  useEffect(() => {

    const existingToken = localStorage.getItem("fcmToken");

    if (
      (Notification.permission === "default" || Notification.permission === "denied") &&
      !existingToken
    ) {      toast(
        ({ closeToast }) => (
          <div>
            <p className="text-sm mb-2">Enable notifications for reminders 🔔</p>
            <Button
            size='sm'
              onClick={() => {
                requestNotificationPermission()
                closeToast()
              }}
            >
              Enable Now
            </Button>
          </div>
        ),
        {
          autoClose: false,
          closeOnClick: false,
          closeButton: true,
          theme: getToastTheme(),
          transition: Slide,
        }
      )
    }

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated && !toastShown) {
      toast.error("Please login to view your timetable.", {
        theme: getToastTheme()
      });
      setToastShown(true);
      navigate("/login");
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        fetchTasks();
      }
    }
  }, [navigate, toastShown]);


  // Method made for fetching all task from db:
  const fetchTasks = () => {
    setLoadingTask(true);
    axios.get(`${apiUrl}/api/timetable`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingTask(false);
      });
  };




  // Task Add and Update Method:
  const onSubmit = (data: FormData) => {
    setLoading(true);
    const [hours, minutes] = data.taskTime.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    const taskData = { ...data, taskTime: formattedTime };

    if (editingTask) {
      // Update task
      axios.put(`${apiUrl}/api/timetable/${editingTask._id}`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          const updatedTasks = tasks.map(task =>
            task._id === editingTask._id ? response.data.task : task
          );
          setTasks(updatedTasks);
          toast.success("Task updated successfully!", { theme: getToastTheme() });
          setEditingTask(null);
          reset({
            taskName: "",
            taskTime: "",
            taskDescription: "",
          });

        })
        .catch((err) => {
          toast.error(err.message || "Failed to update task.", { theme: getToastTheme() });
        }).finally(() => {
          setLoading(false);
        });
    }
    else {
      // Add new task
      axios.post(`${apiUrl}/api/timetable`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          setTasks([...tasks, response.data.task]);
          toast.success("Task added successfully!", { theme: getToastTheme() });
          reset();
        })
        .catch((err) => {
          toast.error(err.message || "Failed to add task.", { theme: getToastTheme() });
        }).finally(() => {
          setLoading(false);
        });
    }
  };

  // Task delete method
  const handleDelete = (taskId: string) => {
    setDeleting(taskId);
    axios.delete(`${apiUrl}/api/timetable/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success("Task deleted successfully!", { theme: getToastTheme() });
        if (editingTask && editingTask._id === taskId) {
          reset({
            taskName: "",
            taskTime: "",
            taskDescription: "",
          });
          setEditingTask(null);
        }
      })
      .catch(() => {
        toast.error("Failed to delete task.", { theme: getToastTheme() });
      }).finally(() => {
        setDeleting(null);
      });
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    reset({
      taskName: task.taskName,
      taskTime: convertTo24Hour(task.taskTime),
      taskDescription: task.taskDescription,
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      setFocus("taskName");
    }, 100);
  };


  return (
    <div className="mb-10 p-4 flex flex-col lg:flex-row gap-6">
      <div className="w-full space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task._id} className="flex justify-between ">
              <CardContent className="flex-grow space-y-2">
                <h3 className="text-xl font-semibold">Title: {task.taskName}</h3>
                <p className="text-sm dark:text-gray-400">Time: {task.taskTime}</p>
                <p className="">{task.taskDescription}</p>
                <div className=" space-x-4 mt-5">
                  <Button variant="outline" onClick={() => handleEdit(task)}>Edit</Button>
                  <Button variant="destructive"
                    onClick={() => handleDelete(task._id)}
                    disabled={deleting === task._id}
                  >{deleting === task._id ? 'Deleting...' : "Delete"}
                  </Button>
                </div>
              </CardContent>

            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            {loadingTask ? (
              <>
                <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" /> Loading your tasks... 📅
                  </span>
                </p>
                <p className="text-md text-gray-400 dark:text-gray-500">
                  Please wait while tasks are loaded.
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                  No tasks found! 📅
                </p>
                <p className="text-md text-gray-400 dark:text-gray-500">
                  Start by adding a new task to manage your schedule.
                </p>
              </>
            )}
          </div>
        )}
      </div>


      <div className="w-full" ref={formRef}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{editingTask ? 'Edit Task' : 'Add New Task'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="mb-2" htmlFor="taskName">Task Name</Label>
                <Input id="taskName" placeholder="Enter Task Name" {...register("taskName", { required: true })} />
              </div>
              <div>
                <Label className="mb-2" htmlFor="taskTime">Task Time <span className="text-xs">(Set time to get notified)</span></Label>
                <Input id="taskTime" type="time" {...register("taskTime", { required: true })} />
              </div>
              <div>
                <Label className="mb-2" htmlFor="taskDescription">Task Description</Label>
                <Input id="taskDescription" placeholder="Enter Task Description" {...register("taskDescription", { required: true })} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" /> Processing...
                </span>
              ) : editingTask ? "Update Task" : "Add Task"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
