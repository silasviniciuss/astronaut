import React from 'react';
import { Instagram, Mail, Phone, ArrowUpRight, Shield, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, getWhatsAppUrl } = useApp();

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050611] border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-tight text-white">
                ASTRONAUT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
            </div>
            <p className="text-white text-base font-semibold">
              {settings.slogan}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Transformamos presença digital em posicionamento, conexão e oportunidades reais de negócio para marcas que querem ir além.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#00F5D4] hover:border-[#00F5D4]/40 transition-colors"
                aria-label="WhatsApp Astronaut"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#FF008C] hover:border-[#FF008C]/40 transition-colors"
                aria-label="Instagram Astronaut"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/40 transition-colors"
                aria-label="E-mail Astronaut"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sobre')} className="hover:text-white transition-colors cursor-pointer">
                  Sobre a Astronaut
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Portfólio de Projetos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('eventos')} className="hover:text-white transition-colors cursor-pointer">
                  Eventos Realizados
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cases')} className="hover:text-white transition-colors cursor-pointer">
                  Cases de Sucesso
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('planos')} className="hover:text-white transition-colors cursor-pointer">
                  Planos & Pacotes
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Serviços
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-white transition-colors cursor-pointer">
                  Gestão de Redes Sociais
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-white transition-colors cursor-pointer">
                  Produção de Conteúdo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-white transition-colors cursor-pointer">
                  Fotografia & Audiovisual
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-white transition-colors cursor-pointer">
                  Tráfego Pago
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-white transition-colors cursor-pointer">
                  Produção de Eventos
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contato Comercial
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                <span className="group-hover:underline">WhatsApp Comercial</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF008C] shrink-0 mt-0.5" />
                <span className="truncate">{settings.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <Globe className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('contato')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5D4] hover:text-white transition-colors"
              >
                <span>Solicitar orçamento sem compromisso</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Astronaut Comunicação. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacidade')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center gap-1.5 hover:text-[#00F5D4] transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>Painel Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
