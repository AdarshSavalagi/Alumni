'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {useRouter} from 'next/navigation';
import { useAppContext } from '@/context/AlumniContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {setIsLogin}=useAppContext();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/admin/login', { username: email, password: password });
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      setIsLogin(true);
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      
      <AnimatePresence>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg md:w-full w-11/12 max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${loading ? 'bg-gray-400' : 'bg-purple-700 hover:bg-purple-800'} text-white`}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  className="flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Loading...
                </motion.div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
