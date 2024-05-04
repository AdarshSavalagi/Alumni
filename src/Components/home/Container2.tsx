'use client'
import { motion } from "framer-motion";
import { useState } from 'react';

const Container2Variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.7,
            type: "spring", stiffness: 100
        },
        x: -1000
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            staggerChildren: 0.1,
            delayChildren: 0.1,
            when: "beforeChildren"
        },
        x: 0
    },
}

const data = [
    {
        name: "Person 1",
        designation: "President",
        image: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        description: " 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic!",
    },
    {
        name: "Person 2",
        designation: "Principal",
        image: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        description: " 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic!",
    },
    {
        name: "Person 3",
        designation: "Chancellor",
        image: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        description: " 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic!",
    },
    {
        name: "Person 4",
        designation: "Vice President",
        image: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        description: " 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic!",
    },
];

export default function Container2() {
    const [state, setState] = useState(0);
    return (
        <section className="relative">
            <div className="h-[80vh] w-full bg-white ">
                <motion.h1 variants={Container2Variants} initial="hidden" animate="visible" className="text-3xl font-normal md:font-semibold text-black mt-16 mb-3 text-center md:text-5xl md:text-left md:ml-24">Our Presidents</motion.h1>
                <div className="md:hidden mx-auto w-full flex flex-col items-center">
                    <motion.img initial="hidden" animate="visible" variants={Container2Variants} src={data[state].image} alt={data[state].name} className="w-14 h-14 rounded-full" />
                    <motion.p animate="visible" initial="hidden" variants={Container2Variants} className="text-center text-black text-lg  md:text-left md:text-2xl md:mx-12 mx-auto w-10/12 " >{data[state].designation}</motion.p>
                </div>
                <motion.p variants={Container2Variants} initial="hidden" animate="visible" className="text-black text-lg text-justify md:text-left md:text-2xl md:mx-12 mx-auto w-10/12 "  >
                    <span className="text-2xl">“</span>{data[state].description}
                </motion.p>
                <div className="flex flex-row gap-4 w-10/12 mx-auto mt-2 justify-center">

                    {
                        data.map((data: any, index: number) =>
                            <div key={data.name} onClick={() => setState(index)}>
                                <Card index={index} state={state} image={data.image} name={data.name} designation={data.designation} />
                            </div>)
                    }
                </div>
            </div>
        </section>
    )
}


function Card(props: any) {
    console.log(props)
    if (props.index !== props.state) {
        return (
            <div className=" bg-black p-1 rounded-full ">
                <img src={props.image} alt={props.name} className="w-12 h-12 rounded-full" />
            </div>
        )
    } else
        return (
            <>
                <div className="flex flex-row bg-black p-1 md:px-4 rounded-full md:rounded-lg md:py-2">
                    <img src={props.image} alt={props.name} className="w-12 h-12 rounded-full md:mr-3" />
                    <div className="hidden md:block">

                        <div className="flex flex-col  ">
                            <h1 className="text-lg font-semibold text-white">{props.name}</h1>
                            <h2 className="text-sm font-normal text-white">{props.designation}</h2>
                        </div>
                    </div>
                </div>
            </>
        )
}