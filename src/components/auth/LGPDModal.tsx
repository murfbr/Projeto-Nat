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
            Por favor, leia atentamente nossos termos de uso e política de
            privacidade para continuar.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-md border p-1">
          <ScrollArea
            className="h-[400px] w-full rounded-md bg-slate-50 p-4"
            onScrollCapture={handleScroll}
          >
            <div className="prose prose-sm prose-slate dark:prose-invert">
              <h3>1. Introdução</h3>
              <p>
                Este termo tem como objetivo informar como seus dados serão
                tratados em conformidade com a Lei Geral de Proteção de Dados
                (LGPD). A sua privacidade é nossa prioridade.
              </p>
              <h3>2. Coleta de Dados</h3>
              <p>
                Coletamos dados de saúde mental e física para fins de
                diagnóstico organizacional. Seus dados individuais são
                confidenciais e anonimizados antes de serem apresentados em
                relatórios agregados para a empresa.
              </p>
              <h3>3. Anonimização</h3>
              <p>
                Garantimos que nenhum dado será exibido individualmente para o
                seu empregador. Agrupamentos com menos de 5 pessoas não geram
                relatórios visualizáveis para evitar identificação por
                eliminação.
              </p>
              <h3>4. Finalidade</h3>
              <p>
                Os dados serão utilizados exclusivamente para:
                <ul>
                  <li>Mapeamento de riscos psicossociais.</li>
                  <li>Recomendação de conteúdo educativo.</li>
                  <li>Melhoria do ambiente de trabalho.</li>
                </ul>
              </p>
              <h3>5. Seus Direitos</h3>
              <p>
                Você pode revogar este consentimento a qualquer momento,
                solicitar a exclusão de seus dados ou pedir uma cópia das
                informações armazenadas.
              </p>
              <p>Role até o final para habilitar o botão de aceite...</p>
              <div className="h-32"></div> {/* Spacer to force scroll */}
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
