import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import useUserStore from '@/stores/useUserStore'
import { Check } from 'lucide-react'

export const LGPDModal = () => {
  const { user, acceptTerms } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const [canAccept, setCanAccept] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user?.role === 'employee' && !user.acceptedTerms) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [user])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    // Allow acceptance if scrolled to bottom (within 20px threshold)
    if (scrollHeight - scrollTop - clientHeight < 20) {
      setCanAccept(true)
    }
  }

  const handleAccept = () => {
    acceptTerms()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Termo de Privacidade e Consentimento
          </DialogTitle>
          <DialogDescription>
            Por favor, leia atentamente os termos de privacidade e consentimento
            para o uso da plataforma Conviva Psi.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-md border p-1">
          <ScrollArea
            className="h-[400px] w-full rounded-md bg-slate-50 p-4"
            onScrollCapture={handleScroll}
          >
            <div className="prose prose-sm prose-slate dark:prose-invert">
              <h3>1. Objetivo</h3>
              <p>
                A psicologia organizacional atua na identificação e prevenção de
                riscos psicossociais, visando a construção de um ambiente de
                trabalho mais saudável, seguro e produtivo para todos os
                colaboradores.
              </p>

              <h3>2. Coleta de Dados</h3>
              <p>
                Utilizamos questionários e escalas validadas cientificamente
                para o diagnóstico. As informações coletadas são utilizadas
                exclusivamente para:
              </p>
              <ul>
                <li>Mapeamento de riscos psicossociais e estresse;</li>
                <li>Recomendação de conteúdo educativo e preventivo;</li>
                <li>
                  Embasamento para ações de melhoria do ambiente de trabalho.
                </li>
              </ul>

              <h3>4. Privacidade</h3>
              <p>
                A confidencialidade é absoluta. Seus dados são anonimizados e o
                acesso às respostas individuais é restrito exclusivamente aos
                profissionais de saúde (médicos e psicólogos) da plataforma.
              </p>
              <p>
                <strong>
                  Em nenhuma hipótese seus dados individuais serão
                  compartilhados com seu empregador.
                </strong>{' '}
                A empresa tem acesso apenas a relatórios estatísticos agregados,
                que impedem a identificação pessoal.
              </p>
              <p>
                Nossa atuação segue rigorosamente as diretrizes éticas e legais:
              </p>
              <ul>
                <li>
                  Código Internacional de Ética para Profissionais de Saúde
                  Ocupacional;
                </li>
                <li>Código de Ética Médica (CFM);</li>
                <li>Código de Ética Profissional do Psicólogo (CFP);</li>
                <li>Lei Geral de Proteção de Dados (LGPD).</li>
              </ul>

              <div className="h-32"></div>
              <p className="font-bold text-primary">Fim do documento.</p>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <div className="text-xs text-muted-foreground flex items-center">
            {!canAccept && 'Role até o fim para aceitar.'}
          </div>
          <Button
            onClick={handleAccept}
            disabled={!canAccept}
            className="w-full sm:w-auto"
          >
            {canAccept && <Check className="mr-2 h-4 w-4" />}
            Aceitar e Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
