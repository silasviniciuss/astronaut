import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Eye, Calendar, User, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectDetailPageProps {
  projectSlug: string;
  onNavigate: (page: string, param?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectSlug, onNavigate }) => {
  const { projects, openLightbox, getWhatsAppUrl } = useApp();

  const project = projects.find(p => p.slug === projectSlug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center space-y-6">
        <h1 className="font-display text-3xl font-bold text-white">Projeto não encontrado</h1>
        <p className="text-slate-400">O projeto solicitado não foi localizado ou foi despublicado.</p>
        <button
          onClick={() => onNavigate('portfolio')}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao portfólio</span>
        </button>
      </div>
    );
  }

  // Related projects
  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.published && (p.category === project.category || p.featured))
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Back button bar */}
      <div className="border-b border-white/10 bg-[#090D25]/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todos os projetos</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="pt-12 pb-16 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Metadata banner (Zero-pill text separators) */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-400">
            <span className="text-white font-bold">{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#00F5D4] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ano {project.year}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Key tags */}
          {project.servicesIncluded && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-2">
                Escopo:
              </span>
              {project.servicesIncluded.map((s, idx) => (
                <span
                  key={idx}
                  className="text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hero Cover Cinematic Container */}
      <section className="py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => openLightbox(project.coverImage)}
            className="relative rounded-3xl overflow-hidden aspect-[16/9] w-full border border-white/10 shadow-2xl group cursor-pointer bg-black/60"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            <div className="absolute top-6 right-6 p-3 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all">
              <Eye className="w-5 h-5" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-300">
              <span>Clique na imagem para ampliar em alta resolução</span>
              <span className="text-[#00F5D4] font-semibold">Fotografia Oficial Astronaut</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Details: Objective, Strategy, Results */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* Objective */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4]" />
                  <span>Objetivo do Projeto</span>
                </h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>

              {/* Strategy */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF008C]" />
                  <span>Estratégia & Execução</span>
                </h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {project.strategy}
                </p>
              </div>

              {/* Gallery Mosaic */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-6 pt-6">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Galeria do Case
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => openLightbox(img)}
                        className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-[#090D25] relative group cursor-pointer shadow-md"
                      >
                        <img
                          src={img}
                          alt={`${project.title} - Registro ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> Ampliar
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Results & CTA Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Results Box */}
              {project.results && project.results.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl cosmic-glass border border-white/15 space-y-6">
                  <h4 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00F5D4]" />
                    <span>Resultados Alcançados</span>
                  </h4>
                  <ul className="space-y-4">
                    {project.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-[#00F5D4] shrink-0 mt-0.5" />
                        <span className="leading-snug">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Commercial Proposal CTA */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#090D25] to-[#5425A8]/40 border border-[#00F5D4]/30 space-y-4">
                <p className="text-xs uppercase font-bold tracking-widest text-[#00F5D4]">
                  Inicie seu projeto
                </p>
                <h4 className="font-display text-xl font-extrabold text-white">
                  Gostou deste case?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Vamos estruturar uma estratégia semelhante para os desafios e metas da sua empresa.
                </p>
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => onNavigate('contato')}
                    className="w-full py-3 text-xs sm:text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Solicitar proposta similar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href={getWhatsAppUrl(`Olá! Vi o case "${project.title}" no site da Astronaut e gostaria de saber mais para a minha empresa.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Conversar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 border-b border-white/10 bg-[#090D25]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Outros projetos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onNavigate('projeto', rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group rounded-2xl overflow-hidden bg-[#090D25] border border-white/10 hover:border-[#00F5D4]/40 transition-all cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D25] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-slate-400">
                      {rel.client} · {rel.category}
                    </p>
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
