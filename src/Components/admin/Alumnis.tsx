'use client';
import { Alumni } from '@/types/Alumni';
import React, { useState, useEffect } from 'react';


const EditModal: React.FC<{
    data: Alumni;
    onSave: (data: Alumni) => void;
    onClose: () => void;
}> = ({ data, onSave, onClose }) => {
    const [editData, setEditData] = useState<Alumni>(data);
    const [photoPreview, setPhotoPreview] = useState<string>(data.photo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    photo: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
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
                        type="number" 
                        name="batch" 
                        value={editData.batch} 
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
                        <option value="Computer Science">Computer Science</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
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
                    <button onClick={() => onSave(editData)} className='bg-blue-500 text-white p-2 rounded mr-2'>Save</button>
                    <button onClick={onClose} className='bg-gray-500 text-white p-2 rounded'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const AlumniData: React.FC = () => {
    const initialData: Alumni[] = [
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
    ];

    const [alumniData, setAlumniData] = useState<Alumni[]>(initialData);
    const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>(initialData);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentEditData, setCurrentEditData] = useState<Alumni | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterDepartment, setFilterDepartment] = useState<string>('');
    const [filterBatch, setFilterBatch] = useState<number>(0);

    useEffect(() => {
        filterAlumni();
    }, [alumniData, searchTerm, filterDepartment, filterBatch]);

    const handleEditClick = (data: Alumni) => {
        setCurrentEditData(data);
        setIsModalOpen(true);
    };

    const handleSave = (updatedData: Alumni) => {
        setAlumniData(prevData =>
            prevData.map(item => item.name === updatedData.name ? updatedData : item)
        );
        setIsModalOpen(false);
    };

    const handleAdd = () => {
        const newEntry: Alumni = {
            name: '',
            batch: 2021,
            department: 'Computer Science',
            photo: ''
        };
        setCurrentEditData(newEntry);
        setIsModalOpen(true);
    };

    const handleDelete = (name: string) => {
        setAlumniData(prevData => prevData.filter(item => item.name !== name));
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
        <div className='overflow-y-hidden p-4'>
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
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
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
                <button onClick={handleAdd} className='ml-auto bg-green-500 text-white p-2 rounded'>Add New</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredAlumni.map((data, index) => (
                    <div key={index} className='flex flex-col items-center justify-center m-3 p-3 shadow-lg rounded-lg'>
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
                                onClick={() => handleDelete(data.name)} 
                                className='mt-2 bg-red-500 text-white p-2 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <EditModal 
                    data={currentEditData || { name: '', batch: 2021, department: 'Computer Science', photo: '' }} 
                    onSave={handleSave} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default AlumniData;
