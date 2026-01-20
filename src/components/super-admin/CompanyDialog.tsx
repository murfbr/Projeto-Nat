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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Company, partners } from '@/lib/mockData'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  industry: z.string().min(2, 'Informe o setor de atuação'),
  email: z.string().email('Email inválido'),
  partnerId: z.string().min(1, 'Selecione um parceiro responsável'),
})

interface CompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyToEdit?: Company | null
  onSubmit: (data: z.infer<typeof formSchema>) => void
  defaultPartnerId?: string | null
}

export function CompanyDialog({
  open,
  onOpenChange,
  companyToEdit,
  onSubmit,
  defaultPartnerId,
}: CompanyDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      industry: '',
      email: '',
      partnerId: '',
    },
  })

  useEffect(() => {
    if (companyToEdit) {
      form.reset({
        name: companyToEdit.name,
        cnpj: companyToEdit.cnpj,
        industry: companyToEdit.industry || '',
        email: companyToEdit.email || '',
        partnerId: companyToEdit.partnerId || defaultPartnerId || '',
      })
    } else {
      form.reset({
        name: '',
        cnpj: '',
        industry: '',
        email: '',
        partnerId: defaultPartnerId || '',
      })
    }
  }, [companyToEdit, form, open, defaultPartnerId])

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
              name="partnerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parceiro Responsável</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={!!defaultPartnerId && !companyToEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um parceiro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {partners.map((partner) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
