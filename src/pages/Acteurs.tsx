import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ScrollNavigateButton } from '../components/ScrollNavigateButton';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const actorsData = [
  {
    name: "Mairie de Paris (Hidalgo, Missika, Grégoire)",
    role: "Soutien politique principal",
    side: "pour" as const,
    description: "La Ville de Paris, par l'intermédiaire de la Mairie centrale, est le principal acteur et soutien politique du projet de la Tour Triangle. Dès son origine, sous Bertrand Delanoë et sa première adjointe Anne Hidalgo, le projet est pensé comme un outil de transformation urbaine. Le projet repose alors sur l'idée que Paris doit évoluer face au manque de logement, et cela notamment en construisant occasionnellement en hauteur pour rester compétitif à l'échelle internationale. Quand Anne Hidalgo devient en 2014 maire de la capitale, elle devient la principale défenseure du projet. Son poids est déterminant puisqu'elle détient le pouvoir administratif de délivrer les permis de construire et de modifier les PLU. À son côté, Jean-Louis Missika, son Adjoint à l'urbanisme, apporte dès 2014 une justification plus technique. Il défend une densification ciblée de Paris et un développement vertical stratégique dans des zones denses comme la Porte de Versailles. Emmanuel Grégoire, nouveau maire, s'est aussi dit favorable au projet en 2021 sur BFMTV.",
    video: {
      url: "https://www.facebook.com/BFMParis/videos/428622685610614/",
      label: "Emmanuel Grégoire défend le projet controversé — BFM Paris",
    },
  },
  {
    name: "Unibail-Rodamco-Westfield (URW)",
    role: "Promoteur immobilier",
    side: "pour" as const,
    description: "Les promoteurs immobiliers constituent l'acteur économique central du projet, en particulier le groupe Unibail-Rodamco-Westfield. Leur position est clairement favorable puisqu'ils sont à l'origine du financement et de la réalisation du projet. Pour eux, la tour représente une opportunité économique mais aussi de visibilité à l'échelle internationale. Unibail-Rodamco-Westfield, aussi propriétaire des Halles à Paris et d'autres centres commerciaux, veulent développer leur parc immobilier avec de nouvelles surfaces hautes de gamme et des espaces hôteliers à proximité du palais des expositions de la Porte de Versailles, site d'exposition international. Leur influence est déterminante : en investissant plusieurs centaines de millions d'euros, ils rendent le projet possible, notamment avec du lobbying auprès des acteurs publics.",
  },
  {
    name: "Herzog & de Meuron",
    role: "Architectes du projet",
    side: "pour" as const,
    description: "Les architectes constituent un acteur incontournable du projet : sans architecte, pas de tour ! C'est le cabinet Herzog & de Meuron qui a gagné l'appel d'offre en 2012. Leur position est fortement favorable puisqu'ils sont à l'origine de la conception de la Tour Triangle. Ils défendent le projet comme une innovation architecturale majeure, capable de renouveler l'image de Paris tout en s'adaptant aux contraintes urbaines. La forme pyramidale de la tour est présentée comme un choix à la fois esthétique et fonctionnel, notamment pour limiter l'impact visuel et les ombres sur les bâtiments environnants. Leur rôle a été essentiel car c'est eux qui ont réalisé les deux propositions votées en 2014 puis 2015 au Conseil de Paris. Néanmoins ils n'ont pas une grande influence car ils possèdent peu de pouvoir exécutif et restent des prestataires du projet.",
  },
  {
    name: "Opposition politique (NKM, Dati, EELV)",
    role: "Élus opposants gauche & droite",
    side: "contre" as const,
    description: "Parmi les opposants au Conseil de Paris figurent des groupes de gauche comme des groupes de droite et du centre. Malgré des sensibilités politiques différentes, ils convergent depuis 2020 dans leur critique du projet qu'ils considèrent comme inadapté aux besoins réels des Parisiens et trop orienté vers des intérêts économiques privés. En effet, à Paris en 2026, 10% de bureaux sont inoccupés, ce qui interroge sur l'intérêt de construire de nouveaux bureaux dans la capitale. Ils défendent la vision d'un urbanisme parisien à taille humaine. À droite, Nathalie Kosciusko-Morizet incarnait cette opposition dès 2014. Plus récemment, Rachida Dati a poursuivi cette contestation en engageant des actions juridiques en 2021. À gauche, le groupe EELV s'est unanimement opposé au projet dès 2014 par conviction écologique. Fatoumata Koné a récemment critiqué l'hypocrisie des partis de droite qui avaient voté pour en 2015 mais sont revenus sur leur décision dès 2020.",
    video: {
      url: "https://www.facebook.com/RachidaDati.RD/videos/1937844586806128/",
      label: "Rachida Dati — « La Tour Triangle est le symbole d'un urbanisme hors-sol »",
    },
  },
  {
    name: "Associations (SOS Paris, Monts 14, FNE)",
    role: "Collectifs citoyens & environnementaux",
    side: "contre" as const,
    description: "Les associations environnementales, comme France Nature Environnement ou La Sauvegarde de Paris, adoptent une position à la fois critique et très prudente face au projet. Elles mettent en avant plusieurs arguments comme l'empreinte carbone liée à la construction ou les impacts négatifs sur la biodiversité. Elles insistent sur la nécessité de privilégier des alternatives plus durables, comme la rénovation des bâtiments existants. De même, des associations parisiennes militantes comme SOS Paris, Association Monts 14 ou le Collectif contre la Tour Triangle contestent principalement la légalité des procédures (modification du PLU, permis de construire). Elles jouent un rôle important en déposant des recours pour tenter de faire annuler les décisions administratives liées au projet.",
  },
  {
    name: "Anticor",
    role: "Association anti-corruption",
    side: "contre" as const,
    description: "L'organisation Anticor intervient sur le terrain de la transparence publique. En 2020, elle dépose une plainte pour favoritisme, estimant que certaines décisions entre la Mairie auraient pu avantager le promoteur Unibail-Rodamco avec un manque à gagner de 360 millions d'euros pour la capitale. Cette plainte a mené à des perquisitions dans la Mairie de Paris et à des auditions, notamment d'Élisabeth Borne, ancienne chargée de l'Urbanisme à Paris.",
  },
  {
    name: "UNESCO",
    role: "Organisation patrimoniale internationale",
    side: "contre" as const,
    description: "À une échelle internationale, l'UNESCO adopte une position critique vis-à-vis du projet. L'organisation n'approuve pas les modifications de PLU et conseille de revoir la décision quant au vote du projet. Son impact est moindre car la zone en question n'est pas classée au patrimoine mondial de l'UNESCO (les « rives de la Seine » le sont), mais sa position renforce les arguments de l'opposition. Lors de sa 44e session (2021, décision 44 COM 8B.54), le Comité du patrimoine mondial recommande que « avant de soumettre toute nouvelle proposition, un plan de gestion du bien soit préparé ».",
  },
  {
    name: "Tribunal Administratif de Paris",
    role: "Arbitre légal",
    side: "neutre" as const,
    description: "Le Tribunal administratif de Paris est un acteur institutionnel central dans cette controverse. Contrairement aux autres acteurs, il ne s'exprime pas sur le projet lui-même mais valide la légalité des décisions prises par la Ville de Paris. Il intervient comme arbitre dans le conflit opposant la majorité municipale et l'opposition. En 2014, Anne Hidalgo conteste le secret du scrutin et saisit le Tribunal. En janvier 2015, une QPC est déposée par NKM mais rejetée en mai 2015. Le 16 juillet 2015, le Tribunal annule le vote de novembre 2014, ce qui valide juridiquement le second vote de juin 2015 favorable au projet. De même en 2019, il rejette un recours du permis de construire porté par 3 associations militantes. Le tribunal a joué un rôle décisif mais son implication est restée neutre.",
  },
  {
    name: "Urbanistes & Experts indépendants",
    role: "Avis techniques partagés",
    side: "neutre" as const,
    description: "Les urbanistes et experts indépendants forment des groupes plus divisés. Certains soutiennent le projet, estimant que la construction en hauteur est une réponse pertinente à la densification de la ville et à la limitation de l'étalement urbain. D'autres au contraire s'y opposent, considérant qu'il menace l'équilibre visuel de la capitale et son patrimoine architectural, bien que situé à proximité du périphérique. Ces experts jouent un rôle important dans le débat : ils produisent des rapports économiques et environnementaux qui influencent les décisionnaires du projet et notamment le vote des élus.",
  },
];

