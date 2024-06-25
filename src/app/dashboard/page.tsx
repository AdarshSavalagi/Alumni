'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AlumniDashboard } from '@/types/Alumni';


const AlumniEdit = () => {
    const [alumni, setAlumni] = useState<AlumniDashboard | null>(null);
    const [formData, setFormData] = useState<AlumniDashboard | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchAlumniData = async () => {
            try {
                const response = await axios.get('/api/v1/alumni/dashboard');
                setAlumni(response.data.alumni);
                setFormData(response.data.alumni);
            } catch (error: any) {
                console.error('Error fetching alumni data:', error);
                toast.error('Error fetching alumni data:', error.message);
            } finally {
                console.log("Alumni data fetched");
            }
        };
        fetchAlumniData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => (prevState ? { ...prevState, [name]: value } : null));
    };

    const handleSave = async () => {
        try {
            if (formData) {
                const response = await axios.put('/api/v1/alumni', { ...formData },);
                setAlumni(formData);
                setIsEditing(false);
                toast.success(response.data.message);
            }
        } catch (error: any) {
            console.error('Error saving alumni data:', error);
            toast.error('Error saving alumni data:', error.message);
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
                    {/* <p className='font-bold '>Verfied:{alumni.isVerified?<span className="text-green-900">done</span>:<span className="text-red-600"> Not yet</span>}</p> */}
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
                                    it will be dropdown
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData?.department || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
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
                            <div className="flex flex-col items-center">
                                <img src={alumni.photo} alt={alumni.name} className="rounded-full w-32 h-32 mb-4" />
                                <p className="text-lg font-semibold mb-2">{alumni.name} </p>


                                <div className="relative inline-block group">
                                    <span className={`indicator ${alumni.isVerified ? 'text-green-500' : 'text-yellow-500'}`}>
                                        Verification Status:  {alumni.isVerified ? 'Verified ✔️ ' : 'Pending ⏳'}
                                    </span>

                                </div>
                                <p className="text-gray-600 mb-4">{alumni.position} at {alumni.company}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <p><strong>Batch:</strong> {alumni.batch}</p>
                                <p><strong>Email:</strong> {alumni.email}</p>
                                <p><strong>Phone:</strong> {alumni.phone}</p>
                                <p><strong>Address:</strong> {alumni.address}</p>
                                <p><strong>LinkedIn:</strong> <a href={alumni.linkedin} className="text-blue-500">{alumni.linkedin}</a></p>
                                <p><strong>Department:</strong> {alumni.department}</p>
                                <p><strong>Rating:</strong> {alumni.rating}</p>
                                <p><strong>Review:</strong> {alumni.review}</p>
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit Profile
                                </button>
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
