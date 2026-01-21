import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldCheck, UserCircle } from 'lucide-react'
import useUserStore from '@/stores/useUserStore'
import { toast } from 'sonner'
import { differenceInYears, parseISO } from 'date-fns'
import { employees } from '@/lib/mockData'

const formSchema = z.object({
  socialName: z.string().optional(),
  birthDate: z.string().min(10, 'Data de nascimento obrigatória'),
  isLGBT: z.boolean().default(false),
  educationLevel: z.string().min(1, 'Selecione a escolaridade'),
  pcdType: z.string().min(1, 'Selecione uma opção'),
})

export default function MyData() {
  const { user } = useUserStore()

  // Find current employee data to pre-fill
  const currentEmployee = employees.find((e) => e.id === user?.id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialName: currentEmployee?.socialName || '',
      birthDate: currentEmployee?.birthDate || '',
      isLGBT: currentEmployee?.isLGBT || false,
      educationLevel: currentEmployee?.educationLevel || '',
      pcdType: currentEmployee?.pcdType || 'Não',
    },
  })

  // Calculate age for display
  const birthDate = form.watch('birthDate')
  const age = birthDate
    ? differenceInYears(new Date(), parseISO(birthDate))
    : null

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast.success('Perfil sociográfico atualizado', {
      description: 'Seus dados foram salvos com segurança.',
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading text-primary">
          Meus Dados
        </h1>
        <p className="text-muted-foreground">
          Informações sociográficas para personalização da sua jornada de saúde.
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <ShieldCheck className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800 font-semibold">
          Privacidade Garantida
        </AlertTitle>
        <AlertDescription className="text-blue-700">
          Estes dados são <strong>confidenciais</strong> e utilizados
          exclusivamente para fins estatísticos de saúde populacional. Seu
          empregador (RH/Gestão) <strong>não tem acesso</strong> a estas
          informações individuais, apenas o psicólogo parceiro responsável.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            Perfil Sociográfico
          </CardTitle>
          <CardDescription>
            Complete seu perfil para receber recomendações mais assertivas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="socialName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Social</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Como você prefere ser chamado"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional. Será utilizado nas comunicações da plataforma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <div className="flex items-center gap-4">
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        {age !== null && !isNaN(age) && (
                          <div className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 whitespace-nowrap">
                            {age} anos
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escolaridade</FormLabel>
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
                          <SelectItem value="Ensino Fundamental">
                            Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="Ensino Médio">
                            Ensino Médio
                          </SelectItem>
                          <SelectItem value="Ensino Superior">
                            Ensino Superior
                          </SelectItem>
                          <SelectItem value="Pós-graduação">
                            Pós-graduação
                          </SelectItem>
                          <SelectItem value="Mestrado">Mestrado</SelectItem>
                          <SelectItem value="Doutorado">Doutorado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="pcdType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pessoa com Deficiência (PCD)</FormLabel>
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
                          <SelectItem value="Não">Não</SelectItem>
                          <SelectItem value="Física">Física</SelectItem>
                          <SelectItem value="Visual">Visual</SelectItem>
                          <SelectItem value="Auditiva">Auditiva</SelectItem>
                          <SelectItem value="Intelectual">
                            Intelectual
                          </SelectItem>
                          <SelectItem value="Psicossocial">
                            Psicossocial
                          </SelectItem>
                          <SelectItem value="Múltipla">Múltipla</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isLGBT"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Comunidade LGBT+
                        </FormLabel>
                        <FormDescription>
                          Você se identifica como parte da comunidade LGBT+?
                        </FormDescription>
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
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
