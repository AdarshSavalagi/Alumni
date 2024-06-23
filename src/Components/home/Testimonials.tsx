import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { Testimonial } from '@/types/Testimonial';
import axios from 'axios';

const Container2Variants = {
  hidden: { opacity: 0, transition: { duration: 0.7, type: 'spring', stiffness: 100 }, x: -1000 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 }, x: 0 },
};

const fetchTestimonials = async () => {
  try {
    const response = await axios.get('/api/v1/testimonials');
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const TestimonialItem = React.memo(({ testimonial }: { testimonial: Testimonial }) => (
  <div className="text-center p-4">
    <img
      src={testimonial.avatar}
      alt="avatar"
      className="rounded-full shadow-md mb-4 mx-auto"
      style={{ width: '150px' }}
    />
    <h5 className="mb-2 text-xl font-semibold">{testimonial.name}</h5>
    <p className="text-gray-600 mb-2">{testimonial.role}</p>
    <p className="text-gray-500 mb-4 italic">
      <i className="fas fa-quote-left pr-2"></i>{testimonial.text}
    </p>
    <ul className="list-unstyled flex justify-center text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <i className={i < testimonial.rating ? "fas fa-star" : "far fa-star"}></i>
        </li>
      ))}
    </ul>
  </div>
));

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);

  React.useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  const settings = React.useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  }), []);

  return (
    <div className="container mx-auto my-5 mb-10">
      <motion.h1
        variants={Container2Variants}
        animate={'visible'}
        initial="hidden"
        className="text-3xl font-normal md:font-semibold text-black mb-3 text-center md:text-5xl md:text-left"
      >
        Testimonials
      </motion.h1>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialItem key={testimonial.id || index} testimonial={testimonial} />
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(TestimonialCarousel);