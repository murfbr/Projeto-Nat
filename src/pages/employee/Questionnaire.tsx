import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { questions } from '@/lib/mockData'
import {
  ChevronRight,
  CheckCircle,
  ChevronLeft,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const navigate = useNavigate()

  const question = questions[currentStep]
  const progress = (currentStep / questions.length) * 100
  const isLastQuestion = currentStep === questions.length - 1

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = async () => {
    if (isLastQuestion) {
      toast.success('Check-up mensal realizado', {
        description: 'Seus dados foram salvos com segurança.',
      })
      setIsCompleted(true)
    } else {
      setCurrentStep((curr) => curr + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((curr) => curr - 1)
    }
  }

  if (isCompleted) {
    return (
      <div className="mx-auto max-w-lg animate-fade-in py-12">
        <Card className="border-t-4 border-t-green-600 p-6 text-center shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-6 pt-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Avaliação Concluída
              </h2>
              <p className="mx-auto max-w-xs text-base text-muted-foreground">
                Obrigado por contribuir para um ambiente de trabalho mais
                saudável e seguro.
              </p>
            </div>

            <div className="flex w-full items-start gap-3 rounded-lg bg-slate-50 p-4 text-left">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  Dados Protegidos
                </p>
                <p className="text-xs text-muted-foreground">
                  Suas respostas foram anonimizadas e serão utilizadas apenas
                  para fins estatísticos de saúde ocupacional.
                </p>
              </div>
            </div>

            <Button className="w-full" onClick={() => navigate('/employee')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>
            Questão {currentStep + 1} de {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2 transition-all duration-500"
        />
      </div>

      <Card className="animate-fade-in-up border-t-4 border-t-primary shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
            {question.text}
          </h2>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={handleSelect}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${answers[question.id] === option ? 'border-primary bg-blue-50' : 'hover:bg-slate-50'}`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-base font-medium text-slate-700"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="bg-primary hover:bg-primary/90"
          >
            {isLastQuestion ? (
              <>
                Finalizar <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Próxima <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
