"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {!showForm && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: showForm ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="glassmorphism p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        >
          <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Login
          </button>
          <p className="mt-4 text-gray-400">Don't have an account yet?</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </motion.div>
      )}
    </div>
  );
}
