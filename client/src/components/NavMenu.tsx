import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from 'react-hot-toast';

export function NavMenu() {
  const { setTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token"); 
    toast.success("You have logged out successfully", { position: "top-right" });
    navigate("/login");  
  };
  
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-shrink-0">
          <Link to={"/"}>MyTimeTable</Link>
          
        </h1>

       

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex flex-grow justify-center items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="text-gray-900 font-bold dark:text-white hover:text-black"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/timetable"
                    className="text-gray-900 font-bold dark:text-white hover:text-black"
                  >
                    Timetable
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                {isAuthenticated ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="text-gray-900 font-bold dark:text-white hover:text-black"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link
                      to="/login"
                      className="text-gray-900 font-bold dark:text-white hover:text-black"
                    >
                      Login
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        

        {/* Dark/Light Mode Toggle (Always visible, positioned to the right) */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-auto"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
         {/* Mobile Menu Toggle */}
         <Button
          variant="outline"
          size="icon"
          onClick={toggleMenu}
          className="lg:hidden ml-5"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white dark:bg-gray-900`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-6 text-center">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="text-gray-900 font-bold dark:text-white hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/timetable"
                    className="text-gray-900 font-bold dark:text-white hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Timetable
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                {isAuthenticated ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="text-gray-900 font-bold dark:text-white hover:text-black"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link
                      to="/login"
                      className="text-gray-900 font-bold dark:text-white hover:text-black"
                    >
                      Login
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          
        </div>
      </div>
    </nav>
  );
}
