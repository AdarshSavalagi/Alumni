'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (cpassword !== password) {
      toast.error('password should be same');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/v1/alumni/signup', { email: email, password: password });
      if (response.status === 400) {
        toast.error(response.data.message);
        return;
      }
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      router.push('/dashboard');
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message);
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
          <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Create Alumni portal account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Enter email</label>
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
              <label htmlFor="password" className="block text-gray-700">Set Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)}
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
