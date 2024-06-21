'use client';
import React, { useState } from 'react';

interface ManagementPerson {
    name: string;
    avatar: string;
    designation: string;
    message: string;
}

const EditModal: React.FC<{
    data: ManagementPerson;
    onSave: (data: ManagementPerson) => void;
    onClose: () => void;
}> = ({ data, onSave, onClose }) => {
    const [editData, setEditData] = useState<ManagementPerson>(data);
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
            </div>
        </div>
    );
};

const ManagementData: React.FC = () => {
    const initialData: ManagementPerson[] = [
        {
            name: 'Principal',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Welcome to our institution!'
        },
        {
            name: 'Vice Principal',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Committed to excellence in education.'
        },
        {
            name: 'HOD',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Leading our department with pride.'
        },
        {
            name: 'Registrar',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Ensuring smooth administration.'
        },
        {
            name: 'Placement Officer',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Connecting students with opportunities.'
        },
        {
            name: 'Dean',
            avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
            designation: 'Dr. Shrinivasa Mayya D',
            message: 'Fostering academic growth.'
        },
    ];

    const [managementData, setManagementData] = useState<ManagementPerson[]>(initialData);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentEditData, setCurrentEditData] = useState<ManagementPerson | null>(null);

    const handleEditClick = (data: ManagementPerson) => {
        setCurrentEditData(data);
        setIsModalOpen(true);
    };

    const handleSave = (updatedData: ManagementPerson) => {
        setManagementData(prevData =>
            prevData.map(item => item.name === updatedData.name ? updatedData : item)
        );
        setIsModalOpen(false);
    };

    const handleAdd = () => {
        const newEntry: ManagementPerson = {
            name: '',
            avatar: '',
            designation: '',
            message: ''
        };
        setCurrentEditData(newEntry);
        setIsModalOpen(true);
    };

    const handleDelete = (name: string) => {
        setManagementData(prevData => prevData.filter(item => item.name !== name));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='overflow-y-hidden p-4'>
            <h1 className='m-2 p-2 text-xl font-bold'>Management Data:</h1>
            <button onClick={handleAdd} className='mb-4 bg-green-500 text-white p-2 rounded'>Add New</button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {managementData.map((data, index) => (
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
                    onSave={handleSave} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default ManagementData;
