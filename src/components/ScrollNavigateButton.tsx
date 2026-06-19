import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useWheelNavigation } from '../hooks/useScrollNavigation';

export const ScrollNavigateButton = ({ nextRoute, label, onNavigate }: {
  nextRoute: string;
  label: string;
  onNavigate: (route: string) => void;
}) => {
  const { scrollProgress } = useWheelNavigation(nextRoute, onNavigate);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <motion.div
      animate={{ y: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 2.5 }}
      className="flex flex-col items-center gap-4 z-10 mt-8"
    >
      <span className="text-[10px] font-medium tracking-[0.3em] mr-[-0.3em] text-white/40 uppercase cursor-default select-none">{label}</span>
      <button onClick={() => onNavigate(nextRoute)} className="relative w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="2"
            className="text-accent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <ChevronDown className="w-6 h-6 text-white" />
      </button>
    </motion.div>
  );
};
