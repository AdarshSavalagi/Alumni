'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { TechTalk } from '@/types/TechTalk';
import toast from 'react-hot-toast';
import axios from 'axios';

const TechTalkRequests: React.FC = () => {
  const [requests, setRequests] = useState<TechTalk[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TechTalk | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/admin/approve/tech-talk');
        setRequests(res.data||[]);
      } catch (error: any) {
        toast.error(error.message);
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
 

 

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/v1/tech-talk/?id=${id}`);
      if (response.status !== 200) {
        toast.error(response.data.message);
      }
      toast.success(response.data.message);
      setRequests(requests.filter(request => request.id !== id));
    } catch (error: any) {
      toast.error(error.message);
      console.log(error)
    }
  };




  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          className="border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {requests.map((request, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative border-l-4 border-gray-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{request.name}</div>
              <div className="  text-black">{request.email}</div>
              <p className="text-gray-500">{request.topic}</p>
              <p className="text-gray-500">{request.date}</p>

              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(request.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
};

export default TechTalkRequests;
