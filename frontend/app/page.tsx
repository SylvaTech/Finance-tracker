"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Store the token
      router.push('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token); // Store the token
      router.push('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error || 'Something went wrong');
    }
    setShowForm(false); // Close the form after submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 relative">
      {!showForm && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: showForm ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="glassmorphism p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Finance Tracker</h1>
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
      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-90 z-20"
        >
          <div className="glassmorphism p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-semibold text-white">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-white">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block font-semibold text-white">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  Register
                </button>
              </motion.div>
            </form>
            <button
              onClick={() => setShowForm(false)}
              className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg mt-4 hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}