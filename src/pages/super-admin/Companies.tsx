import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { companies as mockCompanies, Company } from '@/lib/mockData'
import {
  Plus,
  Search,
  MoreHorizontal,
  Building2,
  FileBarChart,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CompanyDialog } from '@/components/super-admin/CompanyDialog'
import { ReportDialog } from '@/components/super-admin/ReportDialog'
import { toast } from 'sonner'

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cnpj.includes(searchTerm),
  )

  const handleAddCompany = (data: any) => {
    const newCompany: Company = {
      id: `c${Date.now()}`,
      name: data.name,
      cnpj: data.cnpj,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
      industry: data.industry,
      email: data.email,
    }
    setCompanies([...companies, newCompany])
    toast.success('Empresa cadastrada com sucesso!')
  }

  const handleEditCompany = (data: any) => {
    if (!editingCompany) return
    const updatedCompanies = companies.map((c) =>
      c.id === editingCompany.id
        ? {
            ...c,
            name: data.name,
            cnpj: data.cnpj,
            industry: data.industry,
            email: data.email,
          }
        : c,
    )
    setCompanies(updatedCompanies)
    setEditingCompany(null)
    toast.success('Dados da empresa atualizados.')
  }

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id))
    toast.success('Empresa removida.')
  }

  const handleGenerateReport = (data: any) => {
    console.log('Generating report with:', data)
    toast.success('Relatório gerado com sucesso!', {
      description: 'O download iniciará em instantes.',
    })
  }

  const openEditModal = (company: Company) => {
    setEditingCompany(company)
    setIsAddModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Gestão de Empresas
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsReportModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <FileBarChart className="mr-2 h-4 w-4" /> Relatórios
          </Button>
          <Button
            onClick={() => {
              setEditingCompany(null)
              setIsAddModalOpen(true)
            }}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar Empresa
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Empresas Cadastradas
          </CardTitle>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome ou CNPJ..."
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
                <TableHead>CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhuma empresa encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        {company.name}
                      </div>
                    </TableCell>
                    <TableCell>{company.cnpj}</TableCell>
                    <TableCell>
                      <Badge
                        variant={company.active ? 'default' : 'secondary'}
                        className={
                          company.active
                            ? 'bg-green-600 hover:bg-green-700'
                            : ''
                        }
                      >
                        {company.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>{company.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => openEditModal(company)}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIsReportModalOpen(true)}
                          >
                            <FileBarChart className="mr-2 h-4 w-4" /> Relatório
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCompany(company.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CompanyDialog
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open)
          if (!open) setEditingCompany(null)
        }}
        companyToEdit={editingCompany}
        onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
      />

      <ReportDialog
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        companies={companies}
        onGenerate={handleGenerateReport}
      />
    </div>
  )
}
