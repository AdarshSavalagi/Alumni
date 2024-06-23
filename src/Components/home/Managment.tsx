'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import useWindowSize from '@rooks/use-window-size';
import { ManagementPerson } from '@/types/Management';

const Container2Variants = {
    // hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    hidden: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};



const Container2: React.FC = () => {
    const [state, setState] = useState(0);
    const [data, setData] = useState<ManagementPerson[]>([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    const containerRef = useRef<HTMLDivElement>(null);
    const { innerWidth } = useWindowSize();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/management');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.overflow = 'hidden';
            containerRef.current.style.scrollbarWidth = 'none';
            containerRef.current.style.scrollSnapType = 'none';
        }
    }, [data]);

    const goToSlide = (slideIndex: number) => {
        if (containerRef.current) {
            const slidePosition = slideIndex * (innerWidth || 0);
            containerRef.current.scrollTo({ left: slidePosition, behavior: 'smooth' });
            setState(slideIndex);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>No data available</div>
            </div>
        );
    }

    return (
        <section className="relative">
            <div className="h-[100vh] w-full bg-white flex flex-col justify-around" ref={ref}>
                <div>&nbsp;</div>
                <motion.h1
                    variants={Container2Variants}
                    animate={isInView ? 'visible' : 'hidden'}
                    initial="hidden"
                    className="text-3xl font-normal md:font-semibold text-black mb-3 text-center md:text-5xl md:text-left md:ml-24"
                >
                    Our Esteemed Management
                </motion.h1>
                <div className="md:hidden mx-auto w-full flex flex-col items-center">
                    <motion.img
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={Container2Variants}
                        src={data[state].image}
                        alt={data[state].name}
                        className="w-32 h-32 rounded-full"
                    />
                    <motion.p
                        animate={isInView ? 'visible' : 'hidden'}
                        initial="hidden"
                        variants={Container2Variants}
                        className="text-center text-black text-lg md:text-left md:text-2xl md:mx-12 mx-auto w-10/12"
                    >
                        {data[state].designation}
                    </motion.p>
                </div>
                <motion.div ref={containerRef} className="w-full flex flex-row overflow-x-scroll snap-x-mandatory">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="text-black text-lg md:text-left md:text-2xl mx-auto min-w-full flex-shrink-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="w-10/12 mx-auto">
                                <span className="text-6xl">“</span>
                                {item.message}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div
                    variants={Container2Variants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-row gap-4 md:gap-11 w-10/12 mx-auto justify-center align-middle"
                >
                    {data.map((item, index) => (
                        <div key={item.name} onClick={() => goToSlide(index)}>
                            <Card index={index} state={state} image={item.image} name={item.name} designation={item.designation} />
                        </div>
                    ))}
                </motion.div>
                <div>&nbsp;</div>
            </div>
        </section>
    );
};

const Card: React.FC<{ index: number; state: number; image: string; name: string; designation: string }> = ({ index, state, image, name, designation }) => {
    return index !== state ? (
        <motion.div initial="hidden" whileInView="visible" animate="visible" variants={Container2Variants} className="bg-black p-1 rounded-full md:my-2">
            <img src={image} alt={name} className="md:w-12 md:h-12 h-8 w-8 rounded-full" />
        </motion.div>
    ) : (
        <motion.div initial="hidden" whileInView="visible" animate="visible" variants={Container2Variants} className="flex flex-row bg-black p-1 md:px-4 rounded-full md:rounded-lg md:py-3">
            <img src={image} alt={name} className="md:w-12 md:h-12 h-8 w-8 rounded-full md:mr-3" />
            <div className="hidden md:block">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-white">{name}</h1>
                    <h2 className="text-sm font-normal text-white">{designation}</h2>
                </div>
            </div>
        </motion.div>
    );
};

export default Container2;
