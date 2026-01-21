import { useParams, Link } from 'react-router-dom'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  companies,
  sectors as allSectors,
  employees as allEmployees,
} from '@/lib/mockData'
import useUserStore from '@/stores/useUserStore'
import { ArrowLeft, Briefcase, Star, Info } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function PartnerSectorView() {
  const { companyId, sectorId } = useParams()
  const { user } = useUserStore()

  const company = companies.find((c) => c.id === companyId)
  const sector = allSectors.find((s) => s.id === sectorId)

  // Security Check
  if (
    !company ||
    company.partnerId !== user?.partnerId ||
    !sector ||
    sector.companyId !== companyId
  ) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-destructive">Acesso Negado</h2>
        <p className="text-muted-foreground">
          Você não tem permissão para visualizar este setor.
        </p>
        <Button asChild variant="outline">
          <Link to="/partner">Voltar ao Painel</Link>
        </Button>
      </div>
    )
  }

  const employees = allEmployees.filter((e) => e.sectorId === sector.id)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/partner">Minhas Empresas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/partner/company/${companyId}`}>{company.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{sector.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/partner/company/${companyId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-50">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
                {sector.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Departamento de {company.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Colaboradores do Setor</CardTitle>
          <CardDescription>
            Listagem de todos os colaboradores vinculados ao setor{' '}
            <strong>{sector.name}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Nome Social</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dados Sociográficos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className={employee.isManager ? 'bg-yellow-50/50' : ''}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {employee.isManager && (
                        <div
                          className="w-1 h-8 bg-yellow-400 rounded-full mr-1"
                          title="Gestor"
                        />
                      )}
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.photoUrl} />
                        <AvatarFallback>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          {employee.name}
                          {employee.isManager && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              </TooltipTrigger>
                              <TooltipContent>Gestor</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell className="text-muted-foreground italic">
                    {employee.socialName || '-'}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Info className="h-4 w-4" /> Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dados Sociográficos</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Nascimento
                              </p>
                              <p>
                                {employee.birthDate
                                  ? new Date(
                                      employee.birthDate,
                                    ).toLocaleDateString('pt-BR')
                                  : 'Não informado'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Escolaridade
                              </p>
                              <p>
                                {employee.educationLevel || 'Não informado'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                LGBT+
                              </p>
                              <p>{employee.isLGBT ? 'Sim' : 'Não'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                PCD
                              </p>
                              <p>{employee.pcdType || 'Não'}</p>
                            </div>
                          </div>
                          <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700">
                            Estes dados são visíveis apenas para você (Parceiro)
                            e para o Colaborador.
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhum colaborador encontrado neste setor.
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
