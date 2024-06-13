import React from 'react'
import { motion } from 'framer-motion';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Container2Variants = {
    hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};


const testimonialsData = [
    {
      name: 'John Doe',
      position: 'CEO, Company',
      testimonial: 'This is an amazing service! Highly recommend to everyone.',
      image: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
    },
    {
      name: 'Jane Smith',
      position: 'CTO, Another Company',
      testimonial: 'Fantastic experience, very professional and efficient.',
      image: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp',
    },
    // Add more testimonials here
  ]

export default function OfficeBearers() {
    return (
        <section>
            <div className=' container mx-auto my-5'>
                <motion.h1
                    variants={Container2Variants}
                    animate={'visible'}
                    initial="hidden"
                    className="text-3xl font-normal md:font-semibold text-black  mb-3 text-center md:text-5xl md:text-left "
                >
                    Office Bearers
                </motion.h1>
                <Testimonials testimonials={testimonialsData} />
            </div>
        </section>
    )
}


interface Testimonial {
  name: string;
  position: string;
  testimonial: string;
  image: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-5xl mx-auto p-8 rounded-lg ">
      {/* <h2 className="text-4xl font-bold text-white text-center mb-8">Testimonials</h2> */}
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-8">
            <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-xl">
              <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full md:mr-6 mb-4 md:mb-0" />
              <div className="text-center md:text-left">
                <p className="text-xl italic mb-4">"{testimonial.testimonial}"</p>
                <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

