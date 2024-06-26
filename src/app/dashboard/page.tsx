'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AlumniDashboard } from '@/types/Alumni';
import { useAppContext } from '@/context/AlumniContext';

const AlumniEdit = () => {
    const [alumni, setAlumni] = useState<AlumniDashboard | null>(null);
    const [formData, setFormData] = useState<AlumniDashboard | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { departments } = useAppContext();

    useEffect(() => {
        const fetchAlumniData = async () => {
            try {
                const response = await axios.get('/api/v1/alumni/dashboard');
                setAlumni(response.data.alumni);
                setFormData(response.data.alumni);
            } catch (error: any) {
                console.error('Error fetching alumni data:', error);
                toast.error('Error fetching alumni data:', error.message);
            } 
        };
        fetchAlumniData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => (prevState ? { ...prevState, [name]: value } : { [name]: value } as unknown as AlumniDashboard));
    };

    const handleSave = async () => {
        try {
            if (formData) {
                const response = await axios.put('/api/v1/alumni', { ...formData });
                setAlumni(formData);
                setIsEditing(false);
                toast.success(response.data.message);
            }
        } catch (error: any) {
            console.error('Error saving alumni data:', error);
            toast.error(`Error saving alumni data: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Alumni Profile</h1>
            {alumni ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-white rounded-lg shadow-md"
                >
                    {isEditing ? (
                        <>
                            <div className="flex flex-col items-center">
                                <img src={formData?.photo} alt={formData?.name} className="rounded-full w-32 h-32 mb-4" />
                                <input
                                    type="text"
                                    name="photo"
                                    value={formData?.photo || ''}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData?.name || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Batch</label>
                                    <input
                                        type="number"
                                        name="batch"
                                        value={formData?.batch || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData?.phone || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData?.address || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData?.company || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData?.position || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData?.linkedin || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <select
                                        name="department"
                                        value={formData?.department || ''}
                                        onChange={handleInputChange}
                                        className='border p-2 rounded mr-4'
                                    >
                                        {departments.map((obj) => (
                                            <option key={obj.id} value={obj.name}>{obj.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <input
                                        type="range"
                                        name="rating"
                                        value={formData?.rating || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        min={1}
                                        max={5}
                                        step={1}
                                    />
                                    <div className="text-center mt-2 text-lg font-semibold">{formData?.rating} / 5</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Review</label>
                                    <textarea
                                        name="review"
                                        value={formData?.review || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                      <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Alumni Profile</h1>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start"
    >
        <div className="flex-shrink-0 md:mr-6 flex justify-center md:justify-start w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-0">
            <img src={alumni.photo} alt={alumni.name} className="rounded-full w-full h-full object-cover border-2 border-gray-300" />
        </div>
        <div className="flex-grow w-full">
            <div className="text-center md:text-left mb-4">
                <h2 className="text-xl font-semibold mb-2">{alumni.name}</h2>
                <div className="relative inline-block group mb-4">
                    <span className={`indicator ${alumni.isVerified ? 'text-green-500' : 'text-yellow-500'}`}>
                        Verification Status: {alumni.isVerified ? 'Verified ✔️ ' : 'Pending ⏳'}
                    </span>
                </div>
                <p className="text-gray-600 mb-2">{alumni.position} at {alumni.company}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <tbody>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Batch:</td>
                            <td className="p-2">{alumni.batch}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Email:</td>
                            <td className="p-2">{alumni.email}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Phone:</td>
                            <td className="p-2">{alumni.phone}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Address:</td>
                            <td className="p-2">{alumni.address}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">LinkedIn:</td>
                            <td className="p-2">
                                <a href={alumni.linkedin} className="text-blue-500">{alumni.linkedin}</a>
                            </td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Department:</td>
                            <td className="p-2">{alumni.department}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td className="font-medium p-2">Rating:</td>
                            <td className="p-2">{alumni.rating}</td>
                        </tr>
                        <tr className="border-t border-b border-gray-200">
                            <td className="font-medium p-2">Review:</td>
                            <td className="p-2">{alumni.review}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-center md:text-left">
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    </motion.div>
</div>

                    </>
                    

                    )}
                </motion.div>
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-white">
                    <motion.div
                        className="border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            )}
        </div>
    );
};

export default AlumniEdit;
