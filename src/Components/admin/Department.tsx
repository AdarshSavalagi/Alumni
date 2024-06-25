'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { DepartmentType } from '@/types/Department';


const MainComponent: React.FC = () => {

    const [name, setName] = useState('');
    const [data, setData] = useState<DepartmentType[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch existing data from the backend
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/department');
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data');
        }
    };

    const handleCreateOrUpdate = async () => {
        try {
            if (selectedId) {
                // Update existing record
                await axios.put(`/api/v1/department/?id=${selectedId}`, { name });
                toast.success('Updated successfully');
            } else {
                // Create new record
                await axios.post('/api/v1/department', { name });
                toast.success('Created successfully');
            }
            setName('');
            setSelectedId(null);
            fetchData();
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/v1/department/?id=${id}`);
            toast.success('Deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Failed to delete data');
        }
    };

    const handleEdit = (id: string, name: string) => {
        setName(name);
        setSelectedId(id);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
           

            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">{selectedId ? 'Edit Name' : 'Add Name'}</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCreateOrUpdate}
                            className="bg-blue-500 text-white p-2 rounded mr-2"
                        >
                            {selectedId ? 'Update' : 'Add'}
                        </button>
                        {selectedId && (
                            <button
                                onClick={() => {
                                    setName('');
                                    setSelectedId(null);
                                }}
                                className="bg-gray-500 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    {data.map((item,index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span>{item.name}</span>
                            <div>
                                <button
                                    onClick={() => handleEdit(item.id, item.name)}
                                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

         

            <Toaster />
        </div>
    );
};

export default MainComponent;
