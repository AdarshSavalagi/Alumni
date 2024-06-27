'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewsCard, CareerCard, TechTalkCard } from './Components';
import { TechTalk } from '@/types/TechTalk';
import { CareerType } from '@/types/Career';
import { NewsDataType } from '@/types/NewsData';

const Container: React.FC = () => {
    const [data, setData] = useState({
        newsData: [] as NewsDataType[],
        techTalksData: [] as TechTalk[],
        careerData: [] as CareerType[],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, techTalksRes, careerRes] = await Promise.all([
                    axios.get('/api/v1/news'),
                    axios.get('/api/v1/tech-talk'),
                    axios.get('/api/v1/career'),
                ]);
                setData({
                    newsData: newsRes.data,
                    techTalksData: techTalksRes.data,
                    careerData: careerRes.data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.log(error);
                setData(prevState => ({ ...prevState, loading: false, error: null }));
            }
        };

        fetchData();
    }, []);

  
    if (data.loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div>Loading...</div>
            </div>
        );
    }
    if (data.loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div>Error: {data.error}</div>
            </div>
        );
    }
    
   

    return (
        <div className="w-11/12 mx-auto flex flex-col md:h-[80vh] md:flex-row gap-4" id='news'>
            {/* Latest News */}
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Latest News</h1>
                {data.newsData.length > 0 ? (
                    <ul>{data.newsData.map((obj) => <li key={obj.id}><NewsCard {...obj} /></li>)}</ul>
                ) : (
                    <p className="p-4 text-gray-500">No news available</p>
                )}
            </div>
            {/* Career Opportunity */}
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Career Opportunity</h1>
                {data.careerData.length > 0 ? (
                    <ul>{data.careerData.map((obj) => <li key={obj.id}><CareerCard {...obj} /></li>)}</ul>
                ) : (
                    <p className="p-4 text-gray-500">No career opportunities available</p>
                )}
            </div>
            {/* Tech Talks */}
            <div className="w-full md:w-1/3 overflow-y-auto shadow-lg rounded-lg scrollbar-thin">
                <h1 className="text-2xl font-bold m-3 p-3">Tech Talks</h1>
                {data.techTalksData.length > 0 ? (
                    <ul>{data.techTalksData.map((talk) => <TechTalkCard key={talk.id} {...talk} />)}</ul>
                ) : (
                    <p className="p-4 text-gray-500">No tech talks available</p>
                )}
            </div>
        </div>
    );
};

export default Container;