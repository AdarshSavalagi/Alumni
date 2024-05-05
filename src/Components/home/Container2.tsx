'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Container2Variants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};

const data = [
    {
        name: 'Person 1',
        designation: 'President',
        image: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
        description:
            '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !',
    },
    {
        name: 'Person 2',
        designation: 'Principal',
        image: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
        description:
            '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !',
    },
    {
        name: 'Person 3',
        designation: 'Chancellor',
        image: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
        description:
            '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !',
    },
    {
        name: 'Person 4',
        designation: 'Vice President',
        image: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
        description:
            '4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !',
    },
];

const Container2: React.FC = () => {
    const [state, setState] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView({ root: ref.current });

    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.style.overflow = 'hidden';
            container.style.scrollbarWidth = 'none';
            container.style.scrollSnapType = 'none';
        }
    }, []);

    const slideWidth = window.innerWidth;

    const goToSlide = (slideIndex: number) => {
        console.log('slideIndex', slideIndex);
        const container = containerRef.current;
        if (container) {
            const slidePosition = slideIndex * slideWidth;
            container.scrollTo({ left: slidePosition, behavior: 'smooth' });
            setState(slideIndex);
        }
    };

    return (
        <section className="relative">
            <div className="h-[100vh] w-full bg-white flex flex-col justify-around" ref={ref}>
                <div>&nbsp;</div>
                <motion.h1
                    variants={Container2Variants}
                    animate={isInView ? 'visible' : 'hidden'}
                    initial="hidden"
                    className="text-3xl font-normal md:font-semibold text-black  mb-3 text-center md:text-5xl md:text-left md:ml-24"
                >
                    Our Presidents
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
                        className="text-center text-black text-lg  md:text-left md:text-2xl md:mx-12 mx-auto w-10/12 "
                    >
                        {data[state].designation}
                    </motion.p>
                </div>
                <motion.div ref={containerRef} className='w-full overflow-x-scroll snap-x-mandatory flex flex-row'>
                    {data.map((data: any, index: number) => 
                    <motion.div key={index}
                        className="text-black text-lg    md:text-left md:text-2xl   mx-auto min-w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                       <p className='w-10/12 mx-auto'> <span className="text-6xl">“</span>
                        {data.description}</p>
                    </motion.div>)}
                </motion.div>
                <motion.div variants={Container2Variants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-row gap-4 md:gap-11 w-10/12 mx-auto  justify-center align-middle">
                    {data.map((data: any, index: number) => (
                        <div key={data.name} onClick={() => goToSlide(index)}>
                            <Card index={index} state={state} image={data.image} name={data.name} designation={data.designation} />
                        </div>
                    ))}
                </motion.div>
                <div>&nbsp;</div>
            </div>
        </section>
    );
};

function Card(props: any) {
    if (props.index !== props.state) {
        return (
            <motion.div initial="hidden" whileInView="visible" animate="visible" variants={Container2Variants} className=" bg-black p-1 rounded-full md:my-2">
                <img src={props.image} alt={props.name} className="w-12 h-12 rounded-full" />
            </motion.div>
        );
    } else
        return (
            <>
                <motion.div initial="hidden" whileInView="visible" animate="visible" variants={Container2Variants} className="flex flex-row bg-black p-1 md:px-4 rounded-full md:rounded-lg md:py-3">
                    <img src={props.image} alt={props.name} className="w-12 h-12 rounded-full md:mr-3" />
                    <div className="hidden md:block">
                        <div className="flex flex-col  ">
                            <h1 className="text-lg font-semibold text-white">{props.name}</h1>
                            <h2 className="text-sm font-normal text-white">{props.designation}</h2>
                        </div>
                    </div>
                </motion.div>
            </>
        );
}

export default Container2;
