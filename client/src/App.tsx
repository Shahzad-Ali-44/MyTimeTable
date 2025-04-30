import { ThemeProvider } from "@/components/theme-provider";
import { NavMenu } from "./components/NavMenu";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import Login from "./pages/Login";
import SignupForm from "./pages/Signup";
import Footer from "./components/Footer";
import useAuth from './hooks/useAuth';
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import { toast } from 'react-toastify';
function App() {
  useAuth();
  const apiUrl = import.meta.env.VITE_MyTimeTable_FRONTEND_URL;
  
  // Helper to get current theme for toasts:-
  const getToastTheme = () => {
    const theme = localStorage.getItem("vite-ui-theme") || "system"
    if (theme === "dark") return "dark"
    if (theme === "light") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      toast.success(
        <>
          Reminder<br />{payload.data?.body}
        </>,
        {
          autoClose: 5000,
          theme: getToastTheme()
        }
      );

      if (Notification.permission === 'granted' && 'Notification' in window) {
        const notification = new Notification(payload.data?.title || '', {
          body: payload.data?.body,
          icon: 'favicon.ico',
        });

        notification.onclick = (event) => {
          event.preventDefault();
          window.location.href = `${apiUrl}/timetable`;
          notification.close();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <NavMenu />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
