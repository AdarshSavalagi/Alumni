'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { TechTalkRequest } from '@/types/TechTalk';



const initialRequests: TechTalkRequest[] = [
  { id: 1, name: 'Alice', topic: 'React Hooks', date: '2024-07-01', studentBatch: '2021', status: 'Pending', optionalMessage: 'Excited to share!' },
  { id: 2, name: 'Bob', topic: 'TypeScript Tips', date: '2024-07-15', studentBatch: '2020', status: 'Pending' },
  { id: 3, name: 'Carol', topic: 'Framer Motion', date: '2024-08-01', studentBatch: '2019', status: 'Pending', optionalMessage: 'Looking forward to this session.' },
  // Add more requests as needed
];

const TechTalkRequests: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TechTalkRequest | null>(null);

  const openModal = (request: TechTalkRequest) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  const handleDelete = (id: number) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleRead = (id: number) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Read' } : request));
  };

  const handleApprove = (id: number) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Approved' } : request));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {requests.map((request) => (
          <motion.div
            key={request.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative border-l-4 ${request.status === 'Read' ? 'border-yellow-500' : request.status === 'Approved' ? 'border-green-500' : 'border-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{request.name}</div>
              <p className="text-gray-500">{request.topic}</p>
              <p className="text-gray-500">{request.date}</p>
              <p className="text-gray-500">{`Batch: ${request.studentBatch}`}</p>
              {request.optionalMessage && (
                <p className="text-gray-500 mt-2 italic">{`Message: ${request.optionalMessage}`}</p>
              )}
              <p className={`mt-2 text-sm font-bold ${request.status === 'Read' ? 'text-yellow-500' : request.status === 'Approved' ? 'text-green-500' : 'text-gray-500'}`}>
                {request.status}
              </p>
              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  onClick={() => handleRead(request.id)}
                >
                  Mark as Read
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
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

      <Dialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" />

          <motion.div
            className="bg-white rounded-lg max-w-md mx-auto p-6 z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Tech Talk Request Details
            </Dialog.Title>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest?.topic}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest?.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest?.studentBatch}</p>
              </div>
              {selectedRequest?.optionalMessage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRequest?.optionalMessage}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className={`mt-1 text-sm font-bold ${selectedRequest?.status === 'Read' ? 'text-yellow-500' : selectedRequest?.status === 'Approved' ? 'text-green-500' : 'text-gray-500'}`}>
                  {selectedRequest?.status}
                </p>
              </div>
            </div>
            <div className="mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
};

export default TechTalkRequests;
