import { useState } from 'react'
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
import { sectors as mockSectors, Sector } from '@/lib/mockData'
import { Plus, Users, Pencil, Trash2 } from 'lucide-react'
import { SectorDialog } from '@/components/company-admin/SectorDialog'
import { toast } from 'sonner'

export default function Sectors() {
  const [sectors, setSectors] = useState<Sector[]>(mockSectors)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSector, setEditingSector] = useState<Sector | null>(null)

  const handleAddSector = (data: any) => {
    const newSector: Sector = {
      id: `s${Date.now()}`,
      name: data.name,
      companyId: 'c1',
      employeeCount: data.employeeIds?.length || 0,
    }
    setSectors([...sectors, newSector])
    toast.success('Setor criado com sucesso!')
  }

  const handleEditSector = (data: any) => {
    if (!editingSector) return
    const updatedSectors = sectors.map((s) =>
      s.id === editingSector.id
        ? {
            ...s,
            name: data.name,
            employeeCount: data.employeeIds?.length || s.employeeCount,
          }
        : s,
    )
    setSectors(updatedSectors)
    setEditingSector(null)
    toast.success('Setor atualizado com sucesso!')
  }

  const openEditModal = (sector: Sector) => {
    setEditingSector(sector)
    setIsModalOpen(true)
  }

  const handleDeleteSector = (id: string) => {
    setSectors(sectors.filter((s) => s.id !== id))
    toast.success('Setor removido.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Gestão de Setores
        </h1>
        <Button
          onClick={() => {
            setEditingSector(null)
            setIsModalOpen(true)
          }}
        >
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
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(sector)}
                        >
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSector(sector.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SectorDialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) setEditingSector(null)
        }}
        sectorToEdit={editingSector}
        onSubmit={editingSector ? handleEditSector : handleAddSector}
      />
    </div>
  )
}
