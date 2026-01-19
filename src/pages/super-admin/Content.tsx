import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { libraryContent, Content as ContentType } from '@/lib/mockData'
import {
  Plus,
  PlayCircle,
  FileText,
  Upload,
  Eye,
  EyeOff,
  Trash2,
  Edit,
} from 'lucide-react'
import { ContentDialog } from '@/components/super-admin/ContentDialog'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function Content() {
  const [contents, setContents] = useState<ContentType[]>(libraryContent)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentType | null>(null)

  const handleSaveContent = (data: any) => {
    if (editingContent) {
      const updated = contents.map((c) =>
        c.id === editingContent.id
          ? { ...c, ...data, thumbnailUrl: c.thumbnailUrl } // Keep existing thumb
          : c,
      )
      setContents(updated)
      setEditingContent(null)
      toast.success('Conteúdo atualizado!')
    } else {
      const newContent: ContentType = {
        id: `l${Date.now()}`,
        ...data,
        thumbnailUrl: `https://img.usecurling.com/p/400/225?q=${data.category}&color=blue`,
        date: new Date().toISOString().split('T')[0],
      }
      setContents([...contents, newContent])
      toast.success('Conteúdo criado!')
    }
  }

  const handleDelete = (id: string) => {
    setContents(contents.filter((c) => c.id !== id))
    toast.success('Conteúdo removido.')
  }

  const toggleVisibility = (id: string) => {
    setContents(
      contents.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
    )
    toast.info('Visibilidade alterada.')
  }

  const openEdit = (content: ContentType) => {
    setEditingContent(content)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Gestão de Conteúdo
        </h1>
        <Button
          onClick={() => {
            setEditingContent(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Conteúdo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Biblioteca Digital</CardTitle>
            <CardDescription>
              Gerencie a visibilidade e edição dos materiais educativos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {contents.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    'overflow-hidden border transition-all',
                    !item.visible && 'opacity-75 bg-slate-50',
                  )}
                >
                  <div
                    className="aspect-video w-full bg-slate-100 relative group cursor-pointer"
                    onClick={() => openEdit(item)}
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Edit className="h-8 w-8 text-white drop-shadow-md" />
                    </div>
                    {!item.visible && (
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                        <Badge variant="secondary" className="text-xs">
                          Oculto
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleVisibility(item.id)}
                        >
                          {item.visible ? (
                            <Eye className="h-4 w-4 text-blue-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-slate-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="outline" className="font-normal">
                        {item.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        {item.type === 'video' ? (
                          <PlayCircle className="h-3 w-3" />
                        ) : (
                          <FileText className="h-3 w-3" />
                        )}
                        {item.type === 'video' ? item.duration : 'Leitura'}
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
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-10 hover:bg-slate-100 transition-colors">
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
          </CardContent>
        </Card>
      </div>

      <ContentDialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) setEditingContent(null)
        }}
        contentToEdit={editingContent}
        onSubmit={handleSaveContent}
      />
    </div>
  )
}
