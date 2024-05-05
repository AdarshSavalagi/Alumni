'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const NewsCardVariants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
}
const dummyData = [
    {
        title: 'This is News One',
        date: '2021-09-01',
        author: 'John Doe',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, mollitia saepe quo vel quod voluptatem autem reiciendis vitae officiis sed aspernatur! Ducimus a natus cum.'
    },
    {
        title: 'This is News Two',
        date: '2021-09-02',
        author: 'John Doe',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, mollitia saepe quo vel quod voluptatem autem reiciendis vitae officiis sed aspernatur! Ducimus a natus cum.'
    },
    {
        title: 'This is News Three',
        date: '2021-09-03',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        author: 'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, mollitia saepe quo vel quod voluptatem autem reiciendis vitae officiis sed aspernatur! Ducimus a natus cum.'
    },
]
const NewsCard: React.FC = () => {

    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <>
            <div className="md:h-screen w-10/12 mx-auto mt-3">
                <div className="flex flex-row justify-between" ref={ref}>
                    <motion.h1 initial='hidden' variants={NewsCardVariants} animate={isInView ? 'visible' : 'hidden'} className="text-3xl font-bold text-black text-left  md:text-6xl md:font-thin md:ml-12">News</motion.h1>
                    <motion.button initial='hidden' variants={NewsCardVariants} animate={isInView ? 'visible' : 'hidden'} className="btn  px-4 py-2 rounded-md text-black md:mx-9 md:w-64 md:text-xl">View More &gt;</motion.button>
                </div>
                <div className="w-11/12 mx-auto mt-3 flex flex-col md:flex-row gap-4">
                    {
                        dummyData.map((item, index) => {
                            return (
                                <motion.div initial='hidden' variants={NewsCardVariants} animate= 'visible'  key={index}>
                                    <Card title={item.title} image={item.image} date={item.date} author={item.author} description={item.description} />
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

const Card: React.FC<{ title: string, image: string, date: string, author: string, description: string }> = (props) => {
    return (
        <>
            {props.title && props.image && props.date && props.author && props.description && (
                <motion.div initial="hidden"  whileHover={{ scale: 1.01 }} animate="visible" variants={NewsCardVariants} className="mt-3 mb-3">
                    <img src={props.image} alt={props.title} className="w-full h-48 object-cover my-3" />
                    <div className="flex flex-col">
                        <h1 className="text-xl font-thin  text-black">{props.title}</h1>
                        <div className='flex flex-row gap-4 align-center my-2'>
                            <h2 className="text-md font-bold text-black">{props.author}</h2> <span className="text-sm font-normal text-gray-300">---</span>
                            <h2 className="text-xs font-normal text-black my-1">{props.date}</h2>
                        </div>
                    </div>
                    <p className="text-sm font-normal text-gray-500">{props.description}</p>
                    <p className="text-md text-black underline mt-4 font-semibold cursor-pointer" >View Post</p>
                </motion.div>

            )}
        </>
    )
}

export default NewsCard;

