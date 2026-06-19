import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ScrollNavigateButton } from '../components/ScrollNavigateButton';

const timelineData = [
  {
    year: "1887",
    endYear: "1889",
    title: "Construction de la Tour Eiffel",
    description: "Gustave Eiffel érige une tour de 312 mètres pour l'Exposition universelle de 1889. Violemment contestée par les artistes et intellectuels (« Protestation des 300 »), elle devient pourtant le symbole de Paris — un précédent historique sur l'acceptation de la hauteur.",
    icon: "🗼",
    accent: "from-amber-500 to-yellow-400",
  },
  {
    year: "1950",
    endYear: "1960",
    title: "Plan d'Urbanisme Directeur",
    description: "Raymond Lopez et Michel Holley défendent l'implantation de tours en périphérie pour 'ceinturer' le centre historique et préserver le patrimoine haussmannien du cœur de Paris.",
    icon: "🏗️",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    year: "1973",
    title: "Traumatisme Montparnasse",
    description: "Inauguration de la Tour Montparnasse (210m) qui traumatise durablement l'opinion parisienne. En réaction, le PLU de Paris interdit toute construction au-dessus de 37 mètres dans la capitale.",
    icon: "🏢",
    accent: "from-purple-500 to-pink-400",
  },
  {
    year: "1977",
    title: "Limitation de hauteur à 37m",
    description: "Le règlement d'urbanisme de Paris fixe la hauteur maximale des constructions à 37 mètres. Cette règle restera en vigueur pendant plus de 30 ans, figeant le skyline parisien.",
    icon: "📏",
    accent: "from-slate-500 to-gray-400",
  },
  {
    year: "2008",
    title: "Genèse du Projet Triangle",
    description: "Bertrand Delanoë et Anne Hidalgo évoquent pour la première fois le projet d'une tour triangulaire de 180 mètres conçue par Herzog & de Meuron à la Porte de Versailles.",
    icon: "📐",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    year: "2010",
    title: "Révision du PLU",
    description: "Le Conseil de Paris vote la modification du Plan Local d'Urbanisme, autorisant des dérogations de hauteur en périphérie. La voie est ouverte pour les projets de tours.",
    icon: "📋",
    accent: "from-sky-500 to-blue-400",
  },
  {
    year: "2014",
    title: "Premier rejet au Conseil",
    description: "Le Conseil de Paris rejette le projet Tour Triangle par un vote serré (5 voix de différence). Opposition forte des élus écologistes et d'une partie de la gauche.",
    icon: "❌",
    accent: "from-orange-500 to-amber-400",
  },
  {
    year: "2015",
    title: "Second vote favorable",
    description: "Après modifications du projet par Unibail-Rodamco, le Conseil de Paris approuve la Tour Triangle lors d'un second vote. Le permis de construire est délivré.",
    icon: "✅",
    accent: "from-green-500 to-emerald-400",
  },
  {
    year: "2016",
    endYear: "2019",
    title: "Recours juridiques",
    description: "Plusieurs recours juridiques engagés par des associations, des élus et des riverains cherchent à annuler le permis de construire. Le tribunal administratif de Paris rejette les recours en 2018.",
    icon: "⚖️",
    accent: "from-red-500 to-rose-400",
  },
  {
    year: "2020",
    title: "Plainte d'Anticor",
    description: "Anticor dépose plainte pour favoritisme concernant l'attribution du marché à Unibail-Rodamco. Des perquisitions sont menées à la mairie de Paris. Le projet est au cœur d'un scandale politico-financier.",
    icon: "🔍",
    accent: "from-rose-500 to-red-400",
  },
  {
    year: "2021",
    title: "Alerte UNESCO",
    description: "L'UNESCO exprime son inquiétude lors de sa 44e session concernant l'impact de la Tour Triangle sur les « rives de la Seine », inscrites au patrimoine mondial depuis 1991.",
    icon: "🌍",
    accent: "from-cyan-500 to-teal-400",
  },
  {
    year: "2022",
    title: "Début du chantier",
    description: "Malgré les oppositions persistantes, le chantier de la Tour Triangle débute officiellement Porte de Versailles. Les travaux sont prévus pour durer environ 4 ans.",
    icon: "🚧",
    accent: "from-amber-500 to-orange-400",
  },
  {
    year: "2023",
    title: "PLU Bioclimatique",
    description: "Adoption du nouveau PLU bioclimatique de Paris, limitant la hauteur des nouvelles constructions à 37 mètres. La Tour Triangle bénéficie d'un permis antérieur, mais aucun nouveau projet de cette envergure ne pourra voir le jour.",
    icon: "🌱",
    accent: "from-lime-500 to-green-400",
  },
  {
    year: "2026",
    title: "Élections municipales",
    description: "La manhattanisation de Paris s'impose comme enjeu majeur des élections municipales. Le sujet de la Tour Triangle est évoqué lors de débats entre les candidats. Fin prévue du chantier.",
    icon: "🗳️",
    accent: "from-violet-500 to-indigo-400",
  },
];

const TimelineCard = ({ item, index }: { item: typeof timelineData[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center w-full ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="lg:w-[calc(50%-40px)] w-full"
      >
        <div className="group relative">
          {/* Glow background */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${item.accent} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700`} />

          {/* Card content */}
          <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.06]">
            {/* Year badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{item.icon}</span>
              <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${item.accent} bg-opacity-10`}>
                <span className="text-sm font-black tracking-wider text-white">
                  {item.year}{item.endYear ? `–${item.endYear}` : ''}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-display font-black text-white mb-3 leading-tight tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center dot - hidden on mobile, visible on lg */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
        className="hidden lg:flex w-20 justify-center relative z-10"
      >
        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.accent} shadow-lg`}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.accent} animate-ping opacity-20`} />
        </div>
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
    </div>
  );
};

export const Chronologie = ({ onNavigate }: { onNavigate: (route: string) => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <section>
        {/* Header */}
        <div className="mb-24 text-center">
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
            Frise de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-blue-500">
              Controverse
            </span><br />
          </motion.h1>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-cyan-400 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Vertical line - mobile */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-cyan-400 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16 lg:space-y-24 pl-12 lg:pl-0">
            {timelineData.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-24">
          <ScrollNavigateButton nextRoute="acteurs" label="Scroll pour découvrir les acteurs" onNavigate={onNavigate} />
        </div>
      </section>
    </main>
  );
};
