import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sector, employees as mockEmployees } from '@/lib/mockData'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  employeeIds: z.array(z.string()).optional(),
})

interface SectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sectorToEdit?: Sector | null
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function SectorDialog({
  open,
  onOpenChange,
  sectorToEdit,
  onSubmit,
}: SectorDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      employeeIds: [],
    },
  })

  useEffect(() => {
    if (sectorToEdit) {
      form.reset({
        name: sectorToEdit.name,
        // Mock pre-selection based on sectorId
        employeeIds: mockEmployees
          .filter((e) => e.sectorId === sectorToEdit.id)
          .map((e) => e.id),
      })
    } else {
      form.reset({
        name: '',
        employeeIds: [],
      })
    }
  }, [sectorToEdit, form, open])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {sectorToEdit ? 'Editar Setor' : 'Adicionar Novo Setor'}
          </DialogTitle>
          <DialogDescription>
            Gerencie os detalhes do setor e seus colaboradores.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Setor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Marketing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeIds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Colaboradores Vinculados
                    </FormLabel>
                  </div>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <div className="space-y-4">
                      {mockEmployees.map((employee) => (
                        <FormField
                          key={employee.id}
                          control={form.control}
                          name="employeeIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={employee.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(employee.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            employee.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== employee.id,
                                            ),
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {employee.name}
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({employee.role})
                                  </span>
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {sectorToEdit ? 'Salvar Alterações' : 'Criar Setor'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
