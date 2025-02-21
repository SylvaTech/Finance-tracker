import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Get stored theme or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Apply class to <html> to enable the styles
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    
    // Save the preference
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      aria-label="Toggle theme" 
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {theme === "dark" ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
    </button>
  );
}
