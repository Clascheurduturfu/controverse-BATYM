import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { Introduction } from './pages/Introduction';
import { Chronologie } from './pages/Chronologie';
import { Acteurs } from './pages/Acteurs';
import { Equipe } from './pages/Equipe';
import { Sources } from './pages/Sources';

const Navbar = ({
  currentRoute,
  onNavigate
}: {
  currentRoute: string;
  onNavigate: (route: string) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Introduction', route: 'introduction' },
    { label: 'Chronologie', route: 'chronologie' },
    { label: 'Acteurs', route: 'acteurs' },
    { label: 'Sources', route: 'sources' },
    { label: 'Équipe', route: 'equipe' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
      scrolled ? "bg-[#05070a]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <button
          onClick={() => onNavigate('home')}
          className="absolute left-0 flex items-center gap-3 group text-left focus:outline-none cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity"
        >
          <img src="/logo.svg" alt="BATYM Logo" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-display font-black tracking-tighter text-2xl text-white group-hover:text-accent transition-colors">BATYM</span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`transition-all tracking-tight hover:scale-105 active:scale-95 cursor-pointer focus:outline-none bg-transparent border-none ${
                currentRoute === item.route ? 'text-accent font-bold' : 'text-white/60 hover:text-accent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [route, setRoute] = useState('home');

  const navigateTo = (newRoute: string) => {
    window.history.pushState(null, '', '/' + (newRoute !== 'home' ? newRoute : ''));
    setRoute(newRoute);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 350);
  };

  const renderPage = () => {
    switch (route) {
      case 'introduction':
        return <Introduction onNavigate={navigateTo} />;
      case 'chronologie':
        return <Chronologie onNavigate={navigateTo} />;
      case 'acteurs':
        return <Acteurs onNavigate={navigateTo} />;
      case 'sources':
        return <Sources onNavigate={navigateTo} />;
      case 'equipe':
        return <Equipe />;
      case 'home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="bg-[#05070a] min-h-screen selection:bg-accent/40 selection:text-white overflow-x-hidden font-sans text-white">
      <Navbar currentRoute={route} onNavigate={navigateTo} />

      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={route === 'home' ? '' : 'pt-20'}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
