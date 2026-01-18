export interface Company {
  id: string
  name: string
  cnpj: string
  active: boolean
  createdAt: string
  industry?: string
  email?: string
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
  email: string
  cpf: string
  sectorId: string
  status: 'active' | 'inactive'
}

export interface Content {
  id: string
  title: string
  type: 'video' | 'article'
  description: string
  thumbnailUrl: string
  duration?: string
  date: string
  category: string
}

export interface AnalyticsData {
  riskFactor: string
  percentage: number
  color: string
}

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'SulAmérica',
    cnpj: '12.345.678/0001-90',
    active: true,
    createdAt: '2023-01-15',
    industry: 'Seguros',
    email: 'contato@sulamerica.com.br',
  },
  {
    id: 'c2',
    name: 'TechSolutions Inc',
    cnpj: '98.765.432/0001-12',
    active: true,
    createdAt: '2023-03-20',
    industry: 'Tecnologia',
    email: 'admin@techsolutions.com',
  },
  {
    id: 'c3',
    name: 'Grupo Varejo Brasil',
    cnpj: '45.123.789/0001-56',
    active: false,
    createdAt: '2023-05-10',
    industry: 'Varejo',
    email: 'rh@grupovarejo.com.br',
  },
]

export const sectors: Sector[] = [
  { id: 's1', name: 'Financeiro', companyId: 'c1', employeeCount: 12 },
  { id: 's2', name: 'Operacional', companyId: 'c1', employeeCount: 45 },
  { id: 's3', name: 'RH', companyId: 'c1', employeeCount: 4 }, // < 5 for anon guard test
  { id: 's4', name: 'Tecnologia', companyId: 'c2', employeeCount: 20 },
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
