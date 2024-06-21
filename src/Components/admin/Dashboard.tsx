'use client';
import React from 'react';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Alumni Count', value: '100', emoji: '🎓' },
        { label: 'Overall Rating', value: '🌟🌟🌟🌟', emoji: '⭐' },
        { label: 'Management Count', value: '100', emoji: '👨‍💼' },
        { label: 'Office Bearer Count', value: '100', emoji: '🏢' },
    ];

    const notifications = [
        { label: 'Alumni Requests', value: '100 requests', emoji: '📝' },
        { label: 'Tech Talks', value: '100 requests', emoji: '💬' },
        { label: 'Company Referrals', value: '100 requests', emoji: '🏢' },
    ];

    const Card: React.FC<{ label: string, value: string, emoji: string }> = ({ label, value, emoji }) => (
        <div className='rounded-lg shadow-lg cursor-pointer h-44 flex flex-col justify-center items-center p-4'>
            <div className='font-bold text-2xl flex items-center justify-center'>{emoji} {label}</div>
            <p className='text-2xl'>{value}</p>
        </div>
    );

    return (
        <div className='p-4'>
            <h2 className='text-2xl font-bold mb-4'>Stats:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {stats.map((stat, index) => (
                    <Card key={index} label={stat.label} value={stat.value} emoji={stat.emoji} />
                ))}
            </div>

            <h2 className='text-2xl font-bold mb-4'>Notifications 🔔:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {notifications.map((notification, index) => (
                    <Card key={index} label={notification.label} value={notification.value} emoji={notification.emoji} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
