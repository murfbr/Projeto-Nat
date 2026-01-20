import { useEffect, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Content,
  companies,
  partners,
  sectors as allSectors,
  employees as allEmployees,
} from '@/lib/mockData'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  title: z.string().min(2, 'Título obrigatório'),
  type: z.enum(['video', 'article']),
  description: z.string().min(10, 'Descrição deve ser mais detalhada'),
  category: z.string().min(2, 'Categoria obrigatória'),
  visible: z.boolean().default(true),
  scope: z.enum(['global', 'partner', 'company', 'sector', 'user']),
  targetId: z.string().optional(),
})

interface ContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentToEdit?: Content | null
  onSubmit: (data: any) => void
}

export function ContentDialog({
  open,
  onOpenChange,
  contentToEdit,
  onSubmit,
}: ContentDialogProps) {
  // Auxiliary state for hierarchical selection
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  const [selectedSectorId, setSelectedSectorId] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'article',
      description: '',
      category: '',
      visible: true,
      scope: 'global',
      targetId: '',
    },
  })

  // Watch scope to conditional render
  const scope = form.watch('scope')

  // Derived lists based on selection
  const filteredSectors = allSectors.filter(
    (s) => s.companyId === selectedCompanyId,
  )
  const filteredEmployees = allEmployees.filter(
    (e) => e.sectorId === selectedSectorId,
  )

  useEffect(() => {
    if (contentToEdit) {
      form.reset({
        title: contentToEdit.title,
        type: contentToEdit.type,
        description: contentToEdit.description,
        category: contentToEdit.category,
        visible: contentToEdit.visible,
        scope: contentToEdit.scope,
        targetId: contentToEdit.targetId || '',
      })
      // Pre-fill hierarchical state if editing (simplified for mock)
      // In a real app we'd fetch parents of targetId
    } else {
      form.reset({
        title: '',
        type: 'article',
        description: '',
        category: '',
        visible: true,
        scope: 'global',
        targetId: '',
      })
      setSelectedCompanyId('')
      setSelectedSectorId('')
    }
  }, [contentToEdit, form, open])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // If global, clear targetId
    if (values.scope === 'global') {
      values.targetId = undefined
    }
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {contentToEdit ? 'Editar Conteúdo' : 'Novo Conteúdo'}
          </DialogTitle>
          <DialogDescription>
            Gerencie as informações e a segmentação do material.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Gestão de Estresse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Mídia</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="article">Artigo</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Saúde Mental" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="scope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcance da Publicação</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val)
                      // Reset hierarchy when scope changes
                      setSelectedCompanyId('')
                      setSelectedSectorId('')
                      form.setValue('targetId', '')
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o alcance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="global">Global (Todos)</SelectItem>
                      <SelectItem value="partner">
                        Parceiro Específico
                      </SelectItem>
                      <SelectItem value="company">
                        Empresa Específica
                      </SelectItem>
                      <SelectItem value="sector">Setor Específico</SelectItem>
                      <SelectItem value="user">Usuário Específico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic Hierarchical Selection */}
            {scope !== 'global' && (
              <div className="space-y-4 rounded-md border p-4 bg-slate-50">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Definição de Público Alvo
                </h4>

                {/* Partner Selection - Visible if scope is partner */}
                {scope === 'partner' && (
                  <FormField
                    control={form.control}
                    name="targetId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o Parceiro</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o parceiro" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {partners.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Company Selection - Visible if not global/partner */}
                {(scope === 'company' ||
                  scope === 'sector' ||
                  scope === 'user') && (
                  <FormItem>
                    <FormLabel>Selecione a Empresa</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        setSelectedCompanyId(val)
                        if (scope === 'company') {
                          form.setValue('targetId', val)
                        }
                      }}
                      value={selectedCompanyId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}

                {/* Sector Selection - Visible if sector or user scope */}
                {(scope === 'sector' || scope === 'user') && (
                  <FormItem>
                    <FormLabel>Selecione o Setor</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        setSelectedSectorId(val)
                        if (scope === 'sector') {
                          form.setValue('targetId', val)
                        }
                      }}
                      value={selectedSectorId}
                      disabled={!selectedCompanyId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredSectors.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}

                {/* User Selection - Visible only if user scope */}
                {scope === 'user' && (
                  <FormField
                    control={form.control}
                    name="targetId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o Usuário</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedSectorId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o usuário" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredEmployees.map((e) => (
                              <SelectItem key={e.id} value={e.id}>
                                {e.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve resumo do conteúdo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                  <div className="space-y-0.5">
                    <FormLabel>Disponível</FormLabel>
                    <div className="text-[0.8rem] text-muted-foreground">
                      Publicar conteúdo imediatamente na biblioteca.
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Salvar Conteúdo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
