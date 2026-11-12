import React from 'react';
import { Check, ArrowRight, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlanItem } from '../types';

interface PlansPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onNavigate }) => {
  const { plans, getWhatsAppUrl } = useApp();

  const publishedPlans = plans.filter(p => p.published);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
            Planos Comerciais
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Planos de Marketing Digital.
          </h1>
          <p className="text-lg text-slate-300 font-normal leading-relaxed">
            Estruturas previsíveis e recorrentes de criação de conteúdo, gestão de redes e tráfego pago para elevar a frequência e autoridade da sua marca.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {publishedPlans.map((plan) => {
              const isHighlighted = plan.highlighted;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isHighlighted
                      ? 'cosmic-glass border-2 border-[#00F5D4] shadow-2xl shadow-[#00F5D4]/10 md:-translate-y-2'
                      : 'cosmic-glass border border-white/10 hover:border-white/30'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00F5D4] text-[#050611] text-xs font-black uppercase tracking-wider shadow-md">
                      Mais Escolhido
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price section */}
                    <div className="py-4 border-y border-white/10">
                      {plan.hidePrice ? (
                        <div className="py-2">
                          <span className="text-lg font-bold text-[#00F5D4]">
                            Sob Consulta
                          </span>
                          <p className="text-xs text-slate-400">Proposta personalizada</p>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-slate-400 font-medium">R$</span>
                          <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                            {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">/mês</span>
                        </div>
                      )}
                    </div>

                    {/* Features list (Exact deliverables from PRD) */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Entregas inclusas:
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                            <div className="w-4 h-4 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Plan CTA button */}
                  <div className="pt-8 space-y-2">
                    <button
                      onClick={() => onNavigate('contato')}
                      className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#00F5D4] hover:bg-[#00e0c2] text-[#050611] shadow-lg shadow-[#00F5D4]/20'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      <span>{plan.hidePrice ? 'Solicitar proposta' : 'Contratar plano'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={getWhatsAppUrl(`Olá! Tenho interesse no ${plan.name} da Astronaut Comunicação.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#00F5D4]" />
                      <span>Dúvidas? Fale pelo WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-6 rounded-2xl cosmic-glass border border-white/10 max-w-3xl mx-auto text-center space-y-2">
            <p className="text-sm font-semibold text-white">
              Precisa de um plano customizado para franquias ou múltiplos pontos de venda?
            </p>
            <p className="text-xs text-slate-400">
              Desenhamos estruturas exclusivas com equipe dedicada de audiovisual e gestão de tráfego integrada.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contato')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00F5D4] hover:underline cursor-pointer"
              >
                <span>Falar com especialista comercial</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
