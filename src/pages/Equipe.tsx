import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-2"
    >
      <div className="h-px w-12 bg-accent/50" />
      <span className="text-accent text-xs font-bold tracking-widest uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight text-white tracking-tighter"
    >
      {children}
    </motion.h2>
  </div>
);

export const Equipe = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section>
          <SectionHeading subtitle="Auteurs">L'Équipe BATYM</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Barnabé Jouanard", role: "Développement" },
              { name: "Aurélien Trancart", role: "Chef De Projet" },
              { name: "Titouan Guerin", role: "Présentation" },
              { name: "Yohann Hesbert", role: "Illustration" },
              { name: "Martin Hernandez", role: "Recherche" }
            ].map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -15, scale: 1.05 }}
                className="glass p-10 rounded-[3rem] flex flex-col items-center text-center group transition-all duration-500 hover:bg-white/[0.05] border border-white/5 shadow-xl"
              >
                <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-accent to-accent-purple mb-8 flex items-center justify-center font-display font-black text-4xl text-black shadow-2xl group-hover:rotate-6 transition-transform">
                  {member.name[0]}
                </div>
                <h4 className="font-black mb-1 text-white text-xl">{member.name}</h4>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">{member.role}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 px-6 text-center relative overflow-hidden mt-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent/5 blur-[150px] rounded-full" />
        <div className="flex flex-col items-center gap-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="BATYM Logo" className="w-8 h-8" />
              <span className="font-display font-black tracking-tighter text-2xl text-white">BATYM</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img src="/Esiee.png" alt="ESIEE Paris" className="h-12 object-contain" />
            </motion.div>
          </div>
          <p className="text-white/40 max-w-2xl">
            Support académique du cours de Cartographie des Controverses • ESIEE Paris 2026<br/>
            <span className="text-white/20">© 2026 Équipe BATYM • Tous droits réservés.</span>
          </p>
        </div>
      </footer>
    </>
  );
};
