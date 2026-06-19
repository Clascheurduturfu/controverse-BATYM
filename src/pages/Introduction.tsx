import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ScrollNavigateButton } from '../components/ScrollNavigateButton';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const TiltImage = ({ src, alt, className, caption }: { src: string, alt: string, className?: string, caption?: string }) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const factor = 20;

    setRotateX((y - centerY) / factor);
    setRotateY((centerX - x) / factor);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="group/img">
      <motion.div
        className={cn("relative overflow-hidden rounded-[2rem] glass p-2 cursor-pointer", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        style={{ perspective: 1000 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-[1.5rem] opacity-90 transition-transform duration-700 group-hover/img:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
        {caption && (
          <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover/img:translate-y-0 opacity-0 group-hover/img:opacity-100 transition-all duration-500">
            <p className="text-white font-bold text-sm">{caption}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const Introduction = ({ onNavigate }: { onNavigate: (route: string) => void }) => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <section className="space-y-5">
        {/* Hero Title - style Chronologie */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.9]"
          >
            Faut-il{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-blue-500">
              manhattaniser
            </span><br />
            le ciel Parisien ?
          </motion.h1>
          
        </div>

        {/* Définition + Image Tour Triangle */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">
          <div className="space-y-32">
            <div className="pt-8 glass p-10 rounded-[2rem] border-l-[6px] border-accent relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Quote className="w-24 h-24 text-white" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-accent" />
                <p className="text-xs font-black text-accent tracking-[0.3em] uppercase">Définition</p>
              </div>
              <p className="text-xl text-white/70 font-light leading-relaxed">
                On appelle <strong className="text-white font-black">« manhattanisation »</strong> l'idée de construire de nombreuses tours de grande hauteur en couronne autour de Paris, transformant radicalement le skyline historique.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-accent/50" />
                <span className="text-accent text-xs font-bold tracking-widest uppercase">Focus de la controverse</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter text-white leading-[0.95]">
                La Tour{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-blue-500">
                  Triangle
                </span>
              </h2>
              <p className="text-lg text-white/40 font-light leading-relaxed">
                Portée par <strong className="text-white font-bold">Unibail-Rodamco-Westfield</strong>, la Tour Triangle est le symbole même de cette "manhattanisation". Sa forme pyramidale unique de 180 mètres a été conçue pour minimiser les ombres, mais elle reste le point de cristallisation de toutes les oppositions.
              </p>
            </div>
          </div>

          <TiltImage
            src="/tour triangle.webp"
            alt="Tour Triangle Rendering"
            className="aspect-[3/4] shadow-3xl"
            caption="Rendu architectural du projet de Herzog & de Meuron."
          />
        </div>
        {/* Chiffres clés */}
        <div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-black text-white">44</p>
              <p className="text-xs text-white/40 mt-1">Étages</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-black text-white">91 000</p>
              <p className="text-xs text-white/40 mt-1">m² de surface</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-black text-white">180</p>
              <p className="text-xs text-white/40 mt-1">mètres de haut</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-black text-white">700</p>
              <p className="text-xs text-white/40 mt-1">millions d'€</p>
            </div>
          </div>
        </div>
                {/* Points de friction */}
        <div className="text-center pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-amber-400/50" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Points de friction</span>
            <div className="h-px w-8 bg-amber-400/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium">Le PLU bioclimatique</span>
            <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium">L'impact carbone</span>
            <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium">Financements politiques</span>
            <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium">Municipales 2026</span>
          </div>
        </div>
        {/* Arguments Pour / Contre */}
        <div className="pt-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-white/60 text-xs font-bold tracking-widest uppercase">Les arguments</span>
              <div className="h-px w-8 bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter text-white">
              <span className="text-emerald-400">Pour</span> ou <span className="text-red-400">Contre</span> ?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* POUR */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-b from-emerald-500/5 to-transparent border border-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 text-sm font-bold tracking-wide uppercase">Pour la verticalité</span>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-400/60 text-lg mt-0.5">+</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">Dynamisme économique</h4>
                    <p className="text-white/40 text-sm leading-relaxed">70 000 m² de bureaux, emplois directs et indirects, attractivité internationale renforcée pour le quartier Porte de Versailles.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-400/60 text-lg mt-0.5">+</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">Densification vertueuse</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Construire en hauteur pour libérer l'espace au sol, répondre à la pression immobilière sans étalement urbain.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-400/60 text-lg mt-0.5">+</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">Modernité architecturale</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Affirmer Paris comme métropole mondiale du XXIe siècle, à l'image de Londres, Francfort ou New York.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-emerald-400/60 text-lg mt-0.5">+</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">Performance énergétique</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Certification HQE, 11,6% de la façade en panneaux photovoltaïques, empreinte au sol minimisée par la forme triangulaire.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTRE */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-red-400 text-sm font-bold tracking-wide uppercase">Contre la verticalité</span>
              </div>
              <div className="space-y-5">
                <div className="flex gap-4 items-start group">
                  <span className="text-red-400/60 text-lg mt-0.5">−</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-red-300 transition-colors">Patrimoine menacé</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Rupture du skyline haussmannien et de la « faible élévation » caractéristique de Paris. L'UNESCO a exprimé son inquiétude (session 44, 2021).</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-red-400/60 text-lg mt-0.5">−</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-red-300 transition-colors">Bilan carbone contesté</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Empreinte réelle de la construction en béton/verre, effet d'îlot de chaleur, ombres portées sur les espaces publics environnants.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-red-400/60 text-lg mt-0.5">−</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-red-300 transition-colors">Opacité politique</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Plainte d'Anticor pour favoritisme (2020), perquisitions à la mairie de Paris, financements politiques questionnés.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <span className="text-red-400/60 text-lg mt-0.5">−</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-red-300 transition-colors">Opposition citoyenne</h4>
                    <p className="text-white/40 text-sm leading-relaxed">Associations et riverains mobilisés, recours juridiques multiples, vote serré au Conseil de Paris (5 voix de différence seulement).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollNavigateButton nextRoute="chronologie" label="Scroll pour découvrir la chronologie" onNavigate={onNavigate} />
      </section>
    </main>
  );
};
