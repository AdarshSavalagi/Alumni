'use client'
import { motion } from "framer-motion";
import Hero from "@/Components/home/Hero";
import Container2 from "@/Components/home/Container2";
import Container3 from "@/Components/home/Container3";
export default function Home() {

  return (
    <motion.div className="">

      <Hero />
      <main>
        <Container2 />
        <Container3 />
      </main>
    </motion.div>

  );
}