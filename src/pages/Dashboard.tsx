import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Github, User, Settings, ShieldCheck, Mail } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-24 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <User className="w-5 h-5 text-violet-400" /> Meu Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="w-24 h-24 border-2 border-violet-500/30">
              <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id}`} />
              <AvatarFallback className="bg-slate-800 text-2xl text-violet-300">
                {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-4 w-full">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Nome Completo</p>
                <p className="text-lg font-medium text-slate-200">
                  {user?.name || 'Não informado'}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> E-mail
                </p>
                <p className="text-lg font-medium text-slate-200">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

        <Card className="glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-violet-400" /> Integrações & Desenvolvedor
            </CardTitle>
            <CardDescription className="text-slate-400">
              Gerencie conexões de terceiros e configurações da sua plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-3 bg-slate-800 rounded-full ring-1 ring-white/10">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-200">Sincronização com GitHub</h4>
                  <p className="text-sm text-slate-400 max-w-lg">
                    Seu projeto está conectado ao GitHub. Alterações no código são versionadas
                    automaticamente.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-400">Sincronizado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
