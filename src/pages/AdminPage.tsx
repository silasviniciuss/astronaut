import React, { useState } from 'react';
import {
  Shield, Lock, LogOut, LayoutDashboard, FolderKanban, Calendar,
  DollarSign, Briefcase, Users, Settings, Plus, Trash2, Edit2,
  CheckCircle, X, ExternalLink, MessageCircle, Phone, Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Project, EventItem, PlanItem, ServiceItem, LeadStatus, ProjectCategory } from '../types';

interface AdminPageProps {
  onNavigate: (page: string, param?: string) => void;
}

type TabType = 'dashboard' | 'projects' | 'events' | 'plans' | 'services' | 'leads' | 'settings';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    projects, events, services, plans, leads, settings,
    isAdmin, loginAdmin, logoutAdmin,
    addProject, updateProject, deleteProject,
    addEvent, updateEvent, deleteEvent,
    updatePlan, updateService,
    updateLeadStatus, deleteLead,
    updateSettings
  } = useApp();

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Project Modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    client: '',
    category: 'Marketing digital' as ProjectCategory,
    year: '2024',
    description: '',
    objective: '',
    strategy: '',
    coverImage: '',
    galleryInput: '',
    featured: false,
    published: true,
  });

  // Event Modal state
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    city: '',
    year: '2024',
    category: 'Festival' as 'Festival' | 'Show' | 'Corporativo' | 'Esportivo' | 'Geral',
    description: '',
    coverImage: '',
    attractionsInput: '',
    attendance: '',
    published: true,
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // If not logged in, render secure login form
  if (!isAdmin) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAdmin(password);
      if (!success) {
        setAuthError(true);
      }
    };

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-cosmic-grid">
        <div className="max-w-md w-full p-8 rounded-3xl cosmic-glass border border-white/15 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#00F5D4]/10 text-[#00F5D4] flex items-center justify-center mx-auto border border-[#00F5D4]/30">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-black text-white">
              Acesso Administrativo
            </h1>
            <p className="text-xs text-slate-400">
              Painel restrito para gestão de conteúdo da Astronaut Comunicação
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="Digite a chave de administrador"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F5D4]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-semibold">
                Senha incorreta. Use: <code className="bg-red-950 px-1 py-0.5 rounded">astronaut</code> ou <code className="bg-red-950 px-1 py-0.5 rounded">astronaut2026</code>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 text-sm font-bold text-[#050611] bg-[#00F5D4] hover:bg-[#00e0c2] rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00F5D4]/20"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/10">
            <p className="text-[11px] text-slate-500">
              Credenciais demonstrativas: <strong className="text-slate-300">astronaut</strong> ou <strong className="text-slate-300">astronaut2026</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Logged In Dashboard
  const pendingLeadsCount = leads.filter(l => l.status === 'Novo' || l.status === 'Em atendimento').length;

  return (
    <div className="w-full min-h-screen bg-[#050611] text-slate-200">
      {/* Top Admin Sub-bar */}
      <div className="bg-[#090D25] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4]" />
            <span className="font-display font-black text-white text-base">
              Painel Astronaut
            </span>
          </div>
          <span className="text-xs bg-white/10 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
            v2.4
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Ver site público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={logoutAdmin}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === 'leads'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads & Orçamentos</span>
            {pendingLeadsCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeTab === 'leads' ? 'bg-[#050611] text-[#00F5D4]' : 'bg-[#FF008C] text-white'}`}>
                {pendingLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Portfólio ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Eventos ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Planos ({plans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Serviços ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#00F5D4] text-[#050611] shadow-md shadow-[#00F5D4]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Projetos Publicados
                </p>
                <p className="font-display text-3xl font-black text-white tabular-nums">
                  {projects.filter(p => p.published).length} / {projects.length}
                </p>
                <p className="text-xs text-slate-500">No portfólio oficial</p>
              </div>

              <div className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Eventos Registrados
                </p>
                <p className="font-display text-3xl font-black text-[#00F5D4] tabular-nums">
                  {events.length}
                </p>
                <p className="text-xs text-slate-500">Festivais & convenções</p>
              </div>

              <div className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Total de Leads Recebidos
                </p>
                <p className="font-display text-3xl font-black text-[#FF008C] tabular-nums">
                  {leads.length}
                </p>
                <p className="text-xs text-slate-500">{pendingLeadsCount} pendentes de atendimento</p>
              </div>

              <div className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Taxa de Conversão
                </p>
                <p className="font-display text-3xl font-black text-purple-400 tabular-nums">
                  {leads.length > 0
                    ? `${Math.round((leads.filter(l => l.status === 'Convertido').length / leads.length) * 100)}%`
                    : '0%'}
                </p>
                <p className="text-xs text-slate-500">Fechamentos registrados</p>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="p-6 sm:p-8 rounded-3xl cosmic-glass border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Últimos Contatos e Orçamentos Recebidos
                  </h3>
                  <p className="text-xs text-slate-400">
                    Oportunidades recentes geradas pelo site
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-semibold text-[#00F5D4] hover:underline"
                >
                  Ver todos os leads
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs text-slate-400 uppercase">
                      <th className="pb-3 font-semibold">Cliente / Empresa</th>
                      <th className="pb-3 font-semibold">Contato</th>
                      <th className="pb-3 font-semibold">Serviços</th>
                      <th className="pb-3 font-semibold">Orçamento</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3">
                          <p className="font-bold text-white">{l.name}</p>
                          <p className="text-xs text-slate-400">{l.company}</p>
                        </td>
                        <td className="py-3 text-xs">
                          <p className="text-slate-300">{l.email}</p>
                          <p className="text-slate-400">{l.phone}</p>
                        </td>
                        <td className="py-3 text-xs max-w-xs truncate text-slate-300">
                          {l.services.join(', ')}
                        </td>
                        <td className="py-3 text-xs font-mono text-[#00F5D4]">
                          {l.budget}
                        </td>
                        <td className="py-3">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            l.status === 'Novo'
                              ? 'bg-blue-900/60 text-blue-300'
                              : l.status === 'Em atendimento'
                              ? 'bg-yellow-900/60 text-yellow-300'
                              : l.status === 'Convertido'
                              ? 'bg-emerald-900/60 text-emerald-300'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <a
                            href={`https://wa.me/${l.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#00F5D4]/10 text-[#00F5D4] hover:bg-[#00F5D4]/20 text-xs font-semibold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Gerenciamento de Leads & Propostas
                </h2>
                <p className="text-xs text-slate-400">
                  Acompanhe contatos comerciais, altere status e anote observações
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((l) => (
                <div
                  key={l.id}
                  className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-4 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-bold text-white">
                          {l.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                          ({l.company})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Registrado em {l.createdAt} · Origem: {l.source} · Cidade: {l.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status selector */}
                      <select
                        value={l.status}
                        onChange={(e) => updateLeadStatus(l.id, e.target.value as LeadStatus)}
                        className="px-3 py-1.5 rounded-lg bg-[#090D25] border border-white/20 text-xs text-white focus:outline-none focus:border-[#00F5D4]"
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em atendimento">Em atendimento</option>
                        <option value="Proposta enviada">Proposta enviada</option>
                        <option value="Convertido">Convertido</option>
                        <option value="Não convertido">Não convertido</option>
                      </select>

                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${l.name}! Silas da Astronaut Comunicação por aqui. Recebemos seu contato sobre ${l.services.join(', ')}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#00F5D4] text-[#050611] text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Falar no WhatsApp</span>
                      </a>

                      <button
                        onClick={() => deleteLead(l.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        title="Excluir lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-400">Contato:</span>
                      <p className="text-slate-200 mt-0.5">{l.email}</p>
                      <p className="text-slate-200">{l.phone}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400">Serviços Solicitados:</span>
                      <p className="text-[#00F5D4] mt-0.5 font-medium">{l.services.join(' · ')}</p>
                      <p className="text-slate-400 mt-1">Prazo: {l.deadline}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400">Investimento Estimado:</span>
                      <p className="text-white mt-0.5 font-mono">{l.budget}</p>
                    </div>
                  </div>

                  {l.message && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                      <span className="font-bold text-slate-400 block mb-1">Mensagem enviada:</span>
                      {l.message}
                    </div>
                  )}

                  {/* Internal notes editable */}
                  <div className="pt-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                      Anotações Internas da Equipe:
                    </label>
                    <input
                      type="text"
                      defaultValue={l.notes || ''}
                      onBlur={(e) => updateLeadStatus(l.id, l.status, e.target.value)}
                      placeholder="Adicione um lembrete ou status interno sobre a negociação..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-[#00F5D4]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Gerenciamento de Portfólio
                </h2>
                <p className="text-xs text-slate-400">
                  Cadastre novos cases, edite descrições ou altere visibilidade
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject(null);
                  setProjectForm({
                    title: '',
                    client: '',
                    category: 'Marketing digital',
                    year: '2024',
                    description: '',
                    objective: '',
                    strategy: '',
                    coverImage: '/src/assets/images/portfolio_festival_stage_1793921534812.jpg',
                    galleryInput: '',
                    featured: false,
                    published: true,
                  });
                  setIsCreatingProject(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00F5D4] text-[#050611] font-bold text-xs cursor-pointer shadow-md shadow-[#00F5D4]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Novo Projeto</span>
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl cosmic-glass border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-16 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">{proj.title}</h3>
                        {proj.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                            Destaque
                          </span>
                        )}
                        {!proj.published && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-900/60 text-red-300">
                            Oculto
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {proj.client} · {proj.category} · {proj.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateProject(proj.id, { published: !proj.published })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        proj.published
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {proj.published ? 'Publicado' : 'Rascunho'}
                    </button>

                    <button
                      onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        proj.featured
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {proj.featured ? '⭐ Destaque' : 'Normal'}
                    </button>

                    <button
                      onClick={() => {
                        setEditingProject(proj);
                        setProjectForm({
                          title: proj.title,
                          client: proj.client,
                          category: proj.category,
                          year: proj.year,
                          description: proj.description,
                          objective: proj.objective,
                          strategy: proj.strategy,
                          coverImage: proj.coverImage,
                          galleryInput: proj.gallery?.join(', ') || '',
                          featured: proj.featured,
                          published: proj.published,
                        });
                        setIsCreatingProject(true);
                      }}
                      className="p-2 text-slate-400 hover:text-white"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 text-slate-500 hover:text-red-400"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Creating / Editing Project */}
            {isCreatingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl cosmic-glass border border-white/20 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-display text-xl font-bold text-white">
                      {editingProject ? 'Editar Projeto' : 'Novo Projeto no Portfólio'}
                    </h3>
                    <button
                      onClick={() => setIsCreatingProject(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Título do Projeto *</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Cliente *</label>
                        <input
                          type="text"
                          value={projectForm.client}
                          onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Categoria</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090D25] border border-white/15 text-white"
                        >
                          <option value="Marketing digital">Marketing digital</option>
                          <option value="Redes sociais">Redes sociais</option>
                          <option value="Produção audiovisual">Produção audiovisual</option>
                          <option value="Fotografia">Fotografia</option>
                          <option value="Eventos">Eventos</option>
                          <option value="Branding e criação">Branding e criação</option>
                          <option value="Tráfego pago">Tráfego pago</option>
                          <option value="Campanhas">Campanhas</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Ano</label>
                        <input
                          type="text"
                          value={projectForm.year}
                          onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">URL da Imagem de Capa</label>
                      <input
                        type="text"
                        value={projectForm.coverImage}
                        onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Breve Descrição</label>
                      <textarea
                        rows={2}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Objetivo do Case</label>
                      <textarea
                        rows={2}
                        value={projectForm.objective}
                        onChange={(e) => setProjectForm({ ...projectForm, objective: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Estratégia & Execução</label>
                      <textarea
                        rows={2}
                        value={projectForm.strategy}
                        onChange={(e) => setProjectForm({ ...projectForm, strategy: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[#00F5D4]"
                        />
                        <span className="text-white font-semibold">Destacar na Página Inicial</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.published}
                          onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                          className="w-4 h-4 rounded text-[#00F5D4]"
                        />
                        <span className="text-white font-semibold">Publicar Imediatamente</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setIsCreatingProject(false)}
                      className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!projectForm.title || !projectForm.client) return;
                        const slug = projectForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                        if (editingProject) {
                          updateProject(editingProject.id, {
                            ...projectForm,
                            slug: editingProject.slug || slug,
                          });
                        } else {
                          addProject({
                            ...projectForm,
                            slug,
                            gallery: [projectForm.coverImage],
                            order: projects.length + 1,
                            servicesIncluded: [projectForm.category],
                          });
                        }
                        setIsCreatingProject(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#00F5D4] text-[#050611] text-xs font-bold"
                    >
                      {editingProject ? 'Salvar Alterações' : 'Criar Projeto'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EVENTS MANAGEMENT */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Gerenciamento de Eventos
                </h2>
                <p className="text-xs text-slate-400">
                  Cadastre novos festivais, shows e convenções corporativas
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent(null);
                  setEventForm({
                    title: '',
                    city: 'São Paulo, SP',
                    year: '2024',
                    category: 'Festival',
                    description: '',
                    coverImage: '/src/assets/images/portfolio_festival_stage_1793921534812.jpg',
                    attractionsInput: '',
                    attendance: '',
                    published: true,
                  });
                  setIsCreatingEvent(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF008C] text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Novo Evento</span>
              </button>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl cosmic-glass border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-16 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm">{evt.title}</h3>
                      <p className="text-xs text-slate-400">
                        {evt.city} · {evt.year} · {evt.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateEvent(evt.id, { published: !evt.published })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        evt.published
                          ? 'bg-emerald-950/60 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {evt.published ? 'Publicado' : 'Oculto'}
                    </button>

                    <button
                      onClick={() => deleteEvent(evt.id)}
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Event create modal */}
            {isCreatingEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl cosmic-glass border border-white/20 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-lg font-bold text-white">Cadastrar Evento</h3>
                    <button onClick={() => setIsCreatingEvent(false)}><X className="w-5 h-5" /></button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Nome do Evento</label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Cidade / Estado</label>
                        <input
                          type="text"
                          value={eventForm.city}
                          onChange={(e) => setEventForm({ ...eventForm, city: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">Ano</label>
                        <input
                          type="text"
                          value={eventForm.year}
                          onChange={(e) => setEventForm({ ...eventForm, year: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Descrição</label>
                      <textarea
                        rows={2}
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                    <button onClick={() => setIsCreatingEvent(false)} className="text-xs text-slate-400">Cancelar</button>
                    <button
                      onClick={() => {
                        if (!eventForm.title) return;
                        addEvent({
                          ...eventForm,
                          slug: eventForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                          gallery: [eventForm.coverImage],
                          servicesRendered: ['Gestão e produção executiva', 'Produção audiovisual'],
                        });
                        setIsCreatingEvent(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#FF008C] text-white text-xs font-bold"
                    >
                      Salvar Evento
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PLANS MANAGEMENT */}
        {activeTab === 'plans' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Gerenciamento de Planos Comerciais
              </h2>
              <p className="text-xs text-slate-400">
                Altere valores, entregas ou ative a opção "Ocultar preço" para exigir solicitação de proposta
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white">
                      {plan.name}
                    </h3>
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plan.published}
                        onChange={(e) => updatePlan(plan.id, { published: e.target.checked })}
                        className="rounded text-[#00F5D4]"
                      />
                      <span>Ativo</span>
                    </label>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="text-slate-400 font-semibold block">Preço Mensal (R$)</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => updatePlan(plan.id, { price: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={plan.hidePrice || false}
                          onChange={(e) => updatePlan(plan.id, { hidePrice: e.target.checked })}
                          className="rounded text-[#00F5D4]"
                        />
                        <span>Ocultar Preço (Exibir "Sob Consulta")</span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <label className="text-slate-400 font-semibold block mb-1">Entregas do Pacote</label>
                      <ul className="space-y-1.5 text-slate-300">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Gerenciamento de Serviços
              </h2>
              <p className="text-xs text-slate-400">
                Ajuste os textos de apresentação dos 6 serviços da Astronaut
              </p>
            </div>

            <div className="space-y-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl cosmic-glass border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{srv.title}</h3>
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={srv.published}
                        onChange={(e) => updateService(srv.id, { published: e.target.checked })}
                        className="rounded text-[#00F5D4]"
                      />
                      <span>Visível</span>
                    </label>
                  </div>

                  <textarea
                    rows={2}
                    defaultValue={srv.description}
                    onBlur={(e) => updateService(srv.id, { description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS MANAGEMENT */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Configurações da Agência
              </h2>
              <p className="text-xs text-slate-400">
                Altere números comerciais, dados de contato e slogan
              </p>
            </div>

            <div className="p-6 rounded-2xl cosmic-glass border border-white/10 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">WhatsApp Comercial (com DDI e DDD)</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  placeholder="5511999998888"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">E-mail Comercial</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Instagram</label>
                <input
                  type="text"
                  value={settingsForm.instagram}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="font-bold text-[#00F5D4] mb-3 uppercase tracking-wider text-[11px]">
                  Estatísticas Comerciais Oficiais:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Empresas Atendidas</label>
                    <input
                      type="number"
                      value={settingsForm.stats.companiesServed}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        stats: { ...settingsForm.stats, companiesServed: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Eventos Produzidos</label>
                    <input
                      type="number"
                      value={settingsForm.stats.eventsProduced}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        stats: { ...settingsForm.stats, eventsProduced: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Anos de Mercado</label>
                    <input
                      type="number"
                      value={settingsForm.stats.yearsExperience}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        stats: { ...settingsForm.stats, yearsExperience: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    updateSettings(settingsForm);
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 3000);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00F5D4] text-[#050611] font-bold text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Configurações</span>
                </button>

                {settingsSaved && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Alterações salvas com sucesso!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
