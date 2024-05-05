'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Container5Variants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
}

const Container5: React.FC = () => {

    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <>
        <div ref={ref} className="h-screen">
            This is Container5
        </div>
        </>
    );

}

export default Container5;















