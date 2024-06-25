'use client';
import { Alumni, AlumniDashboard } from '@/types/Alumni';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import EditModal from '@/Components/admin/editModel/AlumniEditModal';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context/AlumniContext';
const AlumniData: React.FC = () => {
    const [alumniData, setAlumniData] = useState<AlumniDashboard[]>([]);
    const [filteredAlumni, setFilteredAlumni] = useState<AlumniDashboard[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentEditData, setCurrentEditData] = useState<AlumniDashboard | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterDepartment, setFilterDepartment] = useState<string>('');
    const [filterBatch, setFilterBatch] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const {departments}=useAppContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/alumni');
                console.log(response.data)
                setAlumniData(response.data);
            } catch (error: any) {
                console.log('Error occurred while fetching alumni data:->', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        filterAlumni();
    }, [alumniData, searchTerm, filterDepartment, filterBatch]);

    const handleEditClick = (data: AlumniDashboard) => {
        setCurrentEditData(data);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedData: AlumniDashboard) => {

        try {
            console.log(updatedData)
            const response = await axios.put('/api/v1/admin/modify-alumni', updatedData);
            console.log(response.data);
            if (response.status !== 200) {
                toast.error('Error occurred while updating data');
                console.log(response.data)
                return;
            }
            toast.success('Data updated successfully');

            setAlumniData(prevData =>
                prevData.map(item => item.name === updatedData.name ? updatedData : item)
            );
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error.message);
            console.log(error)
        }
    };



    const handleDelete = async (email: string) => {

        try {
            const response = await axios.delete(`/api/v1/alumni?email=${email}`);
            console.log(response.data);
            if (response.status !== 200) {
                toast.error('Error occurred while deleting data');
                console.log(response.data)
                return;
            }
            toast.success('Data deleted successfully');
            setAlumniData(prevData =>
                prevData.filter(item => item.email !== email)
            );
        } catch (error: any) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterDepartment(e.target.value);
    };

    const handleFilterBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBatch(parseInt(e.target.value));
    };

    const filterAlumni = () => {
        let filtered = alumniData.filter(alumni =>
            alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterDepartment === '' || alumni.department === filterDepartment) &&
            (filterBatch === 0 || alumni.batch === filterBatch)
        );
        setFilteredAlumni(filtered);
    };

    return (
        <div className='overflow-y-auto p-4 bg-gray-100 min-h-screen'>
            <h1 className='m-2 p-2 text-3xl font-bold'>🎓 Alumni Data</h1>
            <div className='flex items-center mb-4'>
                <input
                    type="text"
                    placeholder="Search Alumni..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='border p-2 rounded mr-4'
                />
                <select
                    value={filterDepartment}
                    onChange={handleFilterDepartmentChange}
                    className='border p-2 rounded mr-4'
                >
                    <option value="">All Departments</option>
                   {departments.map((obj,index)=> <option key={index} value={obj.name}>{obj.name}</option>)}
                  
                </select>
                <select
                    value={filterBatch}
                    onChange={handleFilterBatchChange}
                    className='border p-2 rounded mr-4'
                >
                    <option value={0}>All Batches</option>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                </select>
                <p className='mb-2 text-gray-500'>Showing {filteredAlumni.length} results</p>

            </div>
            {loading ? (
                <div className='flex justify-center items-center h-full'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredAlumni.map((data, index) => (
                        <motion.div
                            key={index}
                            className='flex flex-col items-center justify-center m-3 p-3 shadow-lg rounded-lg bg-white'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img src={data.photo} alt={data.name} className='rounded-full w-24 h-24' />
                            <div className='font-bold text-md mt-2'>{data.name}</div>
                            <p className='text-lg'>{data.batch}</p>
                            <p className='text-sm text-gray-500 text-center'>{data.department}</p>
                            <div className='flex'>
                                <button
                                    onClick={() => handleEditClick(data)}
                                    className='mt-2 bg-blue-500 text-white p-2 rounded mr-2'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(data.email)}
                                    className='mt-2 bg-red-500 text-white p-2 rounded'
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <EditModal
                    data={currentEditData!}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AlumniData;
