export type ProjectCategory = 
  | 'Todos'
  | 'Marketing digital'
  | 'Redes sociais'
  | 'Produção audiovisual'
  | 'Fotografia'
  | 'Eventos'
  | 'Branding e criação'
  | 'Tráfego pago'
  | 'Campanhas';

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: ProjectCategory;
  year: string;
  description: string;
  objective: string;
  strategy: string;
  results?: string[];
  coverImage: string;
  gallery: string[];
  videos?: string[];
  featured: boolean;
  published: boolean;
  order: number;
  servicesIncluded: string[];
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  city: string;
  year: string;
  category: 'Festival' | 'Show' | 'Corporativo' | 'Esportivo' | 'Geral';
  description: string;
  coverImage: string;
  gallery: string[];
  videos?: string[];
  attractions?: string[];
  servicesRendered: string[];
  published: boolean;
  attendance?: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  subModules?: string[];
  deliverables?: string[];
  order: number;
  published: boolean;
}

export interface PlanItem {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  description: string;
  highlighted?: boolean;
  hidePrice?: boolean;
  published: boolean;
  order: number;
}

export type LeadStatus = 'Novo' | 'Em atendimento' | 'Proposta enviada' | 'Convertido' | 'Não convertido';

export interface LeadItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  services: string[];
  budget: string;
  deadline: string;
  message: string;
  status: LeadStatus;
  notes?: string;
  source: string;
  createdAt: string;
}

export interface AgencySettings {
  brandName: string;
  slogan: string;
  institutionalText: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
  stats: {
    companiesServed: number;
    eventsProduced: number;
    yearsExperience: number;
  };
}
