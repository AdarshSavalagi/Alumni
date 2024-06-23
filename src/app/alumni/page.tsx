'use client'
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Student {
    name: string;
    batch: number;
    department: string;
    photo: string;
}

const students: Student[] = [
    {"name": "John Doe", "batch": 2021, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
    {"name": "Jane Doe", "batch": 2020, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Sam Smith", "batch": 2019, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Sue Johnson", "batch": 2021, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Bob Brown", "batch": 2020, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
    {"name": "Alice Williams", "batch": 2019, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Charlie Davis", "batch": 2021, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Diana Miller", "batch": 2020, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Eve Wilson", "batch": 2019, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
    {"name": "Frank Moore", "batch": 2021, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "George Taylor", "batch": 2020, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Helen Anderson", "batch": 2019, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Igor Thomas", "batch": 2021, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
    {"name": "Jack Jackson", "batch": 2020, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Kim White", "batch": 2019, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Luke Harris", "batch": 2021, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Mia Martin", "batch": 2020, "department": "Computer Science", "photo": "https://via.placeholder.com/150"},
    {"name": "Nick Thompson", "batch": 2019, "department": "Mechanical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Olivia Garcia", "batch": 2021, "department": "Electrical Engineering", "photo": "https://via.placeholder.com/150"},
    {"name": "Paul Martinez", "batch": 2020, "department": "Civil Engineering", "photo": "https://via.placeholder.com/150"}
  ]

const batches = ['', '2019', '2020', '2021'];
const departments = ['', 'Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];

const StudentCard: React.FC<Student> = ({ name, batch, department, photo }) => (
    <motion.div
        className="border rounded-lg p-4 m-2 md:w-64 w-10/12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <img src={photo} alt={name} className="mb-2 w-full h-40 object-cover rounded-md" />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm">Batch: {batch}</p>
        <p className="text-sm">Department: {department}</p>
    </motion.div>
);

const AlumniPage: React.FC = () => {
    const [selectedBatch, setSelectedBatch] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBatch(e.target.value);
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(e.target.value);
    };

    const filteredStudents = useMemo(() => students.filter((student) => {
        return (
            (selectedBatch === '' || student.batch === parseInt(selectedBatch)) &&
            (selectedDepartment === '' || student.department === selectedDepartment)
        );
    }), [selectedBatch, selectedDepartment]);

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
                            {departments.map(department => <option key={department} value={department}>{department || 'All'}</option>)}
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