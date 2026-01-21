import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  companies as allCompanies,
  partners as allPartners,
  employees as allEmployees,
} from '@/lib/mockData'
import useUserStore from '@/stores/useUserStore'
import {
  Building2,
  Search,
  ChevronRight,
  Briefcase,
  FileBarChart,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function PartnerDashboard() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const currentPartner = allPartners.find((p) => p.id === user?.partnerId)
  const myCompanies = allCompanies.filter(
    (c) => c.partnerId === user?.partnerId,
  )
  const myEmployees = allEmployees // In real app, filter employees belonging to myCompanies

  // Analytics Logic
  const pcdData = [
    {
      name: 'Não',
      value: myEmployees.filter((e) => !e.pcdType || e.pcdType === 'Não')
        .length,
    },
    {
      name: 'Sim',
      value: myEmployees.filter((e) => e.pcdType && e.pcdType !== 'Não').length,
    },
  ]

  const lgbtData = [
    { name: 'LGBT+', value: myEmployees.filter((e) => e.isLGBT).length },
    { name: 'Não LGBT+', value: myEmployees.filter((e) => !e.isLGBT).length },
  ]

  const educationData = myEmployees.reduce(
    (acc, curr) => {
      const level = curr.educationLevel || 'Não informado'
      const existing = acc.find((i) => i.name === level)
      if (existing) existing.value++
      else acc.push({ name: level, value: 1 })
      return acc
    },
    [] as { name: string; value: number }[],
  )

  const filteredCompanies = myCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj.includes(searchTerm),
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Portal do Parceiro
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}. Gerencie sua carteira de empresas e acompanhe
          indicadores.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myCompanies.length}</div>
            <p className="text-xs text-muted-foreground">
              Total de clientes ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              População Total
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myEmployees.length}</div>
            <p className="text-xs text-muted-foreground">
              Colaboradores monitorados
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => navigate('/partner/reports')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Acessar</div>
            <p className="text-xs text-muted-foreground">Central de Laudos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Distribuição PCD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pcdData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pcdData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
              {pcdData.map((d, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  {d.name}: {d.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Diversidade LGBT+</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lgbtData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {lgbtData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index + (2 % COLORS.length)]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
              {lgbtData.map((d, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[i + 2] }}
                  />
                  {d.name}: {d.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Nível de Escolaridade</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] w-full">
              <BarChart
                data={educationData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minhas Empresas</CardTitle>
          <CardDescription>
            Selecione uma empresa para visualizar detalhes, setores e
            colaboradores.
          </CardDescription>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empresas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Indústria</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                      {company.name}
                    </div>
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.cnpj}</TableCell>
                  <TableCell>
                    <Badge
                      variant={company.active ? 'default' : 'secondary'}
                      className={company.active ? 'bg-green-600' : ''}
                    >
                      {company.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/partner/company/${company.id}`)}
                    >
                      Detalhes <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCompanies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhuma empresa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
