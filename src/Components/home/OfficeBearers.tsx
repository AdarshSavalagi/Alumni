import React from 'react'
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { OfficeBearer } from '@/types/OfficeBearers';
import toast from 'react-hot-toast';
import axios from 'axios';


const Container2Variants = {
  hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};



export default function OfficeBearers() {
  const [officeBearerData, setOfficeBearerData] = React.useState<OfficeBearer[]>([]);
  React.useEffect(() => {
    axios.get('/api/v1/office-bearer').then((res) => {
      setOfficeBearerData(res.data);
    }).catch((err) => {
      toast.error('Failed to fetch data');
    });
  }, []);

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
        <OfficeBearerCards OfficeBearers={officeBearerData} />
      </div>
    </section>
  )
}



const OfficeBearerCards: React.FC<{ OfficeBearers: OfficeBearer[] }> = ({ OfficeBearers }) => {
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
      <Slider {...settings}>
        {OfficeBearers.map((testimonial, index) => (
          <div key={index} className="p-8">
            <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-xl">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full md:mr-6 mb-4 md:mb-0" />
              <div className="text-center md:text-left">
                <p className="text-xl italic mb-4">&apos;{testimonial.message}&apos;</p>
                <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};