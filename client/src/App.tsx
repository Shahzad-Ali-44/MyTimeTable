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

function App() {
  useAuth();
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
