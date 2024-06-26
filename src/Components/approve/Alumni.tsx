'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { AlumniDashboard, AlumniRegistrationRequest } from '@/types/Alumni';
import axios from 'axios';
import toast from 'react-hot-toast';





const AlumniRegistrationRequests: React.FC = () => {
  const [requests, setRequests] = useState<AlumniDashboard[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AlumniDashboard[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AlumniDashboard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const handleApprove = async (email: string) => {
    try {
      const response = await axios.post('/api/v1/admin/approve/alumni', { email: email });
      if (response.status !== 200) {
        throw new Error(response.data);
      }
      toast.success(response.data.message);
      const updatedRequests: AlumniDashboard[] = requests.map(request =>
        request.email === email ? { ...request, status: 'Approved' } : request
      );
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message)
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/admin/approve/alumni');
      if (response.status !== 200) {
        console.log(response.data)
      }
      console.log(response.data)
      setRequests(response.data);
      setFilteredRequests(response.data)
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (request: AlumniDashboard) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  const handleDelete = (email: string) => {
    const updatedRequests = requests.filter(request => request.email !== email);
    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
  };






  const handleEdit = async (editedRequest: AlumniDashboard) => {
    try {
      const response = await axios.put('/api/v1/admin/modify-alumni', editedRequest);
      console.log(editedRequest)
      if (response.status !== 200) {
        throw new Error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      const updatedRequests: AlumniDashboard[] = requests.map(request =>
        request.email === editedRequest.email ? editedRequest : request
      );
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
      closeModal();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = requests.filter(request =>
      request.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const handleBatchFilter = (batch: number | null) => {
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
    setBatchFilter(0);
    setFilteredRequests(requests);
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
            value={batchFilter || 0}
            onChange={(e) => handleBatchFilter(e.target.value === '0' ? null : parseInt(e.target.value))}
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
            key={request.email}
            className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative border-l-4 ${request.isVerified ? 'border-green-500' : 'border-red-500'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

          >
            <div className="p-6">
              <div className="text-xl font-medium text-black">{request.name}</div>
              <p className="text-gray-500">{`Batch: ${request.batch}`}</p>
              <p className="text-gray-500">{`LinkedIn: ${request.linkedin}`}</p>
              <p className="text-gray-500">{`review: ${request.review}`}</p>
              <p className="text-gray-500">{`rating: ${request.rating}`}</p>
              {request.company && (
                <p className="text-gray-500">{`Current Company: ${request.company}`}</p>
              )}
              <p className={`mt-2 text-sm font-bold ${request.isVerified ? 'border-green-500' : 'border-red-500'}`}>
                {request.isVerified ? 'Verified' : 'Not Verified'}
              </p>
              <div className="mt-4 space-x-4">

                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => { handleApprove(request.email); }}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => { openModal(request) }}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(request.email)}
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
                  type="number"
                  value={selectedRequest?.batch}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, batch: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn ID
                </label>
                <input
                  type="text"
                  value={selectedRequest?.linkedin}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, linkedin: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  review
                </label>
                <textarea
                  value={selectedRequest?.review}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, review: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  rating
                </label>
                <input
                  type="number"
                  value={selectedRequest?.rating}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, rating: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Company
                </label>
                <input
                  type="text"
                  value={selectedRequest?.company || ''}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest!, company: e.target.value })}
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
