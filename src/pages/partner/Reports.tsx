import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { reports as mockReports, companies, Report } from '@/lib/mockData'
import { FileText, Download, Plus, Upload, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import useUserStore from '@/stores/useUserStore'

export default function PartnerReports() {
  const { user } = useUserStore()
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // New Report State
  const [newReport, setNewReport] = useState({
    companyId: '',
    year: new Date().getFullYear().toString(),
    subcategory: '',
    title: '',
  })

  const myCompanies = companies.filter((c) => c.partnerId === user?.partnerId)

  // Group reports by Company -> Year
  const groupedReports = reports
    .filter((r) => r.partnerId === user?.partnerId)
    .reduce(
      (acc, report) => {
        const company = companies.find((c) => c.id === report.companyId)
        const companyName = company?.name || 'Empresa Desconhecida'

        if (!acc[companyName]) acc[companyName] = {}
        if (!acc[companyName][report.year]) acc[companyName][report.year] = []

        acc[companyName][report.year].push(report)
        return acc
      },
      {} as Record<string, Record<number, Report[]>>,
    )

  const handleUpload = () => {
    if (!newReport.companyId || !newReport.subcategory || !newReport.title) {
      toast.error('Preencha todos os campos')
      return
    }

    const report: Report = {
      id: `r${Date.now()}`,
      partnerId: user?.partnerId || '',
      companyId: newReport.companyId,
      year: parseInt(newReport.year),
      subcategory: newReport.subcategory,
      title: newReport.title,
      url: '#',
      createdAt: new Date().toISOString(),
    }

    setReports([...reports, report])
    setIsUploadOpen(false)
    toast.success('Relatório enviado com sucesso')
    setNewReport({
      companyId: '',
      year: new Date().getFullYear().toString(),
      subcategory: '',
      title: '',
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary">
            Central de Relatórios
          </h1>
          <p className="text-muted-foreground">
            Gerencie e compartilhe laudos técnicos com as empresas.
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload de Laudo</DialogTitle>
              <DialogDescription>
                Envie um novo relatório técnico para uma empresa.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Empresa</Label>
                <Select
                  value={newReport.companyId}
                  onValueChange={(val) =>
                    setNewReport({ ...newReport, companyId: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {myCompanies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Ano de Referência</Label>
                  <Input
                    type="number"
                    value={newReport.year}
                    onChange={(e) =>
                      setNewReport({ ...newReport, year: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Subcategoria</Label>
                  <Input
                    placeholder="Ex: Financeiro, Geral"
                    value={newReport.subcategory}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        subcategory: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Título do Documento</Label>
                <Input
                  placeholder="Ex: Laudo Psicossocial 2024"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Arquivo (PDF)</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-sm text-muted-foreground bg-slate-50">
                  <Upload className="h-8 w-8 mb-2 text-slate-400" />
                  <span>Arraste ou clique para selecionar</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpload}>Enviar Relatório</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {Object.entries(groupedReports).map(([companyName, years]) => (
        <Card key={companyName}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {companyName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(years)
              .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
              .map(([year, yearReports]) => (
                <div key={year} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4" />
                    Ano Base: {year}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data de Envio</TableHead>
                        <TableHead className="text-right">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yearReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            {report.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {report.subcategory}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(report.createdAt).toLocaleDateString(
                              'pt-BR',
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4 text-slate-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}

      {Object.keys(groupedReports).length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum relatório encontrado.
        </div>
      )}
    </div>
  )
}