const MatrixNode = ({ x, y, label, detail, color, align = 'bottom' }: { x: number, y: number, label: string, detail: string, color: string, align?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="absolute flex items-center justify-center z-20 hover:z-50"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ scale: isHovered ? 1.5 : 1 }}
          className={cn(
            "w-5 h-5 rounded-full cursor-help transition-shadow border-2 border-[#05070a]",
            isHovered ? "shadow-[0_0_20px_rgba(255,255,255,0.5)]" : "shadow-lg"
          )}
          style={{ backgroundColor: color }}
        />
        <div className={cn(
          "absolute w-max max-w-[140px] pointer-events-none transition-colors",
          align === 'bottom' ? "top-full mt-2 text-center left-1/2 -translate-x-1/2" : "",
          align === 'top' ? "bottom-full mb-2 text-center left-1/2 -translate-x-1/2" : "",
          align === 'left' ? "right-full mr-3 text-right top-1/2 -translate-y-1/2" : "",
          align === 'right' ? "left-full ml-3 text-left top-1/2 -translate-y-1/2" : "",
          isHovered ? "text-white" : "text-white/70"
        )}>
          <span className="text-[11px] font-bold leading-tight drop-shadow-md inline-block bg-[#05070a]/50 px-2 py-1 rounded-md backdrop-blur-sm">
            {label}
          </span>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className={cn(
                "absolute w-56 glass p-5 rounded-2xl z-50 border border-white/10 shadow-2xl backdrop-blur-3xl pointer-events-none",
                align === 'top' ? "bottom-full mb-8 left-1/2 -translate-x-1/2" : "top-full mt-8 left-1/2 -translate-x-1/2"
              )}
            >
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 w-4 h-4 glass rotate-45",
                align === 'top' ? "bottom-[-8px] border-r border-b border-white/10" : "top-[-8px] border-l border-t border-white/10"
              )} />
              <p className="text-sm text-white/80 leading-relaxed font-medium">{detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AccordionItem = ({ actor, isOpen, onToggle }: { actor: typeof actorsData[0] & { video?: { url: string; label: string } }, isOpen: boolean, onToggle: () => void }) => {
  const dotColor = actor.side === 'pour' ? 'bg-emerald-400' : actor.side === 'contre' ? 'bg-red-400' : 'bg-white/40';
  const borderColor = actor.side === 'pour' ? 'border-emerald-500/20' : actor.side === 'contre' ? 'border-red-500/20' : 'border-white/10';
  const hoverBorder = actor.side === 'pour' ? 'hover:border-emerald-400/40' : actor.side === 'contre' ? 'hover:border-red-400/40' : 'hover:border-white/30';
  const sideLabel = actor.side === 'pour' ? 'text-emerald-400' : actor.side === 'contre' ? 'text-red-400' : 'text-white/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("rounded-2xl border bg-white/[0.02] transition-all duration-300", borderColor, hoverBorder)}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center gap-4 text-left cursor-pointer"
      >
        <div className={cn("w-3 h-3 rounded-full shrink-0", dotColor)} />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base truncate">{actor.name}</h3>
          <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", sideLabel)}>{actor.role}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40 text-xl shrink-0"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="border-t border-white/5 pt-4">
                <div className={cn("flex gap-6", actor.video ? "flex-col md:flex-row md:items-center" : "")}>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{actor.description}</p>
                  {actor.video && (
                    <div className="shrink-0 w-full md:w-64 h-29 rounded-xl overflow-hidden border border-white/10 self-center">
                      <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(actor.video.url)}&show_text=false`}
                        width="256"
                        height="160"
                        allowFullScreen
                        className="w-full h-full"
                        style={{ border: 'none' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Acteurs = ({ onNavigate }: { onNavigate: (route: string) => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const pour = actorsData.filter(a => a.side === 'pour');
  const contre = actorsData.filter(a => a.side === 'contre');
  const neutre = actorsData.filter(a => a.side === 'neutre');

  const handleToggle = (globalIndex: number) => {
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  let globalIdx = 0;

  return (
    <main className="max-w-5xl mx-auto px-6 py-24 space-y-16">
      {/* Title */}
      <div className="text-center">
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
          Acteurs de la{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-300 to-blue-500">
            Controverse
          </span>
        </motion.h1>
        
      </div>

      {/* Favorables */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 text-sm font-bold tracking-wide uppercase">Favorables au projet</span>
          <span className="text-white/20 text-xs">({pour.length})</span>
        </div>
        <div className="space-y-3">
          {pour.map((actor) => {
            const idx = globalIdx++;
            return <AccordionItem key={idx} actor={actor} isOpen={openIndex === idx} onToggle={() => handleToggle(idx)} />;
          })}
        </div>
      </section>

      {/* Opposants */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-red-400 text-sm font-bold tracking-wide uppercase">Opposants au projet</span>
          <span className="text-white/20 text-xs">({contre.length})</span>
        </div>
        <div className="space-y-3">
          {contre.map((actor) => {
            const idx = globalIdx++;
            return <AccordionItem key={idx} actor={actor} isOpen={openIndex === idx} onToggle={() => handleToggle(idx)} />;
          })}
        </div>
      </section>

      {/* Neutres */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <span className="text-white/60 text-sm font-bold tracking-wide uppercase">Neutres / Institutionnels</span>
          <span className="text-white/20 text-xs">({neutre.length})</span>
        </div>
        <div className="space-y-3">
          {neutre.map((actor) => {
            const idx = globalIdx++;
            return <AccordionItem key={idx} actor={actor} isOpen={openIndex === idx} onToggle={() => handleToggle(idx)} />;
          })}
        </div>
      </section>

      {/* Cartographie */}
      <div className="glass rounded-[3rem] p-12 relative overflow-hidden border border-white/10">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-10 h-full w-full">
            {Array.from({ length: 10 }).map((_, i) => <div key={i} className="border-r border-white/20 h-full" />)}
          </div>
        </div>

        <div className="relative h-[650px] w-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-accent/50" />
                <span className="text-accent text-xs font-bold tracking-widest uppercase">Cartographie</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter">Positionnement des acteurs</h3>
              <p className="text-white/30 text-sm font-light mt-2">Implication × Perception du projet</p>
            </div>
            <div className="flex flex-wrap gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400" /> <span className="text-xs font-bold text-white/50">Favorables</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400" /> <span className="text-xs font-bold text-white/50">Opposants</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white/40" /> <span className="text-xs font-bold text-white/50">Neutres</span></div>
            </div>
          </div>

          <div className="flex-1 relative ml-16 mb-16 mr-16">
            <div className="absolute left-0 top-1/2 w-full h-[2px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-white/5 via-white/20 to-white/5 -translate-x-1/2" />
            <div className="absolute left-1/2 top-1/2 w-3 h-3 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase whitespace-nowrap -translate-x-1/2 -translate-y-1/2">Perception du Projet</div>
            <div className="absolute left-1/2 -bottom-10 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase -translate-x-1/2">Implication dans la controverse</div>

            <div className="absolute top-1/2 left-0 -translate-y-6 text-[10px] font-black text-red-400/60 tracking-widest uppercase">Faible</div>
            <div className="absolute top-1/2 right-0 -translate-y-6 text-[10px] font-black text-emerald-400/60 tracking-widest uppercase">Élevée</div>
            <div className="absolute bottom-0 left-1/2 ml-4 text-[10px] font-black text-red-400/60 tracking-widest uppercase">Hostile</div>
            <div className="absolute top-0 left-1/2 ml-4 text-[10px] font-black text-emerald-400/60 tracking-widest uppercase">Favorable</div>

            <MatrixNode x={50} y={10} label="Unibail-Rodamco-Westfield" detail="Promoteur finançant 300M€. Intérêt financier majeur et stratégique dans le projet." color="#34d399" align="bottom" />
            <MatrixNode x={72} y={12} label="Herzog & de Meuron" detail="Architectes : innovation pyramidale minimisant les ombres. Vision esthétique et performante." color="#34d399" align="bottom" />
            <MatrixNode x={92} y={14} label="Anne Hidalgo" detail="Principal soutien politique. Porte le projet 2008-2026. Détient le pouvoir administratif majeur." color="#34d399" align="left" />

            <MatrixNode x={88} y={40} label="Chambre Régionale Comptes" detail="Examine la régularité financière, conditions d'indemnité. Rôle institutionnel impartial." color="#ffffff" align="left" />
            <MatrixNode x={35} y={50} label="Experts Urbains" detail="Avis partagés. Critiques de l'intégration d'une hauteur de 180m dans le contexte haussmannien." color="#ffffff" align="bottom" />

            <MatrixNode x={68} y={62} label="Anticor" detail="Plainte pour favoritisme (2020). Manque à gagner estimé 360M€ pour la capitale." color="#f87171" align="top" />
            <MatrixNode x={78} y={72} label="Parquet National Financier" detail="Enquête sur soupçons de favoritisme. Perquisitions à la mairie 2020. Audition d'Élisabeth Borne." color="#ffffff" align="bottom" />

            <MatrixNode x={90} y={78} label="Collectifs Riverains" detail="SOS Paris, Monts 14, Collectif contre la Tour Triangle. Recours juridiques multiples." color="#f87171" align="left" />
            <MatrixNode x={90} y={88} label="EELV" detail="Opposition unanime depuis 2014. Critique le bilan carbone et la cohérence des labels environnementaux." color="#f87171" align="left" />
            <MatrixNode x={28} y={78} label="UNESCO" detail="Session 44 (2021) : inquiétude rupture unité du paysage. Pouvoir consultatif, renforce l'opposition." color="#f87171" align="bottom" />
            <MatrixNode x={12} y={72} label="NKM / Dati (LR)" detail="Opposition politique dès 2014. Dénoncent un symbole inutile, actions juridiques en 2021." color="#f87171" align="bottom" />
          </div>
        </div>
      </div>

      <ScrollNavigateButton nextRoute="sources" label="Scroll pour découvrir les sources" onNavigate={onNavigate} />
    </main>
  );
};
