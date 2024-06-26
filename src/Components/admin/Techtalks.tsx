'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface TechTalk {
    id?: string;
    name: string;
    topic: string;
    email: string;
    date?: string;
}

const fetchTechTalks = async () => {
    const response = await axios.get<TechTalk[]>('/api/v1/tech-talk');

    return response.data;
};

const createTechTalk = async (techTalk: TechTalk) => {
    await axios.post('/api/v1/admin/approve/tech-talk', techTalk);
};

const updateTechTalk = async (techTalk: TechTalk) => {
    await axios.put(`/api/v1/tech-talk?id=${techTalk.id}`, techTalk);
};

const deleteTechTalk = async (id: string) => {
    await axios.delete(`/api/v1/tech-talk?id=${id}`);
};

const TechTalks: React.FC = () => {
    const [techTalks, setTechTalks] = useState<TechTalk[]>([]);
    const [currentTechTalk, setCurrentTechTalk] = useState<TechTalk>({ name: '', topic: '', email: '',date:'' });

    useEffect(() => {
        fetchTechTalks().then(setTechTalks);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentTechTalk.id) {
            await updateTechTalk(currentTechTalk);
        } else {
            await createTechTalk(currentTechTalk);
        }
        setCurrentTechTalk({ name: '', topic: '', email: '',date:'' });
        fetchTechTalks().then(setTechTalks);
    };

    const handleDelete = async (id: string) => {
        await deleteTechTalk(id);
        fetchTechTalks().then(setTechTalks);
    };

    return (
        <section className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Tech Talks</h1>
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-white shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={currentTechTalk.name}
                        onChange={(e) => setCurrentTechTalk({ ...currentTechTalk, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={currentTechTalk.email}
                        onChange={(e) => setCurrentTechTalk({ ...currentTechTalk, email: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                    <input
                        type="text"
                        name="topic"
                        id="topic"
                        value={currentTechTalk.topic}
                        onChange={(e) => setCurrentTechTalk({ ...currentTechTalk, topic: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={currentTechTalk.date}
                        onChange={(e) => setCurrentTechTalk({ ...currentTechTalk, date: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button type="submit" className="btn p-3 rounded-md bg-black text-white mt-3">Submit</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techTalks.map((techTalk) => (
                    <motion.div
                        key={techTalk.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border rounded-lg bg-white shadow-md"
                    >
                        <h3 className="text-xl font-bold">{techTalk.name}</h3>
                        <p className="text-sm text-gray-500">{techTalk.email}</p>
                        <p className="text-md mt-2">{techTalk.topic}</p>
                        <p className="text-md mt-2">{techTalk.date?.slice(0,10)}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setCurrentTechTalk(techTalk)}
                                className="btn p-2 rounded-md bg-blue-500 text-white"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(techTalk.id!)}
                                className="btn p-2 rounded-md bg-red-500 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TechTalks;
