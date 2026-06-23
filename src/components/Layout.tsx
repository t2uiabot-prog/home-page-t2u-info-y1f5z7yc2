import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu, X, Hexagon, ArrowRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Recursos', href: '/#recursos' },
    { name: 'Como Funciona', href: '/#como-funciona' },
    { name: 'Sobre', href: '/#sobre' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Inscrição confirmada!',
      description: 'Você receberá nossas novidades em breve.',
    })
    ;(e.target as HTMLFormElement).reset()
  }

  const { isAuthenticated, user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    toast({ title: 'Sessão encerrada', description: 'Você saiu da sua conta com sucesso.' })
    navigate('/')
    setIsOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled ? 'glass-header py-3' : 'bg-transparent py-5',
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tighter hover:opacity-80 transition-opacity"
          >
            <Hexagon className="w-8 h-8 text-violet-500 fill-violet-500/20" />
            t2u.info
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-violet-500 decoration-2"
              >
                {l.name}
              </a>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-violet-500 decoration-2"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-300 hidden lg:inline-block">
                  Olá, {user?.name || user?.email?.split('@')[0]}
                </span>
                <Avatar className="w-8 h-8 border border-white/20">
                  <AvatarImage
                    src={
                      user?.avatar
                        ? pb.files.getUrl(user, user.avatar)
                        : `https://img.usecurling.com/ppl/thumbnail?seed=${user?.id}`
                    }
                  />
                  <AvatarFallback className="bg-slate-800 text-xs text-violet-300">
                    {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-white/10 hover:bg-white/5 text-slate-300 rounded-full px-6"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="text-slate-300 hover:text-white hover:bg-white/5 rounded-full px-6"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="bg-gradient-primary rounded-full px-6 font-semibold">
                  <Link to="/signup">Começar Agora</Link>
                </Button>
              </>
            )}
          </div>

          <button className="md:hidden text-slate-300 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 flex flex-col gap-6 md:hidden animate-fade-in">
          {navLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-semibold border-b border-white/10 pb-4 text-slate-200"
            >
              {l.name}
            </a>
          ))}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-2xl font-semibold border-b border-white/10 pb-4 text-slate-200"
            >
              Dashboard
            </Link>
          )}
          <div className="flex flex-col gap-4 mt-8">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-10 h-10 border border-white/20">
                    <AvatarImage
                      src={
                        user?.avatar
                          ? pb.files.getUrl(user, user.avatar)
                          : `https://img.usecurling.com/ppl/thumbnail?seed=${user?.id}`
                      }
                    />
                    <AvatarFallback className="bg-slate-800 text-sm text-violet-300">
                      {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium text-slate-300">
                    {user?.name || user?.email}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full glass-panel h-14 text-lg rounded-full border-white/20"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  onClick={() => setIsOpen(false)}
                  className="w-full glass-panel h-14 text-lg rounded-full border-white/20"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button
                  asChild
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-primary h-14 text-lg rounded-full"
                >
                  <Link to="/signup">Começar Agora</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer id="sobre" className="bg-slate-900 border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tighter mb-4"
              >
                <Hexagon className="w-6 h-6 text-violet-500" /> t2u.info
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simplificando conexões e transformando interações em resultados para negócios
                modernos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-slate-200">Links Úteis</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Plataforma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Soluções
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Preços
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-slate-200">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-slate-200">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">Receba novidades e dicas exclusivas.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  required
                  className="bg-white/5 border-white/10 focus-visible:ring-violet-500 rounded-full"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-violet-600 hover:bg-violet-500 rounded-full shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm pt-8 border-t border-white/5">
            © {new Date().getFullYear()} t2u.info. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
