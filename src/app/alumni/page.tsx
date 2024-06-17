'use client'



import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Student {
    name: string;
    batch: number;
    department: string;
    photo: string;
}

// Sample data for students
const students: Student[] = [
    { name: 'John Doe', batch: 2020, department: 'Computer Science', photo: 'https://via.placeholder.com/150' },
    { name: 'Jane Smith', batch: 2021, department: 'Mechanical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Alice Johnson', batch: 2020, department: 'Electrical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Bob Brown', batch: 2019, department: 'Civil Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Charlie Black', batch: 2020, department: 'Computer Science', photo: 'https://via.placeholder.com/150' },
    { name: 'Dana White', batch: 2021, department: 'Mechanical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Eve Green', batch: 2020, department: 'Electrical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Frank Blue', batch: 2019, department: 'Civil Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Grace Pink', batch: 2020, department: 'Computer Science', photo: 'https://via.placeholder.com/150' },
    { name: 'Hank Red', batch: 2021, department: 'Mechanical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Ivy Orange', batch: 2020, department: 'Electrical Engineering', photo: 'https://via.placeholder.com/150' },
    { name: 'Jack Purple', batch: 2019, department: 'Civil Engineering', photo: 'https://via.placeholder.com/150' },
    // Add more student data as needed to ensure at least 10 per batch
];

const AlumniPage: React.FC = () => {
    const [selectedBatch, setSelectedBatch] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBatch(e.target.value);
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(e.target.value);
    };

    const filteredStudents = students.filter((student) => {
        return (
            (selectedBatch === '' || student.batch === parseInt(selectedBatch)) &&
            (selectedDepartment === '' || student.department === selectedDepartment)
        );
    });

    return (
        <div className="flex justify-center p-5 mx-auto">
            <div className="w-full max-w-7xl">
                <div className="mb-6 flex space-x-4">
                    <label className="flex flex-col">
                        <span className="mb-2 font-semibold">Pass Out Year:</span>
                        <select
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            className="p-2 border rounded-md"
                        >
                            <option value="">All</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            {/* Add more options as needed */}
                        </select>
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-2 font-semibold">Department</span>
                        <select
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            className="p-2 border rounded-md"
                        >
                            <option value="">All</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            {/* Add more options as needed */}
                        </select>
                    </label>
                </div>
                <div className="flex flex-wrap -mx-2 justify-center">
                    {filteredStudents.map((student, index) => (
                        <motion.div
                            key={index}
                            className="border rounded-lg p-4 m-2 w-64"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <img src={student.photo} alt={student.name} className="mb-2 w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-bold">{student.name}</h3>
                            <p className="text-sm">Batch: {student.batch}</p>
                            <p className="text-sm">Department: {student.department}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlumniPage;
