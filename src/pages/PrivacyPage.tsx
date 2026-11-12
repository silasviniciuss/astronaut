import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <div className="border-b border-white/10 bg-[#090D25]/40 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-300">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4] flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Transparência & LGPD
          </span>
          <h1 className="font-display text-4xl font-extrabold text-white">
            Política de Privacidade
          </h1>
          <p className="text-sm text-slate-400">
            Última atualização: Novembro de 2024
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">1. Introdução</h2>
            <p>
              A <strong>Astronaut Comunicação</strong> valoriza a privacidade e a segurança dos dados pessoais de seus clientes, parceiros e visitantes. Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e protegemos suas informações de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">2. Dados Coletados</h2>
            <p>
              Coletamos informações fornecidas voluntariamente quando você preenche nossos formulários de orçamento ou entra em contato conosco via WhatsApp ou e-mail:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Nome completo e cargo</li>
              <li>Nome da empresa</li>
              <li>Endereço de e-mail corporativo</li>
              <li>Número de telefone e WhatsApp</li>
              <li>Cidade e Estado</li>
              <li>Informações sobre escopo de serviços e orçamento estimado</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">3. Finalidade do Tratamento</h2>
            <p>
              Os dados coletados têm como finalidade exclusiva:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Elaborar propostas comerciais e responder às suas solicitações</li>
              <li>Comunicação sobre o andamento de projetos e atendimento consultivo</li>
              <li>Cumprimento de obrigações legais e contratuais</li>
            </ul>
            <p>
              A Astronaut Comunicação não comercializa, não aluga e não compartilha seus dados pessoais com terceiros para fins de marketing sem sua autorização explícita.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">4. Segurança das Informações</h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, destruição, perda, alteração ou qualquer forma de tratamento ilícito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">5. Seus Direitos</h2>
            <p>
              Você pode a qualquer momento solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a exclusão de seus dados de nossa base de contatos comerciais através do e-mail <strong>contato@astronautcomunicacao.com.br</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
