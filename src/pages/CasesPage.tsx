import React from 'react';
import { ArrowUpRight, TrendingUp, CheckCircle, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CasesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CasesPage: React.FC<CasesPageProps> = ({ onNavigate }) => {
  const { projects } = useApp();

  // Projects that have explicit results
  const casesWithResults = projects.filter(p => p.results && p.results.length > 0 && p.published);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Performance & Impacto
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Cases de Sucesso.
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Casos documentados em que criatividade, produção audiovisual de ponta e tráfego estratégico geraram resultados comerciais expressivos para nossos parceiros.
            </p>
          </div>
        </div>
      </section>

      {/* Cases Breakdown */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {casesWithResults.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-12 rounded-3xl cosmic-glass border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Media Preview */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 relative group">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">{item.client}</span>
                  <span className="text-[#00F5D4]">{item.category}</span>
                </div>
              </div>

              {/* Case Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                    Case #{idx + 1}
                  </span>
                  <h2 className="font-display text-3xl font-bold text-white">
                    {item.title}
                  </h2>
                </div>

                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <div>
                    <span className="font-bold text-white">Desafio & Objetivo: </span>
                    {item.objective}
                  </div>
                  <div>
                    <span className="font-bold text-white">Estratégia: </span>
                    {item.strategy}
                  </div>
                </div>

                {/* Measurable Results */}
                <div className="pt-2 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00F5D4] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    Resultados Oficiais:
                  </h4>
                  <ul className="space-y-2">
                    {item.results?.map((res, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => onNavigate('projeto', item.slug)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer"
                  >
                    <span>Ver detalhes completos do case</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
