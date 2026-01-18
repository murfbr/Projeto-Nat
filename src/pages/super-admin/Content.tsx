import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { libraryContent } from '@/lib/mockData'
import { Plus, PlayCircle, FileText, Upload } from 'lucide-react'

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Biblioteca de Saúde
        </h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Conteúdo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Conteúdo Publicado</CardTitle>
            <CardDescription>
              Gerencie vídeos e artigos disponíveis para os colaboradores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {libraryContent.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-video w-full bg-slate-100 relative">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                      {item.type === 'video' ? (
                        <PlayCircle className="h-12 w-12 text-white" />
                      ) : (
                        <FileText className="h-12 w-12 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        {item.category}
                      </span>
                      <span>
                        {item.type === 'video'
                          ? item.duration
                          : '5 min leitura'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-10 hover:bg-slate-100">
              <div className="mb-4 rounded-full bg-white p-3 shadow-sm">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-1 text-sm font-medium">Arraste arquivos aqui</p>
              <p className="text-xs text-muted-foreground">
                MP4, PDF ou MD (Max 50MB)
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Selecionar Arquivo
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium">Rascunhos Recentes</h4>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-yellow-100">
                    <FileText className="h-4 w-4 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dicas de Nutrição</p>
                    <p className="text-xs text-muted-foreground">
                      Editado há 2h
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
