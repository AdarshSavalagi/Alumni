import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlumniDashboard } from '@/types/Alumni';
import { useAppContext } from '@/context/AlumniContext';

const EditModal: React.FC<{
    data: AlumniDashboard;
    onSave: (data: AlumniDashboard) => void;
    onClose: () => void;
}> = ({ data, onSave, onClose }) => {
    const {departments}=useAppContext();
    const [editData, setEditData] = useState<AlumniDashboard>(data);
    const [photoPreview, setPhotoPreview] = useState<string>(data.photo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setEditData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
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
                    photo: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <motion.div
                className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className='text-xl font-bold mb-4'>Edit Alumni Data</h2>
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
                    Batch:
                    <input
                        type="text"
                        name="batch"
                        value={editData.batch}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={editData.company}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Position:
                    <input
                        type="text"
                        name="position"
                        value={editData.position}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    LinkedIn:
                    <input
                        type="text"
                        name="linkedin"
                        value={editData.linkedin}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2 items-center'>
                    Is Testimonial:
                    <input
                        type="checkbox"
                        name="isTestimonial"
                        checked={editData.isTestimonial!}
                        onChange={handleChange}
                        className='ml-2 align-middle h-5 w-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500'
                    />
                </label>
                <label className='block mb-4'>
                    Rating:
                    <motion.input
                        type="range"
                        name="rating"
                        value={editData.rating}
                        onChange={handleChange}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        min="1"
                        max="5"
                        step="1"
                        whileTap={{ scale: 0.9 }}
                    />
                    <motion.div className='text-center mt-2 text-xl font-semibold' whileHover={{ scale: 1.1 }}>
                        {editData.rating} / 5
                    </motion.div>
                </label>
                <label className='block mb-2'>
                    Review:
                    <textarea
                        name="review"
                        value={editData.review}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    />
                </label>
                <label className='block mb-2'>
                    Department:
                    <select
                        name="department"
                        value={editData.department}
                        onChange={handleChange}
                        className='border p-2 rounded w-full'
                    >
                      {departments.map((obj,index)=> <option key={index} value={obj.name}>{obj.name}</option>)}
                    </select>
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
                    <button onClick={() => onSave(editData)} className='bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600'>Save</button>
                    <button onClick={onClose} className='bg-gray-500 text-white p-2 rounded hover:bg-gray-600'>Cancel</button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditModal;
