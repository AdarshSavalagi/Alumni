'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { OfficeBearer } from '@/types/OfficeBearers';

const EditModal: React.FC<{
    data: OfficeBearer;
    isNew: boolean;
    onSave: (data: OfficeBearer, isNew: boolean) => void;
    onClose: () => void;
}> = ({ data, isNew, onSave, onClose }) => {
    const [editData, setEditData] = useState<OfficeBearer>(data);
    const [photoPreview, setPhotoPreview] = useState<string>(data.avatar);

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
                setPhotoPreview(reader.result as string);
                setEditData(prevState => ({
                    ...prevState,
                    avatar: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-bold mb-4'>{isNew ? 'Add New Office Bearer' : 'Edit Office Bearer Data'}</h2>
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
                    <button onClick={() => onSave(editData, isNew)} className='bg-blue-500 text-white p-2 rounded mr-2'>Save</button>
                    <button onClick={onClose} className='bg-gray-500 text-white p-2 rounded'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const OfficeBearers: React.FC = () => {
    const [officeBearerData, setOfficeBearerData] = useState<OfficeBearer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentEditData, setCurrentEditData] = useState<OfficeBearer | null>(null);
    const [isNew, setIsNew] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/office-bearer');
                setOfficeBearerData(response.data);
            } catch (error: any) {
                console.log('Error fetching data:', error.message);
                toast.error('Error fetching data');
            }
        };
        fetchData();
    }, []);

    const handleEditClick = (data: OfficeBearer) => {
        setCurrentEditData(data);
        setIsNew(false);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedData: OfficeBearer, isNew: boolean) => {
        if (isNew) {
            try {
                await axios.post('/api/v1/office-bearer', updatedData);
                setOfficeBearerData(prevData => [...prevData, updatedData]);
                toast.success('Office bearer added successfully');
            } catch (error: any) {
                console.log('Error adding data:', error.message);
                toast.error('Error adding data');
            }
        } else {
            try {
                await axios.put(`/api/v1/office-bearer/?name=${updatedData.name}`, updatedData);
                setOfficeBearerData(prevData =>
                    prevData.map(item => item.name === updatedData.name ? updatedData : item)
                );
                toast.success('Office bearer updated successfully');
            } catch (error: any) {
                console.log('Error updating data:', error.message);
                toast.error('Error updating data');
            }
        }
        setIsModalOpen(false);
    };

    const handleAdd = () => {
        const newEntry: OfficeBearer = {
            name: '',
            avatar: '',
            designation: '',
            message: ''
        };
        setCurrentEditData(newEntry);
        setIsNew(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (name: string) => {
        try {
            await axios.delete(`/api/v1/office-bearer/?name=${name}`);
            setOfficeBearerData(prevData => prevData.filter(item => item.name !== name));
            toast.success('Office bearer deleted successfully');
        } catch (error: any) {
            console.log('Error deleting data:', error.message);
            toast.error('Error deleting data');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='overflow-y-hidden p-4'>
            <h1 className='m-2 p-2 text-xl font-bold'>Office Bearers:</h1>
            <button onClick={handleAdd} className='mb-4 bg-green-500 text-white p-2 rounded'>Add New</button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {officeBearerData.map((data, index) => (
                    <div key={index} className='flex flex-col items-center justify-center m-3 p-3 shadow-lg rounded-lg'>
                        <img src={data.avatar} alt={data.name} className='rounded-full w-24 h-24' />
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
                    </div>
                ))}
            </div>
            {isModalOpen && currentEditData && (
                <EditModal 
                    data={currentEditData} 
                    isNew={isNew} 
                    onSave={handleSave} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default OfficeBearers;
