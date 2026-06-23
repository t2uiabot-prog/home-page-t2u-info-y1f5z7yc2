import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Github, User, Settings, ShieldCheck, Camera, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function Dashboard() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState(user?.name || '')
  const [company, setCompany] = useState(user?.company || '')
  const [jobRole, setJobRole] = useState(user?.job_role || '')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setCompany(user.company || '')
      setJobRole(user.job_role || '')
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview
    if (user?.avatar) return pb.files.getUrl(user, user.avatar)
    return `https://img.usecurling.com/ppl/thumbnail?seed=${user?.id}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome completo é obrigatório.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('company', company.trim())
    formData.append('job_role', jobRole.trim())

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    const { error } = await updateProfile(formData)
    setIsSaving(false)

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } else {
      toast({ title: 'Sucesso', description: 'Perfil atualizado com sucesso.' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <User className="w-5 h-5 text-violet-400" /> Meu Perfil
            </CardTitle>
            <CardDescription className="text-slate-400">
              Gerencie suas informações pessoais e profissionais.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="w-24 h-24 border-2 border-violet-500/30 transition-opacity group-hover:opacity-80">
                    <AvatarImage src={getAvatarUrl()} className="object-cover" />
                    <AvatarFallback className="bg-slate-800 text-2xl text-violet-300">
                      {name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <h3 className="text-lg font-medium text-slate-200">Foto de Perfil</h3>
                  <p className="text-sm text-slate-400">
                    Clique na imagem para alterar sua foto.
                    <br />
                    Recomendado: 256x256px, formato PNG ou JPG.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-violet-500 placeholder:text-slate-600"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-white/5 border-white/10 text-slate-500 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-violet-500 placeholder:text-slate-600"
                    placeholder="Ex: t2u.info"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobRole" className="text-slate-300">
                    Cargo / Profissão
                  </Label>
                  <Input
                    id="jobRole"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-violet-500 placeholder:text-slate-600"
                    placeholder="Ex: Desenvolvedor Frontend"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-white/10 pt-6">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-primary border-none rounded-full px-8"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Salvar Alterações
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Status da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-lg font-medium text-emerald-400 mb-1">Conta Ativa</p>
                <p className="text-sm text-slate-400 text-center">
                  Sua conta está segura e pronta para uso.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-violet-400" /> Integrações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-full ring-1 ring-white/10">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">GitHub</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-medium text-emerald-400">Ativo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
