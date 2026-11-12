import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Phone, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactPageProps {
  onNavigate: (page: string, param?: string) => void;
}

const AVAILABLE_SERVICES = [
  'Gestão de Redes Sociais',
  'Produção de Conteúdo',
  'Fotografia e Audiovisual',
  'Tráfego Pago',
  'Planejamento de Marketing',
  'Produção de Eventos',
  'Branding e Identidade',
];

const BUDGET_RANGES = [
  'Até R$ 1.500/mês',
  'R$ 1.500 a R$ 3.000/mês',
  'R$ 3.000 a R$ 6.000/mês',
  'R$ 6.000 a R$ 15.000/mês',
  'Acima de R$ 15.000 (Projeto pontual ou evento)',
];

const TIMELINE_OPTIONS = [
  'Imediato (em até 15 dias)',
  'Próximos 30 dias',
  'Próximos 60 a 90 dias',
  'Apenas cotando para o próximo semestre',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { settings, addLead, getWhatsAppUrl } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    services: [] as string[],
    budget: BUDGET_RANGES[1],
    deadline: TIMELINE_OPTIONS[0],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor, preencha os campos obrigatórios (Nome, E-mail e WhatsApp).');
      return;
    }

    if (formData.services.length === 0) {
      setErrorMsg('Por favor, selecione ao menos um serviço desejado.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addLead({
        name: formData.name.trim(),
        company: formData.company.trim() || 'Não informada',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim() || 'Brasil',
        services: formData.services,
        budget: formData.budget,
        deadline: formData.deadline,
        message: formData.message.trim(),
        source: 'Formulário Oficial de Orçamento',
      });
      setSubmitted(true);
    } catch {
      setErrorMsg('Ocorreu um erro ao registrar sua solicitação. Tente novamente ou chame no WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageAfterSubmit = () => {
    const srvText = formData.services.join(', ');
    return `Olá, equipe Astronaut! Acabei de enviar uma proposta pelo site.\n\nNome: ${formData.name}\nEmpresa: ${formData.company || 'N/A'}\nServiços de interesse: ${srvText}\nInvestimento estimado: ${formData.budget}`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-white/10 bg-cosmic-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F5D4]">
              Contato Comercial
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Vamos conversar sobre o seu projeto.
            </h1>
            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Conte-nos sobre os objetivos da sua marca. Preencha o formulário abaixo para receber uma proposta técnica sob medida.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Form */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl cosmic-glass border border-white/15 space-y-6">
                <h3 className="font-display text-2xl font-bold text-white">
                  Canais Diretos
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Prefere uma conversa imediata? Nossa equipe de atendimento está pronta para ouvir seus desafios.
                </p>

                <div className="space-y-4 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00F5D4]/10 text-[#00F5D4] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">WhatsApp Comercial</p>
                      <p className="text-sm font-semibold group-hover:text-[#00F5D4] transition-colors">
                        Iniciar conversa agora
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FF008C]/10 text-[#FF008C] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">E-mail</p>
                      <p className="text-sm font-semibold group-hover:text-white transition-colors">
                        {settings.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Localização</p>
                      <p className="text-sm font-semibold">
                        {settings.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-6 rounded-2xl bg-[#090D25] border border-white/10 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00F5D4]">
                  Compromisso Astronaut:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • Resposta técnica em até 24 horas úteis.<br />
                  • Diagnóstico inicial sem custo.<br />
                  • Sigilo total sobre informações de mercado da sua empresa.
                </p>
              </div>
            </div>

            {/* Right Form Container */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 sm:p-12 rounded-3xl cosmic-glass border border-[#00F5D4]/40 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="font-display text-3xl font-extrabold text-white">
                    Proposta Solicitada com Sucesso!
                  </h3>

                  <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-white">{formData.name}</strong>. Nossa equipe comercial já recebeu os dados do seu projeto e entrará em contato em breve.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={getWhatsAppUrl(getWhatsAppMessageAfterSubmit())}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-[#050611]" />
                      <span>Agilizar no WhatsApp agora</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          city: '',
                          services: [],
                          budget: BUDGET_RANGES[1],
                          deadline: TIMELINE_OPTIONS[0],
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                    >
                      Enviar outro projeto
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 sm:p-10 rounded-3xl cosmic-glass border border-white/15 space-y-8"
                >
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl font-bold text-white">
                      Formulário de Orçamento
                    </h3>
                    <p className="text-xs text-slate-400">
                      Preencha os dados e monte o escopo do seu projeto.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Personal info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Silas Vinicius"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ex: Sua Marca ou Negócio"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nome@empresa.com.br"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Cidade / Estado
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Ex: São Paulo, SP"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>
                  </div>

                  {/* Multiple Service Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#00F5D4] block">
                      Selecione os Serviços Desejados *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {AVAILABLE_SERVICES.map((srv) => {
                        const isSelected = formData.services.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#00F5D4]/10 border-[#00F5D4] text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span>{srv}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#00F5D4] bg-[#00F5D4]'
                                  : 'border-white/30'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#050611]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Faixa de Investimento Estimada
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D25] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00F5D4]"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-[#090D25] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Prazo Desejado para Início
                      </label>
                      <select
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D25] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00F5D4]"
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t} className="bg-[#090D25] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Descrição do Projeto e Objetivos
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Conte um pouco sobre o momento da sua empresa, desafios atuais ou expectativas..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4] leading-relaxed resize-y"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all shadow-xl shadow-[#00F5D4]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Enviando solicitação...</span>
                      ) : (
                        <>
                          <span>Enviar Solicitação de Orçamento</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-3">
                      Ao enviar, você concorda com o contato de nossa equipe comercial.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
