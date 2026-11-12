import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ServicesPageProps {
  initialServiceSlug?: string;
  onNavigate: (page: string, param?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ initialServiceSlug, onNavigate }) => {
  const { services, projects } = useApp();
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(initialServiceSlug || null);

  const activeService = services.find(s => s.slug === selectedServiceSlug) || services[0];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Nossas Especialidades
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Soluções completas para posicionar sua marca.
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Integramos estratégia, criação de conteúdo, audiovisual de cinema, tráfego pago e produção executiva de grandes eventos.
            </p>
          </div>
        </div>
      </section>

      {/* Services List / Deep View */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((srv, index) => {
            const isReversed = index % 2 === 1;
            const relatedProjects = projects.filter(p => p.servicesIncluded?.some(s => s.toLowerCase().includes(srv.title.toLowerCase().substring(0, 8))));

            return (
              <div
                key={srv.id}
                id={srv.slug}
                className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Visual Image */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#090D25] shadow-2xl relative aspect-[16/10] sm:aspect-[4/3] group">
                    <img
                      src={srv.coverImage}
                      alt={srv.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050611] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-xs font-mono font-semibold text-[#00F5D4] bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md">
                        Serviço 0{index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Astronaut Comunicação
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {srv.title}
                    </h2>
                  </div>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* SubModules / Scope */}
                  {srv.subModules && srv.subModules.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00F5D4]">
                        O que está incluído no escopo:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {srv.subModules.map((sub, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onNavigate('contato')}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00F5D4]/15"
                    >
                      <span>Solicitar orçamento para este serviço</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigate('portfolio')}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
                    >
                      <span>Ver cases realizados</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
