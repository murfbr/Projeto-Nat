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
import { Partner } from '@/lib/mockData'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
})

interface PartnerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  partnerToEdit?: Partner | null
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function PartnerDialog({
  open,
  onOpenChange,
  partnerToEdit,
  onSubmit,
}: PartnerDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  useEffect(() => {
    if (partnerToEdit) {
      form.reset({
        name: partnerToEdit.name,
        email: partnerToEdit.email,
      })
    } else {
      form.reset({
        name: '',
        email: '',
      })
    }
  }, [partnerToEdit, form, open])

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
            {partnerToEdit ? 'Editar Parceiro' : 'Adicionar Novo Parceiro'}
          </DialogTitle>
          <DialogDescription>
            {partnerToEdit
              ? 'Atualize os dados do parceiro abaixo.'
              : 'Preencha os dados para cadastrar um novo parceiro de negócios.'}
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
                  <FormLabel>Nome do Parceiro</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Health Consultoria" {...field} />
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
                    <Input placeholder="contato@parceiro.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {partnerToEdit ? 'Salvar Alterações' : 'Cadastrar Parceiro'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
