import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function Timetable() {
  interface Task {
    _id: string;
    taskName: string;
    taskTime: string;
    taskDescription: string;
  }

  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { register, handleSubmit, reset, setFocus } = useForm();
  const formRef = useRef<HTMLDivElement>(null);
  const apiUrl = import.meta.env.VITE_MyTimeTable_BACKEND_URL;
  




  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated && !toastShown) {
      toast.error("You need to log in first to access the timetable.", {
        position: "top-right",
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

  const fetchTasks = () => {
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
      });
  };

  const onSubmit = (data: any) => {
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
          toast.success("Task updated successfully!", { position: "top-right" });
          setEditingTask(null);
          reset({
            taskName: "",
            taskTime: "",
            taskDescription: "",
          });

        })
        .catch((err) => {
          toast.error(err.message || "Failed to update task.", { position: "top-right" });
        });
    } else {
      // Add new task
      axios.post(`${apiUrl}/api/timetable`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          setTasks([...tasks, response.data.task]);
          toast.success("Task added successfully!", { position: "top-right" });
          reset();
        })
        .catch((err) => {
          toast.error(err.message || "Failed to add task.", { position: "top-right" });
        });
    }
  };

  const handleDelete = (taskId: string) => {
    axios.delete(`${apiUrl}/api/timetable/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success("Task deleted successfully!", { position: "top-right" });
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
        toast.error("Failed to delete task.", { position: "top-right" });
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
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-6">

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
                  <Button variant="destructive" onClick={() => handleDelete(task._id)}>Delete</Button>
                </div>
              </CardContent>

            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              No tasks found! 📅
            </p>
            <p className="text-md text-gray-400 dark:text-gray-500">
              Start by adding a new task to manage your schedule.
            </p>
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
                <Label className="mb-2" htmlFor="taskTime">Task Time</Label>
                <Input id="taskTime" type="time" {...register("taskTime", { required: true })} />
              </div>
              <div>
                <Label className="mb-2" htmlFor="taskDescription">Task Description</Label>
                <Input id="taskDescription" placeholder="Enter Task Description" {...register("taskDescription", { required: true })} />
              </div>
              <Button type="submit" className="w-full">{editingTask ? 'Update Task' : 'Add Task'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}
