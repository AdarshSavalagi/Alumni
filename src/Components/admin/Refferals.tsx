'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

interface Referral {
  id: number;
  name: string;
  company: string;
  position: string;
  description: string;
  date: string;
}

const initialReferrals: Referral[] = [
  { id: 1, name: 'John Doe', company: 'TechCorp', position: 'Software Engineer', description: 'Looking for skilled developers in JavaScript and React.', date: '2024-06-01' },
  { id: 2, name: 'Jane Smith', company: 'Innovate Inc.', position: 'Product Manager', description: 'Seeking innovative thinkers with experience in product management.', date: '2024-07-01' },
  { id: 3, name: 'Alice Johnson', company: 'DevSolutions', position: 'Data Scientist', description: 'Open positions for data scientists with experience in machine learning.', date: '2024-08-01' },
  // Add more referrals as needed
];

const ReferralsGrid: React.FC = () => {
  const [referrals, setReferrals] = useState(initialReferrals);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const openModal = (referral: Referral) => {
    setSelectedReferral(referral);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReferral(null);
  };

  const handleDelete = (id: number) => {
    setReferrals(referrals.filter(referral => referral.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedReferral) {
      setSelectedReferral({
        ...selectedReferral,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (selectedReferral) {
      setReferrals(referrals.map(referral => referral.id === selectedReferral.id ? selectedReferral : referral));
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {referrals.map((referral) => (
          <motion.div
            key={referral.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{referral.name}</div>
              <p className="text-gray-500">{referral.company}</p>
              <p className="text-gray-500">{referral.position}</p>
              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  onClick={() => openModal(referral)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(referral.id)}
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
              Edit Referral
            </Dialog.Title>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedReferral?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={selectedReferral?.company || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={selectedReferral?.position || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={selectedReferral?.description || ''}
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
                  value={selectedReferral?.date || ''}
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

export default ReferralsGrid;
