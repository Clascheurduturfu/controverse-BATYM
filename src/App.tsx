import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Shield, 
  Leaf, 
  History,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Scale,
  Quote,
  ArrowUpRight,
  Info,
  Maximize2,
  Building2,
  Search,
  FileDown,
  ArrowLeft,
  Newspaper,
  BookOpen,
  Globe
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import RotatingText from './components/RotatingText/RotatingText';

// --- Utility for Tailwind classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interactive Image Component ---
const TiltImage = ({ src, alt, className, caption }: { src: string, alt: string, className?: string, caption?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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
        
        {/* Label always visible */}
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

        {/* Hover Detail Card */}
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

// --- Components ---

const Navbar = ({ 
  currentRoute, 
  onNavigate 
}: { 
  currentRoute: string; 
  onNavigate: (route: string, hashAnchor?: string) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Contexte', 'Triangle', 'Chronologie', 'Acteurs', 'Cartographie', 'Équipe'];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled || currentRoute === 'source' ? "bg-[#05070a]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer bg-transparent border-none"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors overflow-hidden shadow-[0_0_15px_rgba(0,210,255,0.15)]">
             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50" />
             <Building2 className="w-5 h-5 text-accent relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-display font-black tracking-tighter text-2xl text-white group-hover:text-accent transition-colors">BATYM</span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button 
              key={item} 
              onClick={() => onNavigate('home', `#${item.toLowerCase()}`)} 
              className="hover:text-accent transition-all tracking-tight hover:scale-105 active:scale-95 text-white/60 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('source')} 
            className={cn(
              "transition-all tracking-tight hover:scale-105 active:scale-95 font-bold cursor-pointer focus:outline-none bg-transparent border-none",
              currentRoute === 'source' ? "text-accent" : "text-white/60 hover:text-accent"
            )}
          >
            Sources
          </button>
        </div>
        <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase hidden sm:block">
          Paris • Controverse 2026
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, id }: { children: React.ReactNode, subtitle?: string, id?: string }) => (
  <div id={id} className="mb-16">
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

const TimelineItem = ({ year, title, description, index }: { year: string, title: string, description: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-12 pb-16 last:pb-0 border-l border-white/10 ml-4 group"
  >
    <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(0,210,255,0.6)] group-hover:scale-[2] transition-transform duration-500" />
    <span className="text-sm font-black text-accent mb-2 block tracking-widest">{year}</span>
    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors text-white font-display leading-tight">{title}</h3>
    <p className="text-white/50 text-base leading-relaxed group-hover:text-white/70 transition-colors">{description}</p>
  </motion.div>
);

const ActorCard = ({ name, role, description, side }: { name: string, role: string, description: string, side: 'pro' | 'con' | 'neutral' }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass p-8 rounded-[2.5rem] relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all duration-500"
  >
    <div className={cn(
      "absolute top-0 right-0 w-2 h-full opacity-30 group-hover:opacity-100 transition-opacity duration-500",
      side === 'pro' ? "bg-accent" : side === 'con' ? "bg-accent-purple" : "bg-white/40"
    )} />
    <h4 className="text-xl font-black mb-1 text-white group-hover:text-accent transition-colors">{name}</h4>
    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-6 block">{role}</span>
    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors font-medium">{description}</p>
  </motion.div>
);

// --- Sources Page Data & Component ---

interface Source {
  id: string;
  title: string;
  author?: string;
  publisher: string;
  date?: string;
  category: 'presse' | 'rapports' | 'web' | 'academique';
  description: string;
  context: string;
  url?: string;
}

const SOURCES_DATA: Source[] = [
  {
    id: "pdf-rapport",
    title: "Rapport d'Étude de Controverse : La Manhattanisation de Paris",
    author: "Équipe BATYM (B. Jouanard, T. Guerin, A. Trancart, Y. Hesbert, M. Hernandez)",
    publisher: "ESIEE Paris",
    date: "2026",
    category: "academique",
    description: "Le livret d'analyse complet détaillant les positions des acteurs, la chronologie des débats politiques et l'impact socio-environnemental de la Tour Triangle.",
    context: "Document d'analyse principal synthétisant l'ensemble des recherches de l'équipe.",
    url: "/Controverse.pdf"
  },
  {
    id: "batiweb-triangle",
    title: "Tour Triangle à Paris : une prouesse architecturale entre innovation et polémique",
    publisher: "Batiweb",
    date: "2021",
    category: "presse",
    description: "Article décrivant les innovations architecturales du projet de Herzog & de Meuron et détaillant les aspects techniques pour limiter les ombres portées.",
    context: "Mentionné en introduction pour exposer le compromis technique du projet face aux critiques.",
    url: "https://www.batiweb.com/actualites/architecture/tour-triangle-a-paris-une-prouesse-architecturale-entre-innovation-et-polemique-46107"
  },
  {
    id: "metropolitiques-hauteur",
    title: "Les Parisiens opposés à la grande hauteur",
    author: "Jean-François Valette",
    publisher: "Métropolitiques",
    date: "2012",
    category: "academique",
    description: "Étude et analyse de l'opinion publique parisienne face aux projets de densification verticale, mettant en lumière le rejet récurrent des IGH (Immeubles de Grande Hauteur).",
    context: "Sert de référence pour expliquer l'historique de la hauteur et la réticence culturelle parisienne depuis les années 1970.",
    url: "https://metropolitiques.eu/Les-Parisiens-opposes-a-la-grande-hauteur.html"
  },
  {
    id: "contrevues-periph",
    title: "Étude d'impact et flux de circulation sur le boulevard périphérique",
    publisher: "Contrevues",
    date: "2023",
    category: "rapports",
    description: "Rapport analysant la congestion routière (260 000 véhicules par jour) et l'effet barrière physique du périphérique entre Paris et la petite couronne.",
    context: "Utilisé pour la section 'Le périphérique comme objet de projet' et l'évaluation du trafic automobile."
  },
  {
    id: "unesco-44",
    title: "Rapport des décisions adoptées lors de la 44e session étendue du Comité du patrimoine mondial (page 415)",
    publisher: "UNESCO",
    date: "2021",
    category: "rapports",
    description: "Recommandations du comité du patrimoine mondial exprimant son inquiétude face à la rupture d'unité visuelle du paysage parisien causée par la Tour Triangle.",
    context: "Cité pour justifier la position d'opposant institutionnel de l'UNESCO sur le plan de la préservation du patrimoine.",
    url: "https://whc.unesco.org/document/188824"
  },
  {
    id: "anticor-favoritisme",
    title: "Plainte pour favoritisme dans l'attribution de la concession de la Tour Triangle",
    publisher: "Anticor / PNF",
    date: "2020",
    category: "rapports",
    description: "Détails de l'action en justice d'Anticor ciblant l'accord passé entre la Mairie de Paris et Unibail-Rodamco-Westfield pour la concession du Parc des Expositions.",
    context: "Utilisé pour expliquer les enjeux de transparence financière et les perquisitions menées à la mairie de Paris.",
    url: "https://www.anticor.org"
  },
  {
    id: "ta-paris-decision",
    title: "Décisions relatives aux recours contre le permis de construire de la Tour Triangle",
    publisher: "Tribunal Administratif de Paris",
    date: "2015 & 2019",
    category: "rapports",
    description: "Arrêtés rejetant les requêtes en annulation déposées par les associations (Monts 14, SOS Paris) et validant la modification simplifiée du PLU.",
    context: "Présenté pour illustrer le rôle d'arbitre légal et neutre joué par le Tribunal Administratif.",
    url: "http://paris.tribunal-administratif.fr"
  },
  {
    id: "hidalgo-communiques",
    title: "Dossiers de presse et communiqués de la Ville de Paris",
    publisher: "Ville de Paris",
    date: "2014-2021",
    category: "web",
    description: "Ensemble des communications officielles défendant le projet comme vecteur d'attractivité économique et d'innovation bioclimatique.",
    context: "Source pour les arguments politiques des pro-tours (Anne Hidalgo, Jean-Louis Missika).",
    url: "https://www.paris.fr"
  },
  {
    id: "info-durable-triangle",
    title: "Dossiers d'actualité sur le chantier et l'impact écologique de la Tour Triangle",
    publisher: "L'Info Durable",
    date: "2021-2023",
    category: "presse",
    description: "Articles décrivant les débats environnementaux sur le bilan carbone de la construction en béton armé et structure métallique.",
    context: "Utilisé pour documenter l'opposition écologique menée par le groupe EELV au Conseil de Paris.",
    url: "https://www.linfodurable.fr"
  },
  {
    id: "wikipedia-triangle",
    title: "Tour Triangle - Historique et caractéristiques du projet",
    publisher: "Wikipédia",
    date: "En continu",
    category: "web",
    description: "Synthèse libre documentant la hauteur (180m), le nombre d'étages (42), le coût de construction et les grandes étapes juridiques.",
    context: "Source de recoupement pour la chronologie globale et les caractéristiques physiques de l'édifice.",
    url: "https://fr.wikipedia.org/wiki/Tour_Triangle"
  }
];

const SourcesPage = ({ onNavigate }: { onNavigate: (route: string, hashAnchor?: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'presse' | 'rapports' | 'web' | 'academique'>('all');

  const filteredSources = SOURCES_DATA.filter(source => {
    const matchesSearch = 
      source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (source.author && source.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.context.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || source.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'presse':
        return <Newspaper className="w-5 h-5" />;
      case 'rapports':
        return <Scale className="w-5 h-5" />;
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'academique':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'presse': return 'Presse';
      case 'rapports': return 'Rapports & Décisions';
      case 'web': return 'Web & Encyclopédies';
      case 'academique': return 'Documents Académiques';
      default: return category;
    }
  };

  const tabs: { id: 'all' | 'presse' | 'rapports' | 'web' | 'academique'; label: string }[] = [
    { id: 'all', label: 'Toutes les sources' },
    { id: 'presse', label: 'Presse' },
    { id: 'rapports', label: 'Rapports & Décisions' },
    { id: 'web', label: 'Web & Encyclopédies' },
    { id: 'academique', label: 'Documents Académiques' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[80vh] relative z-10"
    >
      {/* Back button */}
      <motion.button
        onClick={() => onNavigate('home')}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="group flex items-center gap-2 text-white/50 hover:text-accent font-medium mb-12 cursor-pointer focus:outline-none bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour à l'analyse
      </motion.button>

      {/* Hero Header */}
      <div className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="h-px w-12 bg-accent/50" />
          <span className="text-accent text-xs font-bold tracking-widest uppercase">Bibliographie</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black leading-tight text-white tracking-tighter"
        >
          Sources de l'Étude
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-white/40 text-lg md:text-xl font-light mt-6 max-w-3xl leading-relaxed"
        >
          Consultez les documents officiels, rapports d'urbanisme, études d'opinion publique et publications médiatiques qui ont servi de fondement scientifique à notre cartographie des controverses de la verticalité parisienne.
        </motion.p>
      </div>

      {/* PDF Highlight Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-[3rem] p-8 md:p-12 mb-16 relative overflow-hidden border border-white/10 shadow-2xl group"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-purple/5 blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-purple/20 border border-white/10 flex items-center justify-center text-accent shadow-2xl group-hover:scale-105 transition-transform duration-500 shrink-0">
              <BookOpen className="w-12 h-12" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest inline-block mb-3">Rapport Complet</span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">Livre Blanc de la Controverse (PDF)</h2>
              <p className="text-white/40 text-sm mt-3 font-medium">Réalisé par l'équipe BATYM (ESIEE Paris 2026) • 19 pages • Format PDF</p>
              <p className="text-white/60 text-base mt-4 max-w-2xl font-light leading-relaxed">
                Ce rapport complet détaille notre méthodologie, approfondit la cartographie d'acteurs, analyse les risques du projet et formule les enjeux clés du débat.
              </p>
            </div>
          </div>
          <a 
            href="/Controverse.pdf" 
            download="BATYM_Controverse_Paris.pdf" 
            className="flex items-center gap-3 bg-white text-black hover:bg-accent hover:text-black hover:scale-105 active:scale-95 transition-all px-8 py-5 rounded-2xl font-black text-sm tracking-widest shrink-0 shadow-lg cursor-pointer"
          >
            TÉLÉCHARGER LE RAPPORT
            <FileDown className="w-5 h-5" />
          </a>
        </div>
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-10">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Rechercher une source (mot-clé, éditeur, auteur...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all backdrop-blur-md"
          />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus:outline-none bg-transparent border-none",
                activeTab === tab.id 
                  ? "bg-white/10 text-accent shadow-md" 
                  : "text-white/50 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredSources.map((source) => (
            <motion.div
              layout
              key={source.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 text-accent bg-accent/10 px-4 py-2 rounded-xl text-xs font-bold">
                    {getCategoryIcon(source.category)}
                    <span>{getCategoryLabel(source.category)}</span>
                  </div>
                  {source.date && (
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{source.date}</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white font-display leading-snug mb-3 group-hover:text-accent transition-colors">
                  {source.title}
                </h3>

                {source.author && (
                  <p className="text-xs font-semibold text-white/40 mb-4">Auteur : {source.author}</p>
                )}

                <div className="space-y-4 my-6">
                  <div>
                    <h4 className="text-[10px] font-black text-accent tracking-widest uppercase mb-1">Éditeur / Édition</h4>
                    <p className="text-sm text-white/70 font-medium">{source.publisher}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-accent tracking-widest uppercase mb-1">Description</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{source.description}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-accent-purple tracking-widest uppercase mb-1">Rapport avec la controverse</h4>
                    <p className="text-sm text-white/50 italic font-light leading-relaxed">« {source.context} »</p>
                  </div>
                </div>
              </div>

              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent group/link cursor-pointer hover:underline text-gradient bg-clip-text"
                >
                  Consulter la source
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="mt-6 text-xs font-bold text-white/20 italic cursor-default select-none">
                  Source physique / Référence rapport
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSources.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center glass rounded-[2rem]"
          >
            <p className="text-white/30 text-lg font-light">Aucune source ne correspond à vos critères de recherche.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/source' || path === '/sources' || hash === '#/source' || hash === '#/sources') {
      return 'source';
    }
    return 'home';
  });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/source' || path === '/sources' || hash === '#/source' || hash === '#/sources') {
        setRoute('source');
      } else {
        setRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (newRoute: string, hashAnchor?: string) => {
    if (newRoute === 'source') {
      window.history.pushState(null, '', '/source');
      setRoute('source');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '/' + (hashAnchor || ''));
      setRoute('home');
      if (hashAnchor) {
        setTimeout(() => {
          const element = document.querySelector(hashAnchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#05070a] min-h-screen selection:bg-accent/40 selection:text-white overflow-x-hidden font-sans text-white">
      <Navbar currentRoute={route} onNavigate={navigateTo} />
      
      <AnimatePresence mode="wait">
        {route === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-between px-6 pt-32 pb-12 overflow-hidden">
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
        
        <div className="flex-grow flex flex-col justify-center w-full relative z-10">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-black tracking-[0.5em] uppercase mb-12 text-accent shadow-[0_0_30px_rgba(0,210,255,0.15)]">
                Étude de Cartographie des Controverses
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-7xl md:text-9xl lg:text-[12rem] font-display font-black tracking-tighter leading-[0.8] mb-12 select-none flex flex-col items-center"
            >
              <span className="text-gradient block">PARIS</span>
              <RotatingText
                texts={['VERTICAL?', 'DENSE?', 'VERTE?', 'DURABLE?']}
                mainClassName="text-white/20 mt-2"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden pb-4 sm:pb-6 md:pb-8 pr-4"
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                rotationInterval={4000}
              />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-3xl text-white/30 max-w-4xl mx-auto leading-relaxed mb-16 font-light"
            >
              Analyse des enjeux socio-économiques et patrimoniaux des gratte-ciels en périphérie parisienne.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a href="#contexte" className="group flex items-center justify-center gap-3 bg-white text-black px-12 py-6 rounded-full font-black text-lg transition-all hover:bg-accent hover:scale-105 active:scale-95 shadow-xl">
                COMMENCER L'ANALYSE
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#triangle" className="flex items-center justify-center gap-3 px-12 py-6 rounded-full font-black text-lg border border-white/10 hover:bg-white/5 text-white transition-all z-20">
                FOCUS TRIANGLE
                <Maximize2 className="w-5 h-5 text-white/40" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex flex-col items-center gap-4 z-10 mt-8"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] mr-[-0.3em] text-white/40 uppercase cursor-default select-none">SCROLL TO DISCOVER</span>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-accent/50 to-transparent" />
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-64">
        
        {/* Context / Problématique */}
        <section id="contexte">
          <div className="grid lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-7">
              <SectionHeading subtitle="La Problématique" id="prob">Le Choc des Hauteurs</SectionHeading>
              <div className="space-y-12 text-2xl text-white/50 leading-relaxed font-light">
                <p>
                  On appelle <strong className="text-white font-black">« manhattanisation »</strong> l’idée de construire de nombreuses tours de grande hauteur en couronne autour de Paris.
                </p>
                <div className="glass p-12 rounded-[3rem] border-l-[12px] border-accent relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Quote className="w-32 h-32 text-white" />
                  </div>
                  <p className="text-3xl font-display font-black text-white italic leading-tight mb-6">
                    "Faut-il densifier en hauteur la périphérie, la verdir, la couvrir partiellement, ou réduire les places de voitures ?"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-accent" />
                    <p className="text-xs font-black text-accent tracking-[0.3em] uppercase">LE CŒUR DU DÉBAT</p>
                  </div>
                </div>
                <p>
                  Cette controverse oppose deux visions : une <span className="text-white font-bold underline decoration-accent/30 underline-offset-8">métropole mondiale compétitive</span> et une <span className="text-white font-bold underline decoration-accent-purple/30 underline-offset-8">ville au patrimoine incomparable</span>.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 sticky top-32">
              <TiltImage 
                src="/Le paysage Haussmannien face à la verticalité.webp" 
                alt="Architecture Paris" 
                className="aspect-[4/5] shadow-3xl"
                caption="Le paysage Haussmannien face à la verticalité."
              />              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="glass p-8 rounded-3xl border border-white/5">
                  <span className="text-accent font-black text-4xl block mb-2 tracking-tighter">11%</span>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Trafic intra-muros</p>
                </div>
                <div className="glass p-8 rounded-3xl border border-white/5">
                  <span className="text-accent font-black text-4xl block mb-2 tracking-tighter">260k</span>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Véhicules / jour</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tour Triangle Focus */}
        <section id="triangle">
          <SectionHeading subtitle="Focus Projet" id="tri-focus">La Tour Triangle</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <TiltImage 
              src="/tour triangle.webp" 
              alt="Tour Triangle Rendering" 
              className="aspect-video"
              caption="Rendu architectural du projet de Herzog & de Meuron."
            />
            <div className="space-y-10">
              <h3 className="text-5xl font-display font-black text-white leading-tight tracking-tighter">Une pyramide de 180 mètres au cœur des débats</h3>
              <p className="text-2xl text-white/40 font-light leading-relaxed">
                Portée par <strong className="text-white font-bold">Unibail-Rodamco-Westfield</strong>, la Tour Triangle est le symbole même de cette "manhattanisation". Sa forme pyramidale unique a été conçue pour minimiser les ombres, mais elle reste le point de cristallisation de toutes les oppositions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                  <h4 className="text-accent font-black text-xs uppercase mb-3 tracking-widest">Architectes</h4>
                  <p className="text-white font-bold text-xl group-hover:text-accent transition-colors">Herzog & de Meuron</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                  <h4 className="text-accent font-black text-xs uppercase mb-3 tracking-widest">Hauteur Totale</h4>
                  <p className="text-white font-bold text-xl group-hover:text-accent transition-colors">180 Mètres</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="chronologie">
          <SectionHeading subtitle="Historique">Frise de la Controverse</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="space-y-4">
              <TimelineItem 
                year="1950-1960" 
                title="Le Plan d'Urbanisme Directeur" 
                description="Raymond Lopez et Michel Holley défendent l'implantation de tours en périphérie pour 'ceinturer' le centre historique et éviter de toucher au cœur du patrimoine." 
                index={0}
              />
              <TimelineItem 
                year="1973" 
                title="Le Périphérique & Montparnasse" 
                description="Achèvement du périphérique. Inauguration de la Tour Montparnasse, qui traumatisera durablement l'opinion parisienne face à la hauteur." 
                index={1}
              />
              <TimelineItem 
                year="2008" 
                title="L'Impulsion Triangle" 
                description="Bertrand Delanoë et Anne Hidalgo évoquent pour la première fois le projet d'une tour de 180 mètres à la Porte de Versailles." 
                index={2}
              />
              <TimelineItem 
                year="2014-2015" 
                title="Le Bras de Fer Politique" 
                description="Le Conseil de Paris rejette d'abord le projet (5 voix) avant de l'approuver après des modifications et une bataille juridique intense." 
                index={3}
              />
              <TimelineItem 
                year="2020-2021" 
                title="Justice & Chantiers" 
                description="Anticor dépose plainte pour favoritisme. Perquisitions à la mairie. Les travaux commencent malgré une polémique renouvelée." 
                index={4}
              />
              <TimelineItem 
                year="2023" 
                title="Le Nouveau PLUb" 
                description="Adoption du PLU bioclimatique qui limite à nouveau la hauteur des bâtiments à 37 mètres. La fin d'une ère ?" 
                index={5}
              />
            </div>
            <div className="sticky top-40 h-fit">
              <div className="glass rounded-[4rem] p-16 overflow-hidden relative group border border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px]" />
                <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div className="p-5 bg-accent/20 rounded-3xl text-accent">
                    <History className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-display font-black text-white tracking-tighter">Évolution Temporelle</h3>
                </div>
                <div className="space-y-8 relative z-10">
                   <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/box">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">Années 50</span>
                        <Info className="w-4 h-4 text-white/20 group-hover/box:text-accent transition-colors" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 font-display">Capitale Bicéphale</h4>
                      <p className="text-sm text-white/40 leading-relaxed">Une vision d'urbanisme où le centre reste bas et la périphérie se densifie verticalement.</p>
                   </div>
                   <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/box">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-[10px] font-black uppercase tracking-widest">2026</span>
                        <AlertTriangle className="w-4 h-4 text-white/20 group-hover/box:text-accent-purple transition-colors" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 font-display">L'Enjeu des Municipales</h4>
                      <p className="text-sm text-white/40 leading-relaxed">La hauteur reste un sujet politique majeur pour les prochaines élections parisiennes.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actors Grid */}
        <section id="acteurs">
          <SectionHeading subtitle="Les Protagonistes">Cartographie des Acteurs</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ActorCard 
              name="Ville de Paris" 
              role="Soutien Politique (Hidalgo/Missika)" 
              description="Défend une ville capable de rivaliser avec Londres ou Dubaï en offrant des espaces de bureaux ultra-modernes."
              side="pro"
            />
            <ActorCard 
              name="URW (Unibail)" 
              role="Promoteur Économique" 
              description="Propriétaire des Halles et de nombreux centres, veut développer un parc immobilier de prestige à la Porte de Versailles."
              side="pro"
            />
            <ActorCard 
              name="Herzog & de Meuron" 
              role="Architectes" 
              description="Voient dans Triangle une innovation architecturale majeure capable de renouveler l'image de la ville."
              side="pro"
            />
            <ActorCard 
              name="Opposition LR/EELV" 
              role="Opposants Municipaux" 
              description="Convergent pour critiquer un projet inadapté aux besoins réels des Parisiens et trop orienté vers des intérêts privés."
              side="con"
            />
            <ActorCard 
              name="SOS Paris / Monts 14" 
              role="Associations de Riverains" 
              description="Inquiets pour l'ensoleillement et l'impact sur le cadre de vie. Utilisent les leviers juridiques pour bloquer le projet."
              side="con"
            />
            <ActorCard 
              name="UNESCO" 
              role="Observateur Patrimonial" 
              description="Met en garde contre la rupture de l'unité visuelle de Paris, redoutant la fin du paysage Haussmannien."
              side="con"
            />
            <ActorCard 
              name="Anticor" 
              role="Vigie de Transparence" 
              description="A porté l'affaire devant le PNF pour favoritisme, soupçonnant des avantages indus accordés au promoteur."
              side="con"
            />
            <ActorCard 
              name="Tribunal Administratif" 
              role="Arbitre Institutionnel" 
              description="Valide la légalité des décisions prises par la ville. Un rôle technique mais central dans la controverse."
              side="neutral"
            />
            <ActorCard 
              name="Habitants" 
              role="Société Civile" 
              description="Divisés entre désir de modernité et crainte de la densification excessive des transports et des nuisances."
              side="neutral"
            />
          </div>
        </section>

        {/* Comparison Section */}
        <section>
          <SectionHeading subtitle="Confrontation">Les Enjeux du Débat</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[4rem] bg-accent/5 border border-accent/20 p-16 transition-all hover:bg-accent/10"
            >
              <div className="mb-12 w-24 h-24 rounded-[2rem] bg-accent/20 flex items-center justify-center text-accent shadow-[0_0_40px_rgba(0,210,255,0.25)]">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-5xl font-black mb-12 font-display tracking-tighter text-white uppercase">Pro-Tours</h3>
              <ul className="space-y-10">
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Compétitivité Mondiale</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light">Attirer les investissements et offrir des bureaux répondant aux standards internationaux.</p>
                  </div>
                </li>
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Espace Public</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light">La verticalité permet de libérer de l'emprise au sol pour des parcs et des zones piétonnes.</p>
                  </div>
                </li>
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Densification</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light">Éviter l'étalement urbain en concentrant les activités dans des pôles d'activités denses.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[4rem] bg-accent-purple/5 border border-accent-purple/20 p-16 transition-all hover:bg-accent-purple/10"
            >
              <div className="mb-12 w-24 h-24 rounded-[2rem] bg-accent-purple/20 flex items-center justify-center text-accent-purple shadow-[0_0_40px_rgba(157,80,187,0.25)]">
                <Leaf className="w-12 h-12" />
              </div>
              <h3 className="text-5xl font-black mb-12 font-display tracking-tighter text-white uppercase">Anti-Tours</h3>
              <ul className="space-y-10">
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Bureaux Inoccupés</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light"><strong className="text-accent-purple">10% de vacances</strong> en 2026. Pourquoi construire de nouvelles surfaces tertiaires ?</p>
                  </div>
                </li>
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <Scale className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Rupture Identitaire</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light">Violence visuelle vis-à-vis du patrimoine Haussmannien et dégradation du skyline historique.</p>
                  </div>
                </li>
                <li className="flex gap-8">
                  <div className="mt-1 w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight">Bilan Carbone</h4>
                    <p className="text-white/40 leading-relaxed text-lg font-light">Impact écologique massif (béton/acier) et création d'îlots de chaleur urbains localisés.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Cartographie Section - STYLE ADAPTATION */}
        <section id="cartographie">
          <SectionHeading subtitle="Visualisation" id="vis">Perception du Projet</SectionHeading>
          
          <div className="glass rounded-[4rem] p-16 relative overflow-hidden border border-white/10 shadow-3xl">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="grid grid-cols-10 h-full w-full">
                      {Array.from({length: 10}).map((_, i) => <div key={i} className="border-r border-white/20 h-full" />)}
                  </div>
              </div>

              <div className="relative h-[750px] w-full flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                      <div>
                        <h4 className="text-5xl font-black font-display text-white tracking-tighter mb-3">Cartographie des Acteurs</h4>
                        <p className="text-white/30 text-lg font-light">Positionnement stratégique selon l'attitude (Hostile → Favorable) et la perception (Négative → Positive).</p>
                      </div>
                      <div className="flex flex-wrap gap-8 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(0,210,255,0.6)]" /> <span className="text-xs font-black uppercase text-white/50 tracking-widest">Favorables</span></div>
                          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-accent-purple shadow-[0_0_15px_rgba(157,80,187,0.6)]" /> <span className="text-xs font-black uppercase text-white/50 tracking-widest">Opposants</span></div>
                          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-white/40" /> <span className="text-xs font-black uppercase text-white/50 tracking-widest">Neutres</span></div>
                      </div>
                  </div>

                  <div className="flex-1 relative ml-16 mb-16 mr-16">
                      {/* Axes */}
                      <div className="absolute left-0 top-1/2 w-full h-[2px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 -translate-y-1/2" />
                      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-white/5 via-white/20 to-white/5 -translate-x-1/2" />
                      <div className="absolute left-1/2 top-1/2 w-3 h-3 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

                      {/* Axes Labels */}
                      <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase whitespace-nowrap -translate-x-1/2 -translate-y-1/2">Perception du Projet</div>
                      <div className="absolute left-1/2 -bottom-10 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase -translate-x-1/2">Implication dans la controverse</div>

                      {/* Values */}
                      <div className="absolute top-1/2 left-0 -translate-y-6 text-[10px] font-black text-accent-purple tracking-widest uppercase">Faible</div>
                      <div className="absolute top-1/2 right-0 -translate-y-6 text-[10px] font-black text-accent tracking-widest uppercase">Élevée</div>
                      <div className="absolute bottom-0 left-1/2 ml-4 text-[10px] font-black text-accent-purple tracking-widest uppercase">Hostile</div>
                      <div className="absolute top-0 left-1/2 ml-4 text-[10px] font-black text-accent tracking-widest uppercase">Favorable</div>

                      {/* Actor Nodes mapped exactly from the provided diagram */}
                      <MatrixNode x={50} y={15} label="Unibail-Rodamco-Westfield" detail="Promoteur du projet, intérêt financier et stratégique majeur." color="#00d2ff" align="bottom" />
                      <MatrixNode x={75} y={15} label="Cabinet Herzog et de Meuron" detail="Architectes, défendent leur vision esthétique et technique." color="#00d2ff" align="bottom" />
                      <MatrixNode x={90} y={15} label="Mairie de Paris (Anne Hidalgo)" detail="Soutien politique principal, porte le projet face aux critiques." color="#00d2ff" align="bottom" />
                      
                      <MatrixNode x={90} y={45} label="Chambre régionale des comptes" detail="Examine la régularité financière, position institutionnelle élevée." color="#ffffff" align="left" />
                      
                      <MatrixNode x={65} y={65} label="Anticor" detail="Association luttant contre la corruption, très impliquée juridiquement." color="#9d50bb" align="top" />
                      <MatrixNode x={75} y={75} label="Parquet national financier" detail="Mène l'enquête sur les soupçons de favoritisme." color="#ffffff" align="bottom" />
                      
                      <MatrixNode x={90} y={80} label="Collectif contre la Tour Triangle" detail="Opposants historiques et hostiles, multiplient les actions." color="#9d50bb" align="left" />
                      <MatrixNode x={90} y={92} label="Opposition à la mairie (EELV)" detail="Opposition politique, critique l'impact écologique." color="#9d50bb" align="left" />
                      
                      <MatrixNode x={35} y={55} label="Experts urbains et architectes" detail="Avis partagés mais souvent critiques sur l'intégration urbaine." color="#ffffff" align="bottom" />
                      <MatrixNode x={30} y={80} label="UNESCO" detail="Inquiète pour l'impact visuel, mais pouvoir de blocage limité." color="#9d50bb" align="bottom" />
                      <MatrixNode x={10} y={75} label="Philippe Goujon" detail="Maire du 15e, farouchement opposé mais pouvoir décisionnel limité." color="#9d50bb" align="bottom" />
                  </div>
              </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="équipe">
          <SectionHeading subtitle="Auteurs" id="team">L'Équipe BATYM</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Barnabé Jouanard", bio: "Curieux et en recherche d'amélioration constante.", role: "Analyse" },
              { name: "Aurélien Trancart", bio: "Passionné par le contact humain et le travail d'équipe.", role: "Coordination" },
              { name: "Titouan Guerin", bio: "Expert en débats argumentés et dynamiques sociales.", role: "Contenu" },
              { name: "Yohann Hesbert", bio: "Passionné par les progrès technologiques et les sciences.", role: "Recherche" },
              { name: "Martin Hernandez", bio: "Motivé par l'innovation et les défis complexes.", role: "Design" }
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
                <p className="text-xs text-white/40 leading-relaxed font-medium">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
          </motion.div>
        ) : (
          <SourcesPage key="source" onNavigate={navigateTo} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent/5 blur-[150px] rounded-full" />
        <div className="flex flex-col items-center gap-12 relative z-10">
          <div className="flex items-center gap-4 scale-150">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 overflow-hidden shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50" />
              <Building2 className="w-5 h-5 text-accent relative z-10" />
            </div>
            <span className="font-display font-black tracking-tighter text-3xl text-white">BATYM</span>
          </div>
          <div className="flex flex-wrap justify-center gap-16 text-[11px] font-black tracking-[0.4em] uppercase text-white/10">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer uppercase focus:outline-none bg-transparent border-none">Accueil</button>
            <button onClick={() => navigateTo('source')} className="hover:text-white transition-colors cursor-pointer uppercase focus:outline-none bg-transparent border-none">Sources</button>
            <span className="hover:text-white transition-colors cursor-default">ESIEE Paris 2026</span>
            <span className="hover:text-white transition-colors cursor-default">Projet Académique</span>
            <span className="hover:text-white transition-colors cursor-default">Controverse Urbaine</span>
          </div>
          <p className="text-white/20 text-sm max-w-xl mt-12 leading-relaxed">
            Support d'analyse pour le cours de Cartographie de Controverses.<br/>
            © 2026 Équipe BATYM • Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
