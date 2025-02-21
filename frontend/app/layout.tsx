"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Theme Toggle Button */}
        <header className="p-4 flex justify-end">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </header>

        {/* Main App Content */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
