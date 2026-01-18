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
import { Button } from '@/components/ui/button'
import { Activity, AlertTriangle, FileBarChart } from 'lucide-react'

export default function Clinical() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Supervisão Clínica
        </h1>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Empresas</SelectItem>
              <SelectItem value="c1">SulAmérica</SelectItem>
              <SelectItem value="c2">TechSolutions</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileBarChart className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">
              Casos de risco severo identificados esta semana
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risco Moderado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <p className="text-xs text-muted-foreground">
              Requerem monitoramento preventivo
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Avaliados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">856</div>
            <p className="text-xs text-muted-foreground">
              Colaboradores ativos na plataforma
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feed de Alertas Clínicos (Anonimizado)</CardTitle>
          <CardDescription>
            Dados semi-anonimizados para análise médica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg border p-4 bg-slate-50"
              >
                <div className="mt-1 rounded-full bg-red-100 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    Padrão de Burnout Identificado
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Setor "Tecnologia" (TechSolutions) apresenta 40% dos
                    colaboradores com sintomas de exaustão emocional severa.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-xs bg-white">
                      ID Grupo: TECH-01
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white">
                      Risco: Alto
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/components/ui/badge'
