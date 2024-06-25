'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState([
        { label: 'Overall Rating', value: 0, emoji: '🌟' },
        { label: 'Alumni Count', value: '100', emoji: '🎓' },
        { label: 'Management Count', value: '100', emoji: '👨‍💼' },
        { label: 'Office Bearer Count', value: '100', emoji: '🏢' },
    ]);

    const [notifications, setNotifications] = useState([
        { label: 'Alumni Requests', value: '100 requests', emoji: '📝' },
        { label: 'Tech Talks', value: '100 requests', emoji: '💬' },
        { label: 'Company Referrals', value: '100 requests', emoji: '🏢' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/admin');
                const data = response.data;

                setStats([
                    { label: 'Overall Rating', value: data.overallRating, emoji: '🌟' },
                    { label: 'Alumni Count', value: `${data.totalVerifiedAlumni}`, emoji: '🎓' },
                    { label: 'Management Count', value: `${data.managementCount}`, emoji: '👨‍💼' },
                    { label: 'Office Bearer Count', value: `${data.officeBearerCount}`, emoji: '🏢' },
                ]);

                setNotifications([
                    { label: 'Alumni Requests', value: `${data.totalNotVerifiedAlumni} requests`, emoji: '📝' },
                    { label: 'Tech Talks', value: `${data.techTalks} requests`, emoji: '💬' },
                    { label: 'Company Referrals', value: `${data.refferals} requests`, emoji: '🏢' },
                ]);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i}>⭐</span>);
        }
        return stars;
    };

    const Card: React.FC<{ label: string, value: any, emoji: string }> = ({ label, value, emoji }) => (
        <motion.div
            className='rounded-lg shadow-lg cursor-pointer h-44 flex flex-col justify-center items-center p-4 bg-white transition transform hover:scale-105'
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='font-bold text-2xl flex items-center justify-center'>{emoji} {label}</div>
            <p className='text-2xl'>
                {label === 'Overall Rating' ? renderStars(value) : value}
            </p>
        </motion.div>
    );

    return (
        <div className='p-4 bg-gray-100 h-screen'>
            <h2 className='text-3xl font-bold mb-6'>Dashboard</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {stats.map((stat, index) => (
                    <Card key={index} label={stat.label} value={stat.value} emoji={stat.emoji} />
                ))}
            </div>

            <h2 className='text-3xl font-bold mb-6'>Notifications 🔔</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notifications.map((notification, index) => (
                    <Card key={index} label={notification.label} value={notification.value} emoji={notification.emoji} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
