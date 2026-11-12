import React from 'react';
import { ArrowRight, CheckCircle, Target, Compass, Rocket, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERO_ASTRONAUT_IMG, BRAND_CAMPAIGN_IMG, AUDIOVISUAL_IMG } from '../data/initialData';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings } = useApp();

  const pillars = [
    {
      icon: Target,
      title: 'Estratégia & Planejamento',
      desc: 'Nada é feito por acaso. Cada publicação, campanha ou enquadramento de vídeo parte de um diagnóstico profundo do negócio e dos concorrentes.',
    },
    {
      icon: Rocket,
      title: 'Criatividade & Direção de Arte',
      desc: 'Design e estética cinematográfica que diferenciam a marca instantaneamente no feed e constroem valor perceptível aos olhos do consumidor.',
    },
    {
      icon: Compass,
      title: 'Performance & Resultados',
      desc: 'Tráfego pago qualificado, otimização constante de funis e métricas reais de conversão para transformar atenção em receita.',
    },
    {
      icon: ShieldCheck,
      title: 'Excelência Operacional',
      desc: 'Capacidade técnica comprovada em mais de 500 grandes eventos e campanhas corporativas com pontualidade e rigor logístico.',
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Institucional
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Quem somos.
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              {settings.slogan}
            </p>
          </div>
        </div>
      </section>

      {/* Main Manifesto */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg">
                  <img
                    src={HERO_ASTRONAUT_IMG}
                    alt="Astronauta Astronaut Comunicação"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 rounded-2xl cosmic-glass border border-white/10 text-center">
                  <p className="font-display text-3xl font-extrabold text-[#00F5D4] tabular-nums">
                    +{settings.stats.companiesServed}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Empresas atendidas</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 rounded-2xl cosmic-glass border border-white/10 text-center">
                  <p className="font-display text-3xl font-extrabold text-[#FF008C] tabular-nums">
                    {settings.stats.yearsExperience} Anos
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">No mercado</p>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg">
                  <img
                    src={AUDIOVISUAL_IMG}
                    alt="Produção e gravação audiovisual"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Official Copy from Presentation */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
              <p className="text-white text-xl sm:text-2xl font-semibold leading-snug">
                “A Astronaut Comunicação é uma agência especializada em marketing digital, gestão de redes sociais, produção de conteúdo, fotografia, audiovisual e tráfego pago. Nosso propósito é ajudar empresas a fortalecer suas marcas, se conectarem com o público certo e conquistarem resultados por meio de estratégias personalizadas.”
              </p>

              <p>
                Acreditamos que cada negócio tem uma história, um diferencial e um potencial único. Por isso, desenvolvemos estratégias que vão além de publicar nas redes sociais: unimos planejamento, criatividade e inteligência de mercado para construir uma presença digital consistente, fortalecer o posicionamento das marcas e ampliar suas oportunidades de crescimento.
              </p>

              <p>
                Nossa atuação integra estratégia, criação e performance, com soluções pensadas para as necessidades e os objetivos de cada cliente.
              </p>

              <div className="pt-2 p-5 rounded-2xl bg-[#090D25] border border-white/15">
                <p className="font-display text-lg font-bold text-white">
                  Na Astronaut, criatividade e estratégia caminham juntas para levar marcas mais longe.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('contato')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00F5D4]/15"
                >
                  <span>Iniciar conversa estratégica</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
                >
                  <span>Ver portfólio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 border-b border-white/10 bg-[#090D25]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Nossos Pilares
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Como construímos o próximo nível para sua marca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-7 rounded-2xl cosmic-glass border border-white/10 space-y-4 hover:border-[#00F5D4]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5D4]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
