'use client';
import React, { useState } from 'react';
import ManagementData from '@/Components/admin/Management';
import Dashboard from '@/Components/admin/Dashboard';
import OfficeBearers from '@/Components/admin/OfficeBearer';
import Alumni from '@/Components/admin/Alumnis';
import ApproveAlumni from '@/Components/approve/Alumni';
import ApproveCareerGuidance from '@/Components/approve/CareerGuidance';
import ApproveReferrals from '@/Components/approve/Refferals';
import ApproveTechTalks from '@/Components/approve/TechTalks';

interface ListItemProps {
    option: string;
    isSelected: boolean;
    onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ option, isSelected, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={`p-2 hover:bg-gray-200 cursor-pointer m-2 rounded-lg shadow-lg ${isSelected ? 'bg-gray-200' : ''}`}
            role="option"
            aria-selected={isSelected}
        >
            {isSelected ? '\u2022 ' : ''} {option}
        </li>
    );
};



const TechTalks: React.FC = () => {
    return <div>Tech Talks</div>;
}

const Referrals: React.FC = () => {
    return <div>Referrals</div>;
}

const CareerGuidance: React.FC = () => {
    return <div>Career Guidance</div>;
}




const MainContent: React.FC = () => {
    const options: string[] = [
        'Dashboard',
        'Alumni\u0027s',
        'Tech talks',
        'Referrals',
        'Career guidance',
        'Office Bearers',
        'Management data',
        'Approve Alumnis',
        'Approve Tech Talks',
        'Approve Referrals',
        'Approve Career Guidance',
        
    ];
    const [selectedOption, setSelectedOption] = useState<string>(options[0]);

    return (
        <div className='h-screen flex flex-row z-50 overflow-y-auto' >
            <div className='w-1/4 m-2 p-3 shadow-lg rounded-lg overflow-y-auto' >
                <ul role="listbox">
                    {options.map((option, index) => (
                        <ListItem
                            key={index}
                            option={option}
                            isSelected={selectedOption === option}
                            onClick={() => {
                                setSelectedOption(option);
                                console.log(option);
                            }}
                        />
                    ))}
                </ul>
            </div>
            <div className='w-3/4 m-2 p-3 shadow-lg rounded-lg overflow-y-auto'>
                {selectedOption?.toLowerCase() === 'dashboard' ? <Dashboard /> : null}
                {selectedOption?.toLowerCase() === 'alumni\u0027s' ? <Alumni /> : null}
                {selectedOption?.toLowerCase() === 'tech talks' ? <TechTalks /> : null}
                {selectedOption?.toLowerCase() === 'referrals' ? <Referrals /> : null}
                {selectedOption?.toLowerCase() === 'career support' ? <CareerGuidance /> : null}
                {selectedOption?.toLowerCase() === 'office bearers' ? <OfficeBearers /> : null}
                {selectedOption?.toLowerCase() === 'management data' ? <ManagementData /> : null}
                {selectedOption?.toLowerCase() === 'approve alumnis' ? <ApproveAlumni /> : null}
                {selectedOption?.toLowerCase() === 'approve tech talks' ? <ApproveTechTalks /> : null}
                {selectedOption?.toLowerCase() === 'approve referrals' ? <ApproveReferrals /> : null}
                {selectedOption?.toLowerCase() === 'approve career guidance' ? <ApproveCareerGuidance /> : null}


            </div>
        </div>
    );
};

export default MainContent;
