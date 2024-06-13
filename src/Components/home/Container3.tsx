'use client'
import {motion,useInView} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
const Container3Variants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};

export default function Container() {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <section >
            <div className="h-[90vh] w-full flex flex-row  ">
                <div className="w-full md:w-3/5 hidden md:block m-auto">
                    <Image src={"/assets/alumni.png"} alt={"Alumni png"} className="mx-auto" width={500} height={600} />
                </div>
                <div className="w-full md:w-2/5  h-screen">
                    <div className="w-10/12 md:w-full mx-auto flex flex-col justify-around h-screen" ref={ref}>
                        <div></div>
                        <motion.p initial='hidden' variants={Container3Variants} animate={isInView?'visible':'hidden'} className="text-3xl font-bold text-black text-left  md:text-6xl md:font-thin md:ml-12">We are SIT Alumni</motion.p>
                        <motion.p initial='hidden' variants={Container3Variants} animate={isInView?'visible':'hidden'} className="text-lg md:text-xl tracking-wide md:tracking-wider md:mx-9">
                            For all who leave the Hilltop but whom the Hilltop never leaves, this is our creed. We are bold, curious and creative individuals who are driven to think big and do good. We are courageous changemakers who work hard, play hard and strive to make the world a better place.
                        </motion.p>
                        <button className="btn bg-black px-4 py-2 rounded-md text-white md:mx-9 md:w-64 md:text-xl">View Our Alumni&apos;s</button>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
    )
}