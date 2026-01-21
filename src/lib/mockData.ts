export interface Partner {
  id: string
  name: string
  email: string
  active: boolean
  createdAt: string
}

export interface Company {
  id: string
  name: string
  cnpj: string
  active: boolean
  createdAt: string
  industry?: string
  email?: string
  partnerId: string
}

export interface Sector {
  id: string
  name: string
  companyId: string
  employeeCount: number
}

export interface Employee {
  id: string
  name: string
  socialName?: string
  email: string
  cpf: string
  role: string
  isManager: boolean
  sectorId: string
  status: 'active' | 'inactive'
  photoUrl?: string
  // Sociographic Data (Sensitive)
  birthDate?: string
  isLGBT?: boolean
  educationLevel?: string
  pcdType?: string
}

export type ContentScope = 'global' | 'partner' | 'company' | 'sector' | 'user'

export interface Content {
  id: string
  title: string
  type: 'video' | 'article'
  description: string
  thumbnailUrl: string
  duration?: string
  date: string
  category: string
  visible: boolean
  scope: ContentScope
  targetId?: string
}

export interface QuestionnaireHistory {
  id: string
  employeeId: string
  acronym: string
  title: string
  date: string
  year: number
  score: number
  status: 'completed' | 'pending'
}

export interface Report {
  id: string
  partnerId: string
  companyId: string
  year: number
  subcategory: string
  title: string
  url: string
  createdAt: string
}

export const partners: Partner[] = [
  {
    id: 'p1',
    name: 'Health Corp Partners',
    email: 'contact@healthcorp.com',
    active: true,
    createdAt: '2022-11-10',
  },
  {
    id: 'p2',
    name: 'SafeWork Consultoria',
    email: 'admin@safework.com',
    active: true,
    createdAt: '2023-01-05',
  },
]

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'SulAmérica',
    cnpj: '12.345.678/0001-90',
    active: true,
    createdAt: '2023-01-15',
    industry: 'Seguros',
    email: 'contato@sulamerica.com.br',
    partnerId: 'p1',
  },
  {
    id: 'c2',
    name: 'TechSolutions Inc',
    cnpj: '98.765.432/0001-12',
    active: true,
    createdAt: '2023-03-20',
    industry: 'Tecnologia',
    email: 'admin@techsolutions.com',
    partnerId: 'p2',
  },
  {
    id: 'c3',
    name: 'Grupo Varejo Brasil',
    cnpj: '45.123.789/0001-56',
    active: false,
    createdAt: '2023-05-10',
    industry: 'Varejo',
    email: 'rh@grupovarejo.com.br',
    partnerId: 'p1',
  },
]

export const sectors: Sector[] = [
  { id: 's1', name: 'Financeiro', companyId: 'c1', employeeCount: 12 },
  { id: 's2', name: 'Operacional', companyId: 'c1', employeeCount: 45 },
  { id: 's3', name: 'RH', companyId: 'c1', employeeCount: 4 },
  { id: 's4', name: 'Tecnologia', companyId: 'c2', employeeCount: 20 },
  { id: 's5', name: 'Vendas', companyId: 'c2', employeeCount: 15 },
  { id: 's6', name: 'Logística', companyId: 'c3', employeeCount: 30 },
]

export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Carlos Mendes',
    socialName: 'Kaka Mendes',
    email: 'carlos@sulamerica.com.br',
    cpf: '123.456.789-00',
    role: 'Analista',
    isManager: false,
    sectorId: 's1',
    status: 'active',
    photoUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=e1',
    birthDate: '1990-05-15',
    isLGBT: false,
    educationLevel: 'Ensino Superior',
    pcdType: 'Não',
  },
  {
    id: 'e2',
    name: 'Ana Souza',
    socialName: 'Ana',
    email: 'ana@sulamerica.com.br',
    cpf: '234.567.890-11',
    role: 'Gerente',
    isManager: true,
    sectorId: 's2',
    status: 'active',
    photoUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=e2',
    birthDate: '1985-08-20',
    isLGBT: true,
    educationLevel: 'Pós-graduação',
    pcdType: 'Não',
  },
  {
    id: 'e3',
    name: 'Roberto Lima',
    email: 'roberto@sulamerica.com.br',
    cpf: '345.678.901-22',
    role: 'Assistente',
    isManager: false,
    sectorId: 's3',
    status: 'inactive',
    photoUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=e3',
    birthDate: '1995-02-10',
    isLGBT: false,
    educationLevel: 'Ensino Médio',
    pcdType: 'Auditiva',
  },
  {
    id: 'u3', // Match the logged in mock user for testing
    name: 'Carlos Mendes',
    socialName: 'Kaka',
    email: 'carlos@empresa.com',
    cpf: '123.123.123-12',
    role: 'Colaborador',
    isManager: false,
    sectorId: 's1',
    status: 'active',
    photoUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=u3',
    birthDate: '1992-11-25',
    isLGBT: true,
    educationLevel: 'Mestrado',
    pcdType: 'Não',
  },
]

