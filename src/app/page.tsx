'use client'
import { motion } from "framer-motion";
import Hero from "@/Components/home/Hero";
import Container2 from "@/Components/home/Container2";
import Container3 from "@/Components/home/Container3";
import HrTag from "@/Components/components/HrTag";
import OfficeBearers from "@/Components/home/OfficeBearers";

const testis=[
  {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"1",
    rating:3
  }, {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"lorem23",
    rating:3
  }, {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"lorem23",
    rating:3
  }, {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"lorem23",
    rating:3
  }, {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"lorem23",
    rating:3
  }, {
    name:'Name',
    role:"student",
    avatar:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    "text":"lorem23",
    rating:3
  },
];

export default function Home() {
  return (
    <motion.div className="">
      <Hero />
      <main>
        <Container2 />
        <HrTag />
        <OfficeBearers testimonials={testis}/>
     
        <Container3 />
      </main>
    </motion.div>
  );
}