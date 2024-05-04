'use client'
import Navbar from "@/Components/navbar/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <motion.div>
      <Navbar/>
      <div className="h-screen bg-slate-500"></div>
      <div className="h-screen bg-red-500"></div>

    </motion.div>

  );
}