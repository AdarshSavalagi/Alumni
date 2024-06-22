'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewsCard, CareerCard, TechTalkCard,CareerType,NewsDataType,TechTalkType } from './Components'; // Adjust import paths as per your file structure


const fetchedCareerData:CareerType[] = [
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
    
];


const Container: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsDataType[]>([]);
    const [techTalksData, setTechTalksData] = useState<TechTalkType[]>([]);
    const [careerData, setCareerData] = useState<CareerType[]>(fetchedCareerData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
           
        };

        fetchData();
    }, []);


    return (
        <div className="w-11/12 mx-auto flex flex-col md:h-[80vh] md:flex-row gap-4">
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Latest News</h1>
                {loading ? (
                    <p className="p-4 text-gray-500">Loading...</p>
                ) : (
                    <ul>
                        {newsData.length > 0 ? (
                            newsData.map((obj, index) => (
                                <li key={index}>
                                    <NewsCard {...obj} />
                                </li>
                            ))
                        ) : (
                            <p className="p-4 text-gray-500">No news available</p>
                        )}
                    </ul>
                )}
            </div>
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Career Opportunity</h1>
                {loading ? (
                    <p className="p-4 text-gray-500">Loading...</p>
                ) : (
                    <ul>
                        {careerData.length > 0 ? (
                            careerData.map((obj, index) => (
                                <li key={index}>
                                    <CareerCard {...obj} />
                                </li>
                            ))
                        ) : (
                            <p className="p-4 text-gray-500">No career opportunities available</p>
                        )}
                    </ul>
                )}
            </div>
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Tech Talks</h1>
                <ul>
                    {techTalksData.map((talk) => (
                        <TechTalkCard
                            key={talk.id}
                            {...talk}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Container;
