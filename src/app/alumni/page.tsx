'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Alumni } from '@/types/Alumni';
import { useAppContext } from '@/context/AlumniContext';
import { loadBindings } from 'next/dist/build/swc';


const currentYear: number = new Date().getFullYear();

const batches: string[] = [''].concat(Array.from({ length: currentYear - 1994 }, (_, index) => (currentYear - index).toString()));




const StudentCard: React.FC<Alumni> = ({ name, batch, department, photo }) => (
    <motion.div
        className="border rounded-lg p-4 m-2 md:w-64 w-10/12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <img src={photo} alt={name} className="mb-2 w-full md:h-40 object-cover rounded-md" />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm">Batch: {batch}</p>
        <p className="text-sm">Department: {department}</p>
    </motion.div>
);

const AlumniPage: React.FC = () => {
    const [students, setStudents] = useState<Alumni[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const { departments } = useAppContext();
    const [loading, setLoading] = useState(true);

    const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBatch(e.target.value);
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(e.target.value);
    };

    const filteredStudents = useMemo(() => students.filter((student) => {
        return (
            (selectedBatch === '' || student.batch === selectedBatch) &&
            (selectedDepartment === '' || student.department === selectedDepartment)
        );
    }), [selectedBatch, selectedDepartment, students]);


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/v1/alumni');
                setStudents(response.data);
            } catch (error: any) {
                console.log(error.message);
                toast.error('Failed to fetch students');
            }finally{
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    if (loading) {
        return <div className='flex justify-center items-center h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
        </div>
    }
    return (
        <div className="flex justify-center p-5 mx-auto relative">
            <div className="w-full max-w-7xl">
                <div className="mb-6 flex space-x-4">
                    <label className="flex flex-col">
                        <span className="mb-2 font-semibold">Pass Out Year:</span>
                        <select
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            className="p-2 border rounded-md"
                        >
                            {batches.map(batch => <option key={batch} value={batch}>{batch || 'All'}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-2 font-semibold">Department</span>
                        <select
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            className="p-2 border rounded-md"
                        >
                            <option value={''}>All</option>
                            {departments.map(department => <option key={department.id} value={department.name}>{department.name || 'All'}</option>)}
                        </select>
                    </label>
                </div>
                <div className="flex flex-wrap md:-mx-2 justify-center">
                    {filteredStudents.map((student, index) => (
                        <StudentCard key={index} {...student} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlumniPage;