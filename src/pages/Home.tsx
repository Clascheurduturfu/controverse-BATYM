import React from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Maximize2 } from 'lucide-react';
import RotatingText from '../components/RotatingText/RotatingText';

export const Home = ({ onNavigate }: { onNavigate: (route: string) => void }) => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  return (
    <header className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-40 max-w-4xl px-4"
      >
        <h1 className="text-6xl md:text-7xl font-black text-center leading-tight tracking-tight">
          Faut-il préserver le patrimoine parisien ou le renouveler comme avec la tour <span className="text-white bg-accent px-4 py-2 rounded-lg inline-block"><RotatingText texts={["Montparnasse", "Eiffel", "Triangle", "Duos"]} splitBy="characters" mainClassName="inline-block" staggerDuration={0.025} staggerFrom="last" transition={{ type: "spring", damping: 30, stiffness: 400 }} exit={{ y: "-30%", opacity: 0 }} /></span> ?
        </h1>
        <button
          onClick={() => onNavigate('introduction')}
          className="group flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-black text-sm transition-all hover:bg-accent hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
        >
          Découvrir la controverse
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </header>
  );
};
