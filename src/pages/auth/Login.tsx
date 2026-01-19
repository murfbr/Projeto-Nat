import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserStore, { UserRole } from '@/stores/useUserStore'
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUserStore()
  const [loading, setLoading] = useState(false)

  const handleLogin = (role: UserRole) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      login(role)
      setLoading(false)
      switch (role) {
        case 'super_admin':
          navigate('/super-admin')
          break
        case 'company_admin':
          navigate('/company-admin')
          break
        case 'employee':
          navigate('/employee')
          break
      }
      toast.success(`Bem-vindo, ${role.replace('_', ' ')}`)
    }, 800)
  }

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.info('Utilize os botões de "Acesso Rápido (Dev)" abaixo para entrar.')
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column - Image & Branding */}
      <div className="hidden bg-slate-900 lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-slate-900/90 mix-blend-multiply" />
        <img
          src="https://img.usecurling.com/p/1200/1200?q=medical%20research%20technology&color=blue"
          alt="Medical Research"
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-white" />
            <span className="font-heading text-2xl font-bold">
              Psi<span className="text-secondary">Med</span>
            </span>
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-4xl font-bold leading-tight">
              Transformando dados em <br />
              <span className="text-secondary">bem-estar corporativo</span>.
            </h2>
            <p className="max-w-md text-lg text-slate-300">
              Plataforma completa para gestão de riscos psicossociais e saúde
              ocupacional com total conformidade LGPD.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>© 2024 Psi Med Inc.</span>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-heading text-slate-900">
                Acesse sua conta
              </CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o painel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFakeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Corporativo</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="nome@empresa.com"
                      className="pl-9"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="text-xs text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit">
                  Entrar na Plataforma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t bg-slate-50/50 p-6">
              <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Acesso Rápido (Ambiente Dev)
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 flex flex-col gap-1 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  onClick={() => handleLogin('super_admin')}
                  disabled={loading}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Super Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 flex flex-col gap-1 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  onClick={() => handleLogin('company_admin')}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4 8 4v14" />
                    <path d="M17 21v-8.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5V21" />
                  </svg>
                  Empresa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 flex flex-col gap-1 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  onClick={() => handleLogin('employee')}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Colaborador
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
