import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Filter, Eye, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCategory } from '../types';

interface PortfolioPageProps {
  onNavigate: (page: string, param?: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'Todos',
  'Marketing digital',
  'Redes sociais',
  'Produção audiovisual',
  'Fotografia',
  'Eventos',
  'Branding e criação',
  'Tráfego pago',
  'Campanhas',
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const { projects, openLightbox } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Todos');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (!p.published) return false;
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchClient = p.client.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchService = p.servicesIncluded?.some(s => s.toLowerCase().includes(q));

      return matchTitle || matchClient || matchDesc || matchCategory || matchService;
    });
  }, [projects, selectedCategory, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Portfólio & Cases
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Nosso universo de projetos.
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Explore os trabalhos realizados pela Astronaut Comunicação. De campanhas digitais e produção de conteúdo a palcos monumentais e cinematografia.
            </p>
          </div>

          {/* Interactive Search & Filter Bar (Mix7 inspired) */}
          <div className="mt-10 space-y-6">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Buscar por projeto, cliente, categoria ou palavra-chave..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl cosmic-glass border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5D4] focus:ring-1 focus:ring-[#00F5D4] transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Interactive Category Tabs (Button segmented controls with click handlers) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(6);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedProjects.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-display text-2xl font-bold text-white">Nenhum projeto encontrado</p>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Não localizamos projetos correspondentes aos critérios de busca selecionados. Tente usar outras palavras-chave ou categorias.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 text-xs font-bold text-[#050611] bg-[#00F5D4] rounded-lg transition-colors cursor-pointer"
              >
                Ver todos os projetos
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Dynamic Editorial Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                {displayedProjects.map((project, idx) => {
                  // Editorial rhythm alternating visual prominence
                  const isLarge = idx % 5 === 0 || idx % 5 === 3;
                  const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

                  return (
                    <div
                      key={project.id}
                      className={`${colSpan} group rounded-3xl overflow-hidden bg-[#090D25] border border-white/10 hover:border-[#00F5D4]/40 transition-all duration-300 flex flex-col`}
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                          onClick={() => onNavigate('projeto', project.slug)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050611] via-[#050611]/20 to-transparent pointer-events-none" />

                        {/* Top quick actions */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(project.coverImage);
                            }}
                            className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors"
                            aria-label="Ver imagem ampliada"
                            title="Ver imagem ampliada"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Clean unboxed metadata with separators (Zero-Pill rule) */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                          <span className="text-white font-semibold">{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#00F5D4] font-semibold">{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <h3
                            onClick={() => onNavigate('projeto', project.slug)}
                            className="font-display text-2xl font-bold text-white hover:text-[#00F5D4] transition-colors cursor-pointer"
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <button
                            onClick={() => onNavigate('projeto', project.slug)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#00F5D4] hover:text-white transition-colors cursor-pointer"
                          >
                            <span>Acessar case detalhado</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>

                          <span className="text-xs text-slate-500 font-mono">
                            {project.servicesIncluded?.[0] || 'Astronaut'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="pt-8 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Carregar mais projetos ({filteredProjects.length - visibleCount} restantes)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
