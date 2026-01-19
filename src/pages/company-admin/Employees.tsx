import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import { Upload, Download, FileSpreadsheet, Plus, UserPlus } from 'lucide-react'
import { employees as mockEmployees, Employee, sectors } from '@/lib/mockData'
import { EmployeeDialog } from '@/components/company-admin/EmployeeDialog'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddEmployee = (data: any) => {
    const newEmployee: Employee = {
      id: `e${Date.now()}`,
      name: data.name,
      email: data.email,
      cpf: '000.000.000-00', // Mock CPF
      role: data.role,
      sectorId: data.sectorId,
      status: 'active',
      photoUrl: data.photoUrl,
    }
    setEmployees([...employees, newEmployee])
    toast.success('Colaborador cadastrado com sucesso!')
  }

  const getSectorName = (sectorId: string) => {
    return sectors.find((s) => s.id === sectorId)?.name || 'N/A'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Colaboradores
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Modelo CSV
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Importar CSV
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Adicionar Individual
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Listagem de Colaboradores</CardTitle>
            <CardDescription>
              Gerencie o acesso e dados dos colaboradores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo/Setor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.photoUrl} />
                          <AvatarFallback>
                            {employee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{employee.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {getSectorName(employee.sectorId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === 'active' ? 'default' : 'secondary'
                        }
                        className={
                          employee.status === 'active'
                            ? 'bg-green-600'
                            : 'bg-slate-500'
                        }
                      >
                        {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-slate-50">
          <CardHeader>
            <CardTitle className="text-lg">Importação em Massa</CardTitle>
            <CardDescription>
              Para grandes volumes, utilize a importação via planilha.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="mb-4 rounded-full bg-blue-100 p-4">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center mb-6">
              <p className="text-sm font-medium">Arraste arquivos aqui</p>
              <p className="text-xs text-muted-foreground mt-1">
                CSV ou Excel (Max 10MB)
              </p>
            </div>
            <Button className="w-full" variant="secondary">
              Selecionar Arquivo
            </Button>
          </CardContent>
        </Card>
      </div>

      <EmployeeDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddEmployee}
      />
    </div>
  )
}
