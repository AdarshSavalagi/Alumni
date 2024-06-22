'use client'
import { motion } from "framer-motion";
import Hero from "@/Components/home/Hero";
import Container2 from "@/Components/home/Container2";
import Container3 from "@/Components/home/Container3";
import HrTag from "@/Components/components/HrTag";
import Testimonials from "@/Components/home/Testimonials";
import OfficeBearers from "@/Components/home/OfficeBearers";
import NewsComponent from '@/Components/home/Newscomponents/NewsComponent';

const testis = [
  {
    name: 'Name 1',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 2',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 3',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 4',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 5',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 6',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  }, {
    name: 'Name 7',
    role: "student",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio? Officia delectus perspiciatis, expedita ea dolorum totam optio hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas ipsum quos ipsa optio?  !",
    rating: 3
  },
];

export default function Home() {
  return (
    <motion.div>
      <Hero />
      <main>
        <Container2 />
        <OfficeBearers />
        <HrTag />
        <Container3 />
        <NewsComponent/>
        <Testimonials testimonials={testis} />
   
      </main>
    </motion.div>
  );
}