import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Home() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <div className="text-gray-900 dark:text-white mb-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
      
        <div className="w-full md:w-1/2 md:text-center md:text-left">
          <h1 className="text-xl pt-8 md:text-2xl font-semibold mb-4">
            Welcome to MyTimetable
          </h1>
          <p className="text-base mb-5 ">
            MyTimetable is a user-friendly app designed to help you manage your daily schedule effortlessly.
            With MyTimetable, you can easily create, edit, and organize your personal timetable, ensuring you never miss an important task or event.
            Whether you're a student, professional, or someone looking to stay organized, MyTimetable is here to streamline your day!
          </p>
          {isAuthenticated ? (
             <Button asChild>
             <Link to="/timetable">Get Started</Link>
           </Button>
          ) : (
            <Button asChild>
            <Link to="/login">Login Here</Link>
          </Button>
          )}
          <p className="text-base mt-3"></p>
            Features include the ability to:
            <ul className="list-disc pl-5 mt-2">
              <li>Create and manage timetable.</li>
              <li>Edit, delete, and view your daily schedule with ease.</li>
              <li>Customize your timetable based on your preferences.</li>
            </ul>    
        </div>
      
        <div className="w-xs md:w-md flex justify-center">
          <img
            src="/home.png"
            alt="MyTimetable App"
            className="w-full h-auto object-contain md:object-cover rounded-lg"
          />
        </div>
      </div>
      
    </div>
  );
}
