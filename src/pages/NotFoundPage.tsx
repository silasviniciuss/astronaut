import React from 'react';
import { Rocket, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center bg-cosmic-grid">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-[#00F5D4] flex items-center justify-center mx-auto shadow-2xl">
          <Rocket className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm text-[#FF008C] font-semibold">
            ERRO 404
          </span>
          <h1 className="font-display text-4xl font-extrabold text-white">
            Órbita Não Encontrada
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            A coordenada espacial que você tentou acessar não existe ou foi transferida para outra dimensão.
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retornar à Base (Início)</span>
        </button>
      </div>
    </div>
  );
};
