'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';


const HeroVariants = {
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

const navItemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  hover: {
    scale: 1.1
  }
}

export default function Hero() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/tech-talk', { name, email, topic });
      toast.success(response.data.message);
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setTopic('');
    } catch (error: any) {
      setMessage(error.response.data.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative" >
      <motion.div className="h-[110vh] w-full" style={{ zIndex: 0, backgroundImage: "url('/assets/home-container.jpeg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}
        initial={{ y: 0 }}
      ></motion.div>
      <div className="h-[110vh] w-full absolute top-0 left-0 bg-black opacity-50 z-10"></div>
      <motion.div variants={HeroVariants} initial="hidden" animate="visible" className="absolute top-0 left-0 h-screen w-full z-20 flex flex-col md:flex-row justify-center items-center">
        <div className="w-11/12 md:w-2/3 text-start p-3">
          <motion.h1 variants={HeroVariants} className="text-3xl font-bold text-white mb-8 mt-24 md:text-6xl md:font-thin md:ml-12 ">Alumni, forever connected by our shared experiences and memories.</motion.h1>
          <motion.p variants={HeroVariants} className="text-white text-lg text-justify md:text-left md:text-2xl md:mx-12 tracking-wider" ><span className="text-2xl">“</span>Srinivas has a long history of rising to meet new challenges, of converting the energy of our time into forces of renewal and reinvention.</motion.p>
          <motion.button variants={navItemVariants} whileHover='hover' className="btn p-3 rounded-md bg-white text-black mt-2 md:hidden">Join Now</motion.button>

        </div>

        <motion.div variants={HeroVariants} className="bg-white p-5 rounded-lg mt-8 w-11/12 md:w-1/4 flex flex-col gap-2 md:mr-24 md:ml-16 ">
          <h3 className='text-3xl font-bold mt-5'>Inspire our students</h3>
          <p className='text-md text-gray-400 ' >If you wish to talk to our students, Share your details</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className='ml-1 '>Name</label><br />
            <input  type="text" name="name" id="name" value={name}
              onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' className='my-1 border p-3 rounded-lg w-full' /> <br />
            <label htmlFor="email" className='ml-1 '>Email</label><br />
            <input  type="email" name="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' className='my-1 border p-3 rounded-lg w-full'  /> <br />
            <label htmlFor="topic" className='ml-1 '>Topic</label><br />
            <input  type="text" name="topic" value={topic}
              onChange={(e) => setTopic(e.target.value)} id="topic" placeholder='Enter Topic' className='my-1 border p-3 rounded-lg w-full' /> <br />
            {message && <p className='mt-3 text-center text-red-500'>{message}</p>}
            <button className="btn p-3 rounded-md bg-black text-white mt-3" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
