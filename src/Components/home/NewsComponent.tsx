import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface newsData {
    id: number;
    title: string;
    message: string;
    date: string;
    imageUrl: string;
}
const newsData: newsData[] = [
    {
        id: 1,
        title: 'Lorem Ipsum News',
        message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        date: 'June 10, 2024',
        imageUrl: 'https://via.placeholder.com/300x200', // Example image size
    },
    {
        id: 2,
        title: 'Dolor Sit Amet News',
        message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: 'June 12, 2024',
        imageUrl: 'https://via.placeholder.com/300x200', // Example image size
    },
    {
        id: 3,
        title: 'Dolor Sit Amet News',
        message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: 'June 12, 2024',
        imageUrl: 'https://via.placeholder.com/300x200', // Example image size
    },
    {
        id: 4,
        title: 'Dolor Sit Amet News',
        message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: 'June 12, 2024',
        imageUrl: 'https://via.placeholder.com/300x200', // Example image size
    },
    // Add more news items as needed
];

interface careerType {
    id: number;
    companyName: string;
    message: string;
    date: string;
}

interface TechTalkType {
    id: number;
    title: string;
    message: string;
    date: string;
}


const careerData: careerType[] = [
    {
        id: 1,
        companyName: 'Example Company A',
        message: 'Nullam id nulla nec nulla pretium dapibus non in tellus.',
        date: 'June 15, 2024',
    },
    {
        id: 2,
        companyName: 'Example Company B',
        message: 'Duis quis magna a nunc vestibulum euismod.',
        date: 'June 18, 2024',
    },
    {
        id: 2,
        companyName: 'Example Company B',
        message: 'Duis quis magna a nunc vestibulum euismod.',
        date: 'June 18, 2024',
    },
    {
        id: 2,
        companyName: 'Example Company B',
        message: 'Duis quis magna a nunc vestibulum euismod.',
        date: 'June 18, 2024',
    },
    {
        id: 2,
        companyName: 'Example Company B',
        message: 'Duis quis magna a nunc vestibulum euismod.',
        date: 'June 18, 2024',
    },
];

const techTalksData: TechTalkType[] = [
    {
        id: 1,
        title: 'Tech Talk 1',
        message: 'Integer eu arcu sed nulla malesuada dapibus sit amet quis metus.',
        date: 'June 20, 2024',
    },
    {
        id: 2,
        title: 'Tech Talk 2',
        message: 'Phasellus lobortis justo sed sapien euismod, vel lacinia leo bibendum.',
        date: 'June 22, 2024',
    },
    {
        id: 2,
        title: 'Tech Talk 3',
        message: 'Phasellus lobortis justo sed sapien euismod, vel lacinia leo bibendum.',
        date: 'June 22, 2024',
    },
    {
        id: 2,
        title: 'Tech Talk 4',
        message: 'Phasellus lobortis justo sed sapien euismod, vel lacinia leo bibendum.',
        date: 'June 22, 2024',
    },
    {
        id: 2,
        title: 'Tech Talk 5',
        message: 'Phasellus lobortis justo sed sapien euismod, vel lacinia leo bibendum.',
        date: 'June 22, 2024',
    },
    {
        id: 2,
        title: 'Tech Talk 6',
        message: 'Phasellus lobortis justo sed sapien euismod, vel lacinia leo bibendum.',
        date: 'June 22, 2024',
    },

];


const NewsCard: React.FC<newsData> = ({ imageUrl, title, date, message }) => {
    return (
        <div className="relative  h-60 rounded-lg overflow-hidden shadow-lg m-3 p-3">
            <img src={imageUrl} alt="News background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm mb-2">{date}</p>
                <p className="text-base">{message}</p>
            </div>
        </div>
    );
};

const CareerCard: React.FC<careerType> = ({ message, date, companyName }) => {
    return (
        <div className="mb-3 w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{companyName}</h3>
                <p className="text-gray-600 text-sm mt-2">{date}</p>
                <p className="text-gray-700 mt-4">{message}</p>
            </div>
        </div>
    )
}


const TechTalkCard: React.FC<TechTalkType> = ({ title, message, date }) => {
    return (
        <div className="w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-3">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{date}</p>
                <p className="text-gray-700 mt-4">{message}</p>
            </div>
        </div>
    );
};
const Container: React.FC = () => {
    return (
        <div className="w-11/12 mx-auto flex flex-col md:h-[80vh] md:flex-row gap-4  ">
            <div className='w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin'>
                <h1 className='text-2xl font-bold m-3 p-3'>Latest News</h1>
                <ul>
                    {newsData.map((obj, index) => (
                        <li key={index}>
                            <NewsCard title={obj.title} date={obj.date} message={obj.message} id={obj.id} imageUrl={obj.imageUrl} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin'>
                <h1 className='text-2xl font-bold m-3 p-3'>Career Opportunity</h1>
                <ul>
                    {careerData.map((obj, index) => (
                        <li key={index}>
                            <CareerCard message={obj.message} date={obj.date} companyName={obj.companyName} id={index} />
                        </li>
                    ))}
                </ul>

            </div>
            <div className='w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin'>
                <h1 className='text-2xl font-bold m-3 p-3'>Tech Talks</h1>
                {techTalksData.map((talk) => (
                    <TechTalkCard
                        key={talk.id}
                        id={talk.id}
                        title={talk.title}
                        message={talk.message}
                        date={talk.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default Container;

