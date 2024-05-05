import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHr = () => {
  return (
    <div className='w-10/12 mx-auto flex flex-row justify-center'>
      <motion.hr
        className="w-full h-0.5 bg-black mx-auto"
        initial={{ width: 0 }}
        variants={{
          visible: { width: "100%", originX: 1 },
          hidden: { width: 0 }
        }}
        whileInView="visible"
        transition={{ duration: 1 }}
      />
      
    </div>
  );
};

export default AnimatedHr;

