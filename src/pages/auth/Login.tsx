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
import useUserStore, { UserRole } from '@/stores/useUserStore'
import { ShieldCheck } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUserStore()

  const handleLogin = (role: UserRole) => {
    login(role)
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
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-heading text-primary">
            Health<span className="text-secondary">&</span>Trust
          </CardTitle>
          <CardDescription>Gestão de Riscos Psicossociais</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Acesso Demonstrativo
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => handleLogin('super_admin')}
          >
            Entrar como Super Admin (Médico)
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleLogin('company_admin')}
          >
            Entrar como RH (Empresa)
          </Button>
          <Button
            variant="ghost"
            className="w-full text-primary hover:text-primary/80 hover:bg-blue-50"
            onClick={() => handleLogin('employee')}
          >
            Entrar como Colaborador
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground">
          <p>Ambiente seguro e em conformidade com a LGPD.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
