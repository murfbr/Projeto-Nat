import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { questions } from '@/lib/mockData'
import { ChevronRight, CheckCircle, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import JSConfetti from 'js-confetti'

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const navigate = useNavigate()

  const question = questions[currentStep]
  const progress = (currentStep / questions.length) * 100
  const isLastQuestion = currentStep === questions.length - 1

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = async () => {
    if (isLastQuestion) {
      const confetti = new JSConfetti()
      confetti.addConfetti({
        emojis: ['🎉', '💙', '✨'],
        confettiNumber: 50,
      })
      toast.success('Respostas salvas com sucesso!', {
        description: 'Obrigado por completar seu check-up mensal.',
      })
      navigate('/employee')
    } else {
      setCurrentStep((curr) => curr + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((curr) => curr - 1)
    }
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

      <Card className="border-t-4 border-t-primary shadow-lg animate-fade-in-up">
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
