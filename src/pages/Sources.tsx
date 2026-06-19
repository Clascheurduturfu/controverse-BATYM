import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Scale, Globe, BookOpen, FileDown, ArrowUpRight } from 'lucide-react';
import { ScrollNavigateButton } from '../components/ScrollNavigateButton';

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

export const Sources = ({ onNavigate }: { onNavigate: (route: string) => void }) => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 pb-40">
      <section>
        <SectionHeading subtitle="Bibliographie">Sources de l'Étude</SectionHeading>
        <p className="text-white/40 text-lg md:text-xl font-light mb-12 max-w-3xl leading-relaxed">
          Consultez les documents officiels, rapports d'urbanisme, études d'opinion publique et publications médiatiques qui ont servi de fondement scientifique à notre cartographie des controverses.
        </p>

        {/* PDF Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Sources Grid - Dossiers détaillés */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {SOURCES_DATA.map((source) => (
              <motion.div
                layout
                key={source.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 text-accent bg-accent/10 px-4 py-2 rounded-xl text-xs font-bold">
                      {source.category === 'presse' && <Newspaper className="w-5 h-5" />}
                      {source.category === 'rapports' && <Scale className="w-5 h-5" />}
                      {source.category === 'web' && <Globe className="w-5 h-5" />}
                      {source.category === 'academique' && <BookOpen className="w-5 h-5" />}
                      <span>
                        {source.category === 'presse' ? 'Presse' : source.category === 'rapports' ? 'Rapports & Décisions' : source.category === 'web' ? 'Web & Encyclopédies' : 'Documents Académiques'}
                      </span>
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
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent group/link cursor-pointer hover:underline"
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
        </motion.div>

        {/* Liste récapitulative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-accent/50" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">Liste complète</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter mb-10">
            Bibliographie
          </h3>

          {(['academique', 'rapports', 'presse', 'web'] as const).map((cat) => {
            const catSources = SOURCES_DATA.filter(s => s.category === cat);
            if (catSources.length === 0) return null;
            const catLabel = cat === 'presse' ? 'Presse' : cat === 'rapports' ? 'Rapports & Décisions officielles' : cat === 'web' ? 'Sources Web' : 'Documents Académiques';
            return (
              <div key={cat} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-accent/70">
                    {cat === 'presse' && <Newspaper className="w-4 h-4" />}
                    {cat === 'rapports' && <Scale className="w-4 h-4" />}
                    {cat === 'web' && <Globe className="w-4 h-4" />}
                    {cat === 'academique' && <BookOpen className="w-4 h-4" />}
                  </div>
                  <h4 className="text-sm font-bold text-white/60 uppercase tracking-wide">{catLabel}</h4>
                </div>
                <ul className="space-y-3 pl-4 border-l border-white/10">
                  {catSources.map((source) => (
                    <li key={source.id} className="text-sm text-white/50 leading-relaxed">
                      <span className="text-white/80 font-semibold">{source.author ? `${source.author}, ` : ''}</span>
                      <span className="text-white/70 italic">« {source.title} »</span>
                      <span className="text-white/40">, {source.publisher}</span>
                      {source.date && <span className="text-white/30">, {source.date}</span>}
                      {source.url && (
                        <>
                          <span className="text-white/30"> — </span>
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent/70 hover:text-accent hover:underline transition-colors">
                            lien <ArrowUpRight className="w-3 h-3 inline" />
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.div>
        <ScrollNavigateButton nextRoute="equipe" label="Scroll pour découvrir l'équipe" onNavigate={onNavigate} />
      </section>
    </main>
  );
};
