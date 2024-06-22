'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Overall Rating', value: '⭐⭐⭐⭐', emoji: '🌟' },
        { label: 'Alumni Count', value: '100', emoji: '🎓' },
        { label: 'Management Count', value: '100', emoji: '👨‍💼' },
        { label: 'Office Bearer Count', value: '100', emoji: '🏢' },
    ];

    const notifications = [
        { label: 'Alumni Requests', value: '100 requests', emoji: '📝' },
        { label: 'Tech Talks', value: '100 requests', emoji: '💬' },
        { label: 'Company Referrals', value: '100 requests', emoji: '🏢' },
    ];

    const Card: React.FC<{ label: string, value: string, emoji: string }> = ({ label, value, emoji }) => (
        <motion.div
            className='rounded-lg shadow-lg cursor-pointer h-44 flex flex-col justify-center items-center p-4 transition transform hover:scale-105'
            whileHover={{ scale: 1.05 }}
        >
            <div className='font-bold text-2xl flex items-center justify-center'>{emoji} {label}</div>
            <p className='text-2xl'>{value}</p>
        </motion.div>
    );

    return (
        <div className='p-4'>
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
