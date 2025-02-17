"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import api from '../utils/api';
import { useRouter } from 'next/navigation'

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
    console.log(formData);
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
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4 relative">
      {!showForm && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: showForm ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center m-auto z-10"
        >
          <h1 className="text-2xl font-bold">Finance Tracker</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 border rounded w-64"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border rounded w-64"
          />
          {/* <div className="w-auto justify-center items-center"> */}
          <button onClick={handleLogin} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
          {/* </div> */}
          
          <p className="mt-2">Don't have an account yet?</p>
          <button onClick={() => setShowForm(true)} className="text-blue-500 underline">Register</button>
        </motion.div>
      )}
      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-90 z-20"
        >
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full border p-2 rounded" 
                />
              </div>
              <div>
                <label className="block font-semibold">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full border p-2 rounded" 
                />
              </div>
              <div>
                <label className="block font-semibold">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full border p-2 rounded" 
                />
              </div>
              {/* <div>
                <label className="block font-semibold">User Type</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select User Type</option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                </select>
              </div> */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Register
                </button>
              </motion.div>
            </form>
            <button onClick={() => setShowForm(false)} className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded">
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
