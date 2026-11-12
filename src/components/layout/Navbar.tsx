import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useApp();

  const navLinks = [
    { id: 'home', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'cases', label: 'Cases' },
    { id: 'planos', label: 'Planos' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full cosmic-glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer transition-transform duration-200 active:scale-95"
            aria-label="Astronaut Comunicação - Página Inicial"
          >
            <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-[#00F5D4] transition-colors whitespace-nowrap shrink-0">
              ASTRONAUT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] opacity-80 group-hover:opacity-100" />
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00F5D4] to-[#FF008C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            {isAdmin && (
              <button
                onClick={() => handleLinkClick('admin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/30 rounded-lg hover:bg-[#00F5D4]/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Shield className="w-3.5 h-3.5" />
                Painel
              </button>
            )}

            <button
              onClick={() => handleLinkClick('contato')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold text-[#050611] bg-gradient-to-r from-[#00F5D4] via-[#00F5D4] to-[#5425A8]/80 hover:to-[#FF008C] rounded-lg transition-all duration-300 shadow-md shadow-[#00F5D4]/10 hover:shadow-[#00F5D4]/25 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Vamos Conversar</span>
              <ArrowUpRight className="w-4 h-4 text-[#050611]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden cosmic-glass border-b border-white/10 px-6 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-white/10 text-[#00F5D4] font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('contato')}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] rounded-lg transition-colors cursor-pointer"
            >
              <span>Vamos Conversar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleLinkClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Acesso Administrativo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
