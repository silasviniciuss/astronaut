import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, ArrowUpRight, Eye, Music, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FESTIVAL_STAGE_IMG } from '../data/initialData';

interface EventsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { events, openLightbox, settings } = useApp();
  const [selectedYear, setSelectedYear] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const years = useMemo(() => {
    const list = Array.from(new Set(events.map(e => e.year))).sort().reverse();
    return ['Todos', ...list];
  }, [events]);

  const categories = ['Todos', 'Festival', 'Show', 'Corporativo'];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (!e.published) return false;
      const matchYear = selectedYear === 'Todos' || e.year === selectedYear;
      const matchCat = selectedCategory === 'Todos' || e.category === selectedCategory;
      return matchYear && matchCat;
    });
  }, [events, selectedYear, selectedCategory]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF008C]">
              Experiências Ao Vivo
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Eventos & Produções de Palco.
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Mais de {settings.stats.eventsProduced} eventos realizados com excelência cenográfica, logística integrada e cobertura cinematográfica.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-slate-400 font-semibold mr-1">Tipo:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FF008C] text-white shadow-md shadow-[#FF008C]/20'
                      : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Year selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold mr-1">Ano:</span>
              {years.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[#00F5D4] text-[#050611] font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className="rounded-3xl overflow-hidden cosmic-glass border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center hover:border-[#FF008C]/40 transition-all duration-300"
            >
              {/* Event Visual Cover */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 group">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <button
                  onClick={() => openLightbox(evt.coverImage)}
                  className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all"
                  aria-label="Ver foto em tela cheia"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {evt.attendance && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                    <Users className="w-3.5 h-3.5 text-[#00F5D4]" />
                    <span>Público: {evt.attendance}</span>
                  </div>
                )}
              </div>

              {/* Event Content Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1 text-[#00F5D4]">
                      <MapPin className="w-3.5 h-3.5" />
                      {evt.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.year}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#FF008C]">{evt.category}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {evt.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {evt.description}
                </p>

                {/* Attractions if applicable */}
                {evt.attractions && evt.attractions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#FF008C]" />
                      Atrações & Artistas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {evt.attractions.map((att, i) => (
                        <span
                          key={i}
                          className="text-xs text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                        >
                          {att}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Rendered */}
                {evt.servicesRendered && evt.servicesRendered.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold tracking-wider text-[#00F5D4]">
                      Serviços Executados pela Astronaut:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {evt.servicesRendered.map((s, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => onNavigate('contato')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer"
                  >
                    <span>Orçar produção para meu evento</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
