import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { sectors } from '@/lib/mockData'
import { Plus, Users } from 'lucide-react'

export default function Sectors() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Gestão de Setores
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Setor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departamentos e Setores</CardTitle>
          <CardDescription>
            Gerencie a estrutura organizacional para melhor segmentação dos
            relatórios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Setor</TableHead>
                <TableHead>Colaboradores</TableHead>
                <TableHead>Status de Visualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectors
                .filter((s) => s.companyId === 'c1')
                .map((sector) => (
                  <TableRow key={sector.id}>
                    <TableCell className="font-medium">{sector.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {sector.employeeCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sector.employeeCount < 5 ? (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          Protegido (Dados Insuficientes)
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Visível
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
