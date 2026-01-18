import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { sectors } from '@/lib/mockData'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'

const chartConfig = {
  highRisk: { label: 'Alto Risco', color: 'hsl(var(--destructive))' },
  mediumRisk: { label: 'Risco Moderado', color: 'hsl(var(--chart-4))' },
  lowRisk: { label: 'Baixo Risco', color: 'hsl(var(--chart-2))' },
}

const mockRiskData = [
  { name: 'Alto Risco', value: 15, fill: 'var(--color-highRisk)' },
  { name: 'Risco Moderado', value: 30, fill: 'var(--color-mediumRisk)' },
  { name: 'Baixo Risco', value: 55, fill: 'var(--color-lowRisk)' },
]

const mockBurnoutData = [
  { sector: 'Financeiro', value: 45 },
  { sector: 'Operacional', value: 20 },
  { sector: 'Tecnologia', value: 65 },
]

export default function Analytics() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('all')

  const selectedSector = sectors.find((s) => s.id === selectedSectorId)
  const isProtected = selectedSector ? selectedSector.employeeCount < 5 : false

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Dashboard Analítico
        </h1>
        <Select value={selectedSectorId} onValueChange={setSelectedSectorId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por Setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Setores</SelectItem>
            {sectors
              .filter((s) => s.companyId === 'c1')
              .map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} ({s.employeeCount})
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {isProtected ? (
        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="flex items-center gap-4 py-6">
            <AlertCircle className="h-10 w-10 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Visualização Protegida
              </h3>
              <p className="text-yellow-700">
                Este setor possui menos de 5 colaboradores (
                {selectedSector?.employeeCount}). Para preservar a anonimidade
                dos dados, os relatórios detalhados não estão disponíveis.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Risco Geral</CardTitle>
              <CardDescription>
                Panorama da saúde psicossocial da organização.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={mockRiskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell key="cell-0" fill="var(--color-highRisk)" />
                    <Cell key="cell-1" fill="var(--color-mediumRisk)" />
                    <Cell key="cell-2" fill="var(--color-lowRisk)" />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Índice de Burnout por Setor</CardTitle>
              <CardDescription>
                Comparativo de níveis de exaustão entre departamentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <BarChart
                  data={mockBurnoutData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="sector"
                    type="category"
                    width={100}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
