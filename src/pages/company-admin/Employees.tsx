import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Upload, Download, FileSpreadsheet } from 'lucide-react'

export default function Employees() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Colaboradores
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Baixar Modelo
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Importar CSV
          </Button>
        </div>
      </div>

      <Card className="border-dashed border-2 bg-slate-50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 rounded-full bg-blue-100 p-4">
            <FileSpreadsheet className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Importação em Massa</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
            Arraste sua planilha Excel ou CSV aqui para cadastrar ou atualizar
            seus colaboradores.
          </p>
          <Button className="mt-6" variant="secondary">
            Selecionar Arquivo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listagem de Colaboradores</CardTitle>
          <CardDescription>
            Visão geral dos colaboradores cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-center justify-center text-muted-foreground bg-slate-50 rounded border border-dashed">
            Tabela de colaboradores será exibida aqui após importação.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