export const libraryContent: Content[] = [
  {
    id: 'l1',
    title: 'Entendendo o Burnout',
    type: 'video',
    description:
      'Um guia completo sobre os sinais e sintomas do esgotamento profissional.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=stressed%20office%20worker&color=blue',
    duration: '12:45',
    date: '2023-10-01',
    category: 'Saúde Mental',
    visible: true,
    scope: 'global',
  },
  {
    id: 'l2',
    title: 'Ergonomia no Home Office',
    type: 'article',
    description:
      'Dicas práticas para ajustar sua cadeira e monitor para evitar dores.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=home%20office%20setup&color=white',
    date: '2023-10-05',
    category: 'Saúde Física',
    visible: true,
    scope: 'global',
  },
  {
    id: 'l3',
    title: 'Técnicas de Respiração',
    type: 'video',
    description:
      'Aprenda a controlar a ansiedade com exercícios simples de respiração.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=meditation%20peaceful&color=blue',
    duration: '05:30',
    date: '2023-10-10',
    category: 'Bem-estar',
    visible: false,
    scope: 'global',
  },
  {
    id: 'l4',
    title: 'Onboarding SulAmérica',
    type: 'video',
    description: 'Boas-vindas aos novos colaboradores da SulAmérica.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=welcome%20team&color=blue',
    duration: '03:15',
    date: '2023-11-01',
    category: 'Institucional',
    visible: true,
    scope: 'company',
    targetId: 'c1',
  },
  {
    id: 'l5',
    title: 'Boas Práticas para Parceiros',
    type: 'article',
    description:
      'Guia exclusivo para empresas parceiras da Health Corp Partners.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=handshake%20business&color=green',
    date: '2023-11-15',
    category: 'Gestão',
    visible: true,
    scope: 'partner',
    targetId: 'p1',
  },
]

export const questions = [
  {
    id: 1,
    text: 'Nas últimas duas semanas, com que frequência você se sentiu cansado ou com pouca energia?',
    options: [
      'Nenhuma vez',
      'Vários dias',
      'Mais da metade dos dias',
      'Quase todos os dias',
    ],
  },
  {
    id: 2,
    text: 'Como você avaliaria seu nível de estresse no trabalho atualmente?',
    options: ['Muito baixo', 'Baixo', 'Moderado', 'Alto', 'Muito alto'],
  },
  {
    id: 3,
    text: 'Você sente que tem suporte suficiente da sua liderança para realizar suas tarefas?',
    options: [
      'Sim, totalmente',
      'Parcialmente',
      'Não, raramente',
      'Não, nunca',
    ],
  },
]

export const questionnaireHistory: QuestionnaireHistory[] = [
  {
    id: 'h1',
    employeeId: 'u3',
    acronym: 'HSE-IT',
    title: 'Indicador de Tensão Laboral',
    date: '2024-01-15',
    year: 2024,
    score: 85,
    status: 'completed',
  },
  {
    id: 'h2',
    employeeId: 'u3',
    acronym: 'PROART',
    title: 'Programa de Avaliação de Riscos',
    date: '2023-11-20',
    year: 2023,
    score: 72,
    status: 'completed',
  },
  {
    id: 'h3',
    employeeId: 'u3',
    acronym: 'BURNOUT-S',
    title: 'Escala de Burnout',
    date: '2023-08-10',
    year: 2023,
    score: 45,
    status: 'completed',
  },
]

export const reports: Report[] = [
  {
    id: 'r1',
    partnerId: 'p1',
    companyId: 'c1',
    year: 2024,
    subcategory: 'Financeiro',
    title: 'Laudo Psicossocial Financeiro Q1',
    url: '#',
    createdAt: '2024-03-01',
  },
  {
    id: 'r2',
    partnerId: 'p1',
    companyId: 'c1',
    year: 2023,
    subcategory: 'Geral',
    title: 'Relatório Anual Consolidado',
    url: '#',
    createdAt: '2023-12-20',
  },
]
