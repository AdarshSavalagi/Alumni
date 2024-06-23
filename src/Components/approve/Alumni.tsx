'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { AlumniRegistrationRequest } from '@/types/Alumni';



const initialRequests: AlumniRegistrationRequest[] = [
  { id: 1, batch: '2020', usn: 'A123456', name: 'Alice Smith', linkedId: 'alice.smith', testimonials: 'Great experience at university!', ratings: 5, status: 'Pending', currentCompany: 'TechCorp' },
  { id: 2, batch: '2019', usn: 'B654321', name: 'Bob Johnson', linkedId: 'bob.johnson', testimonials: 'Excellent program, highly recommend!', ratings: 4, status: 'Pending' },
  { id: 3, batch: '2021', usn: 'C789012', name: 'Carol Lee', linkedId: 'carol.lee', testimonials: 'Fantastic support from faculty.', ratings: 5, status: 'Pending', currentCompany: 'SoftWorks' },
  // Add more requests as needed
];

const AlumniRegistrationRequests: React.FC = () => {
  const [requests, setRequests] = useState<AlumniRegistrationRequest[]>(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState<AlumniRegistrationRequest[]>(initialRequests);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AlumniRegistrationRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState<string | null>(null);

  const openModal = (request: AlumniRegistrationRequest) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  const handleDelete = (id: number) => {
    const updatedRequests = requests.filter(request => request.id !== id);
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };

  const handleRead = (id: number) => {
    const updatedRequests: AlumniRegistrationRequest[] = requests.map(request =>
      request.id === id ? { ...request, status: 'Read' } : request
    );
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };
  
  const handleApprove = (id: number) => {
    const updatedRequests: AlumniRegistrationRequest[] = requests.map(request =>
      request.id === id ? { ...request, status: 'Approved' } : request
    );
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };
  
 
  
  const handleEdit = (editedRequest: AlumniRegistrationRequest) => {
    const updatedRequests: AlumniRegistrationRequest[] = requests.map(request =>
      request.id === editedRequest.id ? editedRequest : request
    );
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
    closeModal(); // Close modal after editing
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = requests.filter(request =>
      request.name.toLowerCase().includes(query.toLowerCase()) ||
      request.usn.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleBatchFilter = (batch: string | null) => {
    setBatchFilter(batch);
    if (batch) {
      const filtered = requests.filter(request => request.batch === batch);
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setBatchFilter(null);
    setFilteredRequests(requests);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by name or USN"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={batchFilter || ''}
            onChange={(e) => handleBatchFilter(e.target.value === '' ? null : e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Batch</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            {/* Add more batches as needed */}
          </select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {filteredRequests.map((request) => (
          <motion.div
            key={request.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative border-l-4 ${request.status === 'Read' ? 'border-yellow-500' : request.status === 'Approved' ? 'border-green-500' : 'border-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(request)}
          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{request.name}</div>
              <p className="text-gray-500">{`Batch: ${request.batch}`}</p>
              <p className="text-gray-500">{`USN: ${request.usn}`}</p>
              <p className="text-gray-500">{`LinkedIn: ${request.linkedId}`}</p>
              <p className="text-gray-500">{`Testimonials: ${request.testimonials}`}</p>
              <p className="text-gray-500">{`Ratings: ${request.ratings}`}</p>
              {request.currentCompany && (
                <p className="text-gray-500">{`Current Company: ${request.currentCompany}`}</p>
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
              Alumni Registration Request Details
            </Dialog.Title>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedRequest?.name}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch
                </label>
                <input
                  type="text"
                  value={selectedRequest?.batch}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, batch: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  USN
                </label>
                <input
                  type="text"
                  value={selectedRequest?.usn}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, usn: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn ID
                </label>
                <input
                  type="text"
                  value={selectedRequest?.linkedId}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, linkedId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Testimonials
                </label>
                <textarea
                  value={selectedRequest?.testimonials}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, testimonials: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ratings
                </label>
                <input
                  type="number"
                  value={selectedRequest?.ratings}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, ratings: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Company
                </label>
                <input
                  type="text"
                  value={selectedRequest?.currentCompany || ''}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, currentCompany: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => handleEdit(selectedRequest!)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
};

export default AlumniRegistrationRequests;
