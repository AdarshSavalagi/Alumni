import React from "react";

export interface NewsDataType {
    id: number;
    title: string;
    message: string;
    date: string;
    imageUrl: string;
}

export interface CareerType {
    id: number;
    companyName: string;
    message: string;
    date: string;
}

export interface TechTalkType {
    id: number;
    title: string;
    message: string;
    date: string;
}

export const NewsCard: React.FC<NewsDataType> = ({ imageUrl, title, date, message }) => {
    return (
        <div className="relative h-60 rounded-lg overflow-hidden shadow-lg m-3 p-3">
            <img src={imageUrl} alt="News background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h2 className="text-2xl font-bold">{title || 'Title not available'}</h2>
                <p className="text-sm mb-2">{date || 'Date not available'}</p>
                <p className="text-base">{message || 'Message not available'}</p>
            </div>
        </div>
    );
};

export const CareerCard: React.FC<CareerType> = ({ message, date, companyName }) => {
    return (
        <div className="mb-3 w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{companyName || 'Company name not available'}</h3>
                <p className="text-gray-600 text-sm mt-2">{date || 'Date not available'}</p>
                <p className="text-gray-700 mt-4">{message || 'Message not available'}</p>
            </div>
        </div>
    );
};

export const TechTalkCard: React.FC<TechTalkType> = ({ title, message, date }) => {
    return (
        <div className="w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-3">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{title || 'Title not available'}</h3>
                <p className="text-gray-600 text-sm mt-2">{date || 'Date not available'}</p>
                <p className="text-gray-700 mt-4">{message || 'Message not available'}</p>
            </div>
        </div>
    );
};
