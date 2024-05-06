'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';


const Container5Variants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
}

const dummyData = [
    {
        title: 'This is Event One',
        month: 'Apr',
        day: '14',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, m.'
    },
    {
        title: 'This is Event Two',
        month: 'May',
        day: '15',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, m.'
    },
    {
        title: 'This is Event Three',
        month: 'Jun',
        image: 'https://plus.unsplash.com/premium_photo-1667311649552-2cfab63bdcfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
        day: '17',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro animi exercitationem quos voluptates, similique, m.'
    },
]



const Container5: React.FC = () => {

    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <section className='relative'>
            <div ref={ref} className="md:h-screen w-full mx-auto">
                <div className='hidden md:block bg-black min-h-[80vh] absolute top-0 left-0 w-full'>
                    <div className="flex flex-row justify-between w-11/12 mx-auto mt-8" >
                        <motion.h1 initial='hidden' variants={Container5Variants} animate={isInView ? 'visible' : 'hidden'} className="text-3xl font-bold text-white text-left mt-4  md:text-6xl md:font-thin md:ml-12">Upcoming Events</motion.h1>
                        <motion.button initial='hidden' variants={Container5Variants} animate={isInView ? 'visible' : 'hidden'} className="btn  px-4 py-2 rounded-md text-white md:mx-9 md:w-64 md:text-xl">View More &gt;</motion.button>
                    </div>
                </div>
                <div className="flex md:hidden flex-row justify-between w-11/12 mx-auto " >
                    <motion.h1 initial='hidden' variants={Container5Variants} animate={isInView ? 'visible' : 'hidden'} className="text-3xl font-bold text-black text-left mt-4  md:text-6xl md:font-thin md:ml-12">Upcoming <br /> Events</motion.h1>
                    <motion.button initial='hidden' variants={Container5Variants} animate={isInView ? 'visible' : 'hidden'} className="btn  px-4 py-2 rounded-md text-black text-sm">View More &gt;</motion.button>
                </div>
                <motion.div initial='hidden' variants={Container5Variants} animate={isInView ? 'visible' : 'hidden'} className="w-11/12 mx-auto mt-24  flex-col md:flex-row gap-4 md:absolute md:inset-0 flex items-center justify-center">
                    {
                        dummyData.map((item, index) => {
                            return (
                                <motion.div initial='hidden' variants={Container5Variants} animate='visible' key={index}>
                                    <Card title={item.title} image={item.image} day={item.day} month={item.month} description={item.description} />
                                </motion.div>
                            )
                        })
                    }
                </motion.div>


            </div>
        </section>
    );

}


const Card: React.FC<{ title: string, image: string, month: string, day: string, description: string }> = (props) => {
    return (
        <>
            {props.title && props.image && props.month && props.day && props.description && (
                <motion.div initial="hidden" whileHover={{ scale: 1.01 }} animate="visible" variants={Container5Variants} className="mt-3 mb-3">
                    <img src={props.image} alt={props.title} className="w-full h-64 object-cover rounded-t-lg" />
                    <div className='bg-white rounded-b-lg shadow-md p-3'>
                        <div className="flex flex-row w-full">
                            <div className='text-sm font-thin text-black w-1/6 text-center my-3'>
                                <p className='text-blue-600 font-normal '>{props.month}</p>
                                <p className='font-semibold text-xl'>{props.day}</p>
                            </div>
                            <div className='w-5/6'>
                                <h1 className="text-xl font-bold text-black my-3">{props.title}</h1>
                                <p className="text-sm font-normal text-gray-500 my-3">{props.description}</p>
                            </div>
                        </div>

                    </div>
                </motion.div>

            )}
        </>
    )
}
export default Container5;















