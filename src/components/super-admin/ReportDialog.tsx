import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Company, sectors as mockSectors } from '@/lib/mockData'
import { AlertTriangle, Download } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companies: Company[]
  onGenerate: (data: {
    companyId: string
    sectorId: string
    period: string
  }) => void
}

export function ReportDialog({
  open,
  onOpenChange,
  companies,
  onGenerate,
}: ReportDialogProps) {
  const [companyId, setCompanyId] = useState<string>('')
  const [sectorId, setSectorId] = useState<string>('all')
  const [period, setPeriod] = useState<string>('last_30_days')

  const availableSectors = mockSectors.filter((s) => s.companyId === companyId)
  const selectedSector = availableSectors.find((s) => s.id === sectorId)

  // Check anonymity rule (less than 5 employees)
  const isBlocked = selectedSector ? selectedSector.employeeCount < 5 : false

  const handleGenerate = () => {
    if (companyId && !isBlocked) {
      onGenerate({ companyId, sectorId, period })
      onOpenChange(false)
      // Reset defaults
      setCompanyId('')
      setSectorId('all')
      setPeriod('last_30_days')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar Relatório de Riscos</DialogTitle>
          <DialogDescription>
            Configure os parâmetros para gerar o relatório consolidado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Empresa Cliente</Label>
            <Select value={companyId} onValueChange={setCompanyId}>
              <SelectTrigger id="company">
                <SelectValue placeholder="Selecione uma empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">Setor / Departamento</Label>
            <Select
              value={sectorId}
              onValueChange={setSectorId}
              disabled={!companyId}
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder="Todos os setores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Setores</SelectItem>
                {availableSectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {sector.name} ({sector.employeeCount} colab.)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="period">Período de Análise</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_30_days">Últimos 30 dias</SelectItem>
                <SelectItem value="last_90_days">Últimos 3 meses</SelectItem>
                <SelectItem value="last_year">Último ano</SelectItem>
                <SelectItem value="all_time">Todo o período</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isBlocked && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Relatório Indisponível</AlertTitle>
              <AlertDescription>
                Este setor possui menos de 5 colaboradores (
                {selectedSector?.employeeCount}). Para garantir o anonimato
                conforme LGPD, não é possível gerar relatórios isolados.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleGenerate} disabled={!companyId || isBlocked}>
            <Download className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
