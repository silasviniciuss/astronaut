import React from 'react';
import { ArrowUpRight, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers, Users, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERO_ASTRONAUT_IMG } from '../data/initialData';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { projects, services, settings, openLightbox } = useApp();

  const featuredProjects = projects.filter(p => p.published).slice(0, 5);
  const featuredServices = services.filter(s => s.published).slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-white/10 bg-cosmic-grid">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5425A8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00F5D4]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00F5D4] tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Astronaut Comunicação</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] text-balance">
                Sua marca em outro nível.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Transformamos presença digital em posicionamento, conexão e oportunidades de negócio.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all duration-200 shadow-lg shadow-[#00F5D4]/20 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Conheça nossos projetos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contato')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Vamos conversar</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00F5D4]" />
                </button>
              </div>

              {/* Subtitle trust note */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                  <span>Estratégia sob medida</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                  <span>Produção audiovisual 4K</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                  <span>Grandes eventos e festivais</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container (Cinematic Astronaut) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-purple-950/40 bg-[#090D25] group">
                {/* Visual Image with Fallback Container */}
                <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={HERO_ASTRONAUT_IMG}
                    alt="Astronauta flutuando no espaço sideral - Astronaut Comunicação"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Atmospheric gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050611] via-transparent to-transparent opacity-80" />
                  
                  {/* Subtle orbital badge in image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl cosmic-glass border border-white/10">
                    <p className="text-xs uppercase tracking-wider text-[#00F5D4] font-semibold">
                      Agência Full-Service
                    </p>
                    <p className="text-white text-sm font-bold mt-0.5">
                      Criatividade, audiovisual e performance sincronizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUMBERS STRIP (Commercial Verified Metrics) */}
      <section className="py-12 border-b border-white/10 bg-[#090D25]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                +{settings.stats.companiesServed}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">
                empresas atendidas
              </p>
            </div>

            <div className="pt-6 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#00F5D4] tracking-tight tabular-nums">
                +{settings.stats.eventsProduced}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">
                eventos realizados
              </p>
            </div>

            <div className="pt-6 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#FF008C] tracking-tight tabular-nums">
                {settings.stats.yearsExperience} anos
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">
                de experiência no mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO INSTITUCIONAL */}
      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Propósito e Posicionamento
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Criatividade e estratégia para levar marcas mais longe.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A Astronaut Comunicação é uma agência especializada em marketing digital, produção de conteúdo, fotografia, audiovisual e tráfego pago. Nosso propósito é ajudar empresas a fortalecerem suas marcas, se conectarem com o público certo e conquistarem resultados por meio de estratégias personalizadas.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('sobre')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer"
              >
                <span>Conheça a Astronaut</span>
                <ChevronRight className="w-4 h-4 text-[#00F5D4]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO SERVIÇOS (Cards Visuais) */}
      <section className="py-20 lg:py-28 border-b border-white/10 bg-[#090D25]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
                Soluções Integradas
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                O que fazemos pela sua marca
              </h2>
            </div>
            <button
              onClick={() => onNavigate('servicos')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00F5D4] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Ver todos os detalhes dos serviços</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, idx) => (
              <div
                key={service.id}
                onClick={() => onNavigate('servicos', service.slug)}
                className="group relative rounded-2xl cosmic-glass border border-white/10 overflow-hidden hover:border-[#00F5D4]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image thumb */}
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D25] via-[#090D25]/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-mono font-semibold text-slate-400 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white">
                    <span>Saber mais</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00F5D4] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO PORTFÓLIO (Editorial Mix7 Inspired Grid) */}
      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF008C]">
                Cases & Produções
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
                Ideias que ganham vida.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
                Uma seleção de projetos de alto impacto visual, eventos monumentais e campanhas digitais estruturadas pela equipe Astronaut.
              </p>
            </div>

            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-lg shadow-[#00F5D4]/15"
            >
              <span>Explorar todo o portfólio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Bento Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {featuredProjects.map((project, idx) => {
              // Asymmetric bento layout inspired by Mix7 & editorial guidelines
              const isLarge = idx === 0 || idx === 3;
              const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

              return (
                <div
                  key={project.id}
                  onClick={() => onNavigate('projeto', project.slug)}
                  className={`${colSpan} group relative rounded-3xl overflow-hidden bg-[#090D25] border border-white/10 hover:border-[#00F5D4]/50 transition-all duration-300 cursor-pointer flex flex-col`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050611] via-[#050611]/30 to-transparent" />

                    {/* Unboxed clean metadata (Zero-Pill discipline) */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#00F5D4]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#00F5D4]">
                      <span>Ver case completo</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO CHAMADA COMERCIAL */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-[#090D25]/50 to-[#050611]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
            Pronto para decolar?
          </span>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight text-balance">
            Seu próximo grande projeto começa aqui.
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Vamos conversar sobre os objetivos da sua marca e construir uma estratégia para levar seu negócio mais longe.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contato')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all shadow-xl shadow-[#00F5D4]/20 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Solicitar uma proposta</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('planos')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Ver planos de marketing</span>
              <ChevronRight className="w-4 h-4 text-[#00F5D4]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
