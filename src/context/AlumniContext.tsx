'use client'
import Footer from '@/Components/footer/Footer';
import Navbar from '@/Components/navbar/Navbar';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { DepartmentType } from '@/types/Department';
interface AlumniAppContextType {
    departments: DepartmentType[];
    setDepartments: React.Dispatch<React.SetStateAction<DepartmentType[]>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AlumniAppContextType | undefined>(undefined);


const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [departments, setDepartments] = useState<DepartmentType[]>([]);
    const [type, setType] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get('/api/v1/department');
                setDepartments(response.data);
            } catch (error:any) {
                toast.error(error.message);
            }
        };
        fetchData();
    },[]);
    return (
        <AppContext.Provider value={{ departments, setDepartments, type, setType, isLogin, setIsLogin }} >
            <Navbar isLogin={isLogin} />
            <Toaster />
            {children}
            <Footer />
        </AppContext.Provider>
    );
};
const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext };