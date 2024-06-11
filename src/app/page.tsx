'use client'
import { motion } from "framer-motion";
import Hero from "@/Components/home/Hero";
import Container2 from "@/Components/home/Container2";
import Container3 from "@/Components/home/Container3";
import Container5 from "@/Components/home/Container5";
import HrTag from "@/Components/components/HrTag";
import NewsCard from "@/Components/home/NewsCard";
export default function Home() {

  return (
    <motion.div className="">
      <Hero />
      <main>
        <Container2 />
        <HrTag />
        <Container3 />
        <HrTag />
        <Container5 />
        <HrTag />
        <NewsCard />
      </main>
    </motion.div>
  );
}