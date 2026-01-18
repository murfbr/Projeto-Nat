import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { libraryContent, Content } from '@/lib/mockData'
import { PlayCircle, FileText, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Library() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [completedContent, setCompletedContent] = useState<string[]>([])

  const handleContentComplete = (id: string) => {
    if (!completedContent.includes(id)) {
      setCompletedContent([...completedContent, id])
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-primary">
        Biblioteca de Saúde
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {libraryContent.map((item) => {
          const isCompleted = completedContent.includes(item.id)
          return (
            <Card
              key={item.id}
              className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
              onClick={() => setSelectedContent(item)}
            >
              <div className="aspect-video relative w-full bg-slate-200">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  {item.type === 'video' ? (
                    <PlayCircle className="h-12 w-12 text-white" />
                  ) : (
                    <FileText className="h-12 w-12 text-white" />
                  )}
                </div>
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3
                  className={cn(
                    'font-semibold text-lg',
                    isCompleted && 'text-muted-foreground line-through',
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.type === 'video' ? item.duration : 'Artigo'}
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Dialog
        open={!!selectedContent}
        onOpenChange={(open) => !open && setSelectedContent(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black text-white">
          {selectedContent && (
            <div className="flex flex-col">
              {selectedContent.type === 'video' ? (
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                  <PlayCircle className="h-20 w-20 text-white/50 animate-pulse" />
                  <span className="sr-only">Video Player Mock</span>
                </div>
              ) : (
                <div className="h-[400px] overflow-y-auto bg-white text-black p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedContent.title}
                  </h2>
                  <p className="text-lg leading-relaxed">
                    {selectedContent.description}
                  </p>
                  <p className="mt-4">
                    Conteúdo completo do artigo iria aqui...
                  </p>
                  <div className="h-64" />
                </div>
              )}
              <div className="p-4 bg-background text-foreground flex justify-between items-center border-t">
                <div>
                  <h3 className="font-bold">{selectedContent.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedContent.category}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleContentComplete(selectedContent.id)
                    setSelectedContent(null)
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90"
                >
                  Marcar como Concluído
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
