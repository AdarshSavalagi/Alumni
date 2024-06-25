'use client';
import { ManagementPerson } from '@/types/Management';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
    <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
    </div>
);

const EditModal: React.FC<{
    data: ManagementPerson;
    onSave: (data: ManagementPerson) => void;
    onClose: () => void;
}> = ({ data, onSave, onClose }) => {
    const [editData, setEditData] = useState<ManagementPerson>(data);
    const [photoPreview, setPhotoPreview] = useState<string>(data.image);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPhotoPreview(base64String);
                setEditData(prevState => ({
                    ...prevState,
                    image: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div
            className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className='bg-white p-6 rounded-lg shadow-lg'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className='text-xl font-bold mb-4'>Edit Management Data</h2>
                <label className='block mb-2'>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Designation:
                    <input
                        type="text"
                        name="designation"
                        value={editData.designation}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Message:
                    <textarea
                        name="message"
                        value={editData.message}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Photo:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                {photoPreview && (
                    <div className='flex justify-center mb-2'>
                        <img src={photoPreview} alt="Preview" className='rounded-full w-24 h-24' />
                    </div>
                )}
                <div className='flex justify-end'>
                    <button onClick={() => onSave(editData)} className='bg-blue-500 text-white p-2 rounded mr-2'>Save</button>
                    <button onClick={onClose} className='bg-gray-500 text-white p-2 rounded'>Cancel</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ManagementData: React.FC = () => {
    const [managementData, setManagementData] = useState<ManagementPerson[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentEditData, setCurrentEditData] = useState<ManagementPerson | null>(null);

    const handleEditClick = (data: ManagementPerson) => {
        setCurrentEditData(data);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedData: ManagementPerson) => {
        try {
            if (managementData.some(person => person.name === updatedData.name)) {
                await axios.put(`/api/v1/management?name=${updatedData.name}`, updatedData);
                setManagementData(prevData =>
                    prevData.map(item => item.name === updatedData.name ? updatedData : item)
                );
                toast.success('Management data updated successfully');
            } else {
                await axios.post('/api/v1/management', updatedData);
                setManagementData(prevData => [...prevData, updatedData]);
                toast.success('New management data added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data');
        }
    };

    const handleAdd = () => {
        const newEntry: ManagementPerson = {
            name: '',
            image: '',
            designation: '',
            message: ''
        };
        setCurrentEditData(newEntry);
        setIsModalOpen(true);
    };

    const handleDelete = async (name: string) => {
        try {
            await axios.delete(`/api/v1/management/?name=${name}`);
            setManagementData(prevData => prevData.filter(item => item.name !== name));
            toast.success('Management data deleted successfully');
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Failed to delete data');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ManagementPerson[]>('/api/v1/management');
                setManagementData(response.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='overflow-y-hidden p-4'>
            <h1 className='m-2 p-2 text-xl font-bold'>Management Data:</h1>
            <button onClick={handleAdd} className='mb-4 bg-green-500 text-white p-2 rounded'>Add New</button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {managementData.map((data, index) => (
                    <motion.div
                        key={index}
                        className='flex flex-col items-center justify-center m-3 p-3 shadow-lg rounded-lg bg-white'
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={data.image} alt={data.name} className='rounded-full w-24 h-24' />
                        <div className='font-bold text-md mt-2'>{data.name}</div>
                        <p className='text-lg'>{data.designation}</p>
                        <p className='text-sm text-gray-500 text-center'>{data.message}</p>
                        <div className='flex'>
                            <button
                                onClick={() => handleEditClick(data)}
                                className='mt-2 bg-blue-500 text-white p-2 rounded mr-2'
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(data.name)}
                                className='mt-2 bg-red-500 text-white p-2 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            {isModalOpen && currentEditData && (
                <EditModal
                    data={currentEditData}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ManagementData;
