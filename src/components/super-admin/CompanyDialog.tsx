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
import { Company } from '@/lib/mockData'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  industry: z.string().min(2, 'Informe o setor de atuação'),
  email: z.string().email('Email inválido'),
})

interface CompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyToEdit?: Company | null
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function CompanyDialog({
  open,
  onOpenChange,
  companyToEdit,
  onSubmit,
}: CompanyDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      industry: '',
      email: '',
    },
  })

  useEffect(() => {
    if (companyToEdit) {
      form.reset({
        name: companyToEdit.name,
        cnpj: companyToEdit.cnpj,
        industry: companyToEdit.industry || '',
        email: companyToEdit.email || '',
      })
    } else {
      form.reset({
        name: '',
        cnpj: '',
        industry: '',
        email: '',
      })
    }
  }, [companyToEdit, form, open])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {companyToEdit ? 'Editar Empresa' : 'Adicionar Nova Empresa'}
          </DialogTitle>
          <DialogDescription>
            {companyToEdit
              ? 'Atualize os dados da empresa abaixo.'
              : 'Preencha os dados para cadastrar uma nova empresa.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Tech Solutions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setor de Atuação</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Varejo, Tecnologia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de Contato</FormLabel>
                  <FormControl>
                    <Input placeholder="contato@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {companyToEdit ? 'Salvar Alterações' : 'Cadastrar Empresa'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
