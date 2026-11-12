import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppFloat: React.FC = () => {
  const { getWhatsAppUrl } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Friendly, quiet tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#090D25]/95 border border-[#00F5D4]/30 shadow-xl backdrop-blur-md text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
          <span>Fale agora com a equipe Astronaut</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white p-0.5 ml-1"
            aria-label="Fechar dica"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl('Olá, equipe Astronaut! Gostaria de falar sobre um projeto para minha empresa.')}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00F5D4] to-[#00b49c] hover:scale-105 active:scale-95 text-[#050611] flex items-center justify-center shadow-lg shadow-[#00F5D4]/30 transition-transform duration-200"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-[#050611] text-[#050611]" />
      </a>
    </div>
  );
};
