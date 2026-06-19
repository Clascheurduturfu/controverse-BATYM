import { motion } from 'framer-motion';


export const Equipe = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-24">
        <section>
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.9]"
            >
              L'Équipe{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-blue-500">
                BATYM
              </span>
            </motion.h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Barnabé Jouanard", role: "Développement" },
              { name: "Aurélien Trancart", role: "Chef De Projet", url: "https://www.linkedin.com/in/aur%C3%A9lien-trancart-7a954a382/" },
              { name: "Titouan Guerin", role: "Présentation" },
              { name: "Yohann Hesbert", role: "Illustration" },
              { name: "Martin Hernandez", role: "Recherche" }
            ].map((member) => {
              const card = (
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
              );
              return member.url ? (
                <a key={member.name} href={member.url} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <div key={member.name}>{card}</div>
              );
            })}
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
              <a href="https://www.controverses-esiee.fr/" target="_blank" rel="noopener noreferrer">
                <img src="/Esiee.png" alt="ESIEE Paris" className="h-12 object-contain hover:opacity-80 transition-opacity cursor-pointer" />
              </a>
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
