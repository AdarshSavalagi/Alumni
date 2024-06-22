'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

interface TechTalk {
  id: number;
  name: string;
  topic: string;
  date: string;
}

const initialTechTalks: TechTalk[] = [
  { id: 1, name: 'Alice', topic: 'React Hooks', date: '2024-07-01' },
  { id: 2, name: 'Bob', topic: 'TypeScript Tips', date: '2024-07-15' },
  { id: 3, name: 'Carol', topic: 'Framer Motion', date: '2024-08-01' },
  // Add more tech talks as needed
];

const TechTalksGrid: React.FC = () => {
  const [techTalks, setTechTalks] = useState(initialTechTalks);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState<TechTalk | null>(null);

  const openModal = (talk: TechTalk) => {
    setSelectedTalk(talk);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTalk(null);
  };

  const handleDelete = (id: number) => {
    setTechTalks(techTalks.filter(talk => talk.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedTalk) {
      setSelectedTalk({
        ...selectedTalk,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (selectedTalk) {
      setTechTalks(techTalks.map(talk => talk.id === selectedTalk.id ? selectedTalk : talk));
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {techTalks.map((talk) => (
          <motion.div
            key={talk.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{talk.name}</div>
              <p className="text-gray-500">{talk.topic}</p>
              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  onClick={() => openModal(talk)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(talk.id)}
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
              Edit Tech Talk
            </Dialog.Title>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedTalk?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  value={selectedTalk?.topic || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={selectedTalk?.date || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </form>
            <div className="mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
};

export default TechTalksGrid;
