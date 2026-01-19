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
import {
  companies as mockCompanies,
  sectors as mockSectors,
  employees as mockEmployees,
  Company,
  Sector,
  Employee,
} from '@/lib/mockData'
import {
  Plus,
  Search,
  MoreHorizontal,
  Building2,
  FileBarChart,
  Pencil,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Users,
  Briefcase,
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
import { cn } from '@/lib/utils'

type ViewState = 'companies' | 'sectors' | 'users'

export default function Companies() {
  const [view, setView] = useState<ViewState>('companies')
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  )
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null)

  // Data
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  // For simplicity, we filter mockSectors and mockEmployees based on selection
  // In a real app, we would fetch these

  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  // Navigation Handlers
  const handleViewSectors = (companyId: string) => {
    setSelectedCompanyId(companyId)
    setView('sectors')
    setSearchTerm('')
  }

  const handleViewUsers = (sectorId: string) => {
    setSelectedSectorId(sectorId)
    setView('users')
    setSearchTerm('')
  }

  const handleBack = () => {
    if (view === 'users') {
      setView('sectors')
      setSelectedSectorId(null)
    } else if (view === 'sectors') {
      setView('companies')
      setSelectedCompanyId(null)
    }
  }

  // Filter Logic
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cnpj.includes(searchTerm),
  )

  const filteredSectors = mockSectors.filter(
    (sector) =>
      sector.companyId === selectedCompanyId &&
      sector.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.sectorId === selectedSectorId &&
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Actions
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

  const openEditModal = (company: Company) => {
    setEditingCompany(company)
    setIsAddModalOpen(true)
  }

  // Breadcrumbs title
  const getTitle = () => {
    if (view === 'sectors') {
      const company = companies.find((c) => c.id === selectedCompanyId)
      return `Setores de ${company?.name}`
    }
    if (view === 'users') {
      const sector = mockSectors.find((s) => s.id === selectedSectorId)
      return `Colaboradores de ${sector?.name}`
    }
    return 'Gestão Hierárquica'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {view !== 'companies' && (
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
            {getTitle()}
          </h1>
        </div>
        {view === 'companies' && (
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
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            {view === 'companies'
              ? 'Empresas Cadastradas'
              : view === 'sectors'
                ? 'Departamentos'
                : 'Usuários'}
          </CardTitle>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={
                  view === 'users' ? 'Buscar usuário...' : 'Buscar...'
                }
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
                {view === 'companies' && (
                  <>
                    <TableHead>Empresa</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </>
                )}
                {view === 'sectors' && (
                  <>
                    <TableHead>Setor</TableHead>
                    <TableHead>Colaboradores</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </>
                )}
                {view === 'users' && (
                  <>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Status</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {view === 'companies' &&
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSectors(company.id)}
                        >
                          Ver Setores <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCompany(company.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              {view === 'sectors' &&
                filteredSectors.map((sector) => (
                  <TableRow key={sector.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        {sector.name}
                      </div>
                    </TableCell>
                    <TableCell>{sector.employeeCount}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUsers(sector.id)}
                      >
                        Ver Usuários <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              {view === 'users' &&
                filteredEmployees.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

              {((view === 'companies' && filteredCompanies.length === 0) ||
                (view === 'sectors' && filteredSectors.length === 0) ||
                (view === 'users' && filteredEmployees.length === 0)) && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
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
        onGenerate={() => {}}
      />
    </div>
  )
}
