'use client'
import { motion } from "framer-motion";
import Hero from "@/Components/home/Hero";
import Container2 from "@/Components/home/Managment";
import Container3 from "@/Components/home/Container3";
import HrTag from "@/Components/components/HrTag";
import Testimonials from "@/Components/home/Testimonials";
import OfficeBearers from "@/Components/home/OfficeBearers";
import NewsComponent from '@/Components/home/Newscomponents/NewsComponent';



export default function Home() {
  return (
    <motion.div>
      <Hero />
      <main>
        <Container2 />
        <OfficeBearers />
 
        <Container3 />
        <NewsComponent />
        <Testimonials />
      </main>
    </motion.div>
  );
}