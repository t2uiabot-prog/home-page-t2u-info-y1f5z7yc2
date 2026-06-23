import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Shield, BarChart3, Zap, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Index() {
  const { toast } = useToast()
  const handleCTA = () =>
    toast({ title: 'Aguarde...', description: 'Carregando formulário de cadastro.' })

  const features = [
    {
      title: 'Segurança Total',
      desc: 'Criptografia avançada para proteger todos os seus dados e interações na plataforma, garantindo privacidade absoluta.',
      icon: Shield,
    },
    {
      title: 'Analytics em Tempo Real',
      desc: 'Acompanhe métricas e resultados no momento em que acontecem com painéis intuitivos e relatórios detalhados.',
      icon: BarChart3,
    },
    {
      title: 'Integração Fácil',
      desc: 'Conecte-se com suas ferramentas favoritas em poucos cliques, sem complicação e sem necessidade de código.',
      icon: Zap,
    },
  ]

  const steps = [
    {
      step: '1',
      title: 'Crie sua conta',
      desc: 'Cadastro rápido em menos de 2 minutos. Sem cartão de crédito.',
    },
    {
      step: '2',
      title: 'Configure seu perfil',
      desc: 'Personalize com a identidade visual da sua marca facilmente.',
    },
    {
      step: '3',
      title: 'Compartilhe e converta',
      desc: 'Distribua seus links e veja os resultados multiplicarem.',
    },
  ]

  const stats = [
    { value: '10k+', label: 'Usuários Ativos' },
    { value: '99.9%', label: 'Uptime Garantido' },
    { value: '24/7', label: 'Suporte Dedicado' },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-2xl text-center lg:text-left animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Sua conexão simplificada com o <span className="text-gradient">mundo.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
              A plataforma t2u.info ajuda você a transformar interações em resultados reais. Rápido,
              seguro e extremamente intuitivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleCTA}
                className="bg-gradient-primary rounded-full h-14 px-8 text-lg font-semibold"
              >
                Criar Conta Grátis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-lg font-medium glass-panel border-white/20 hover:bg-white/10 text-white"
              >
                <Play className="mr-2 w-5 h-5 fill-current" /> Ver Demonstração
              </Button>
            </div>
          </div>
          <div
            className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-square lg:aspect-auto lg:h-[500px] flex items-center justify-center animate-fade-in opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-emerald-400/20 blur-[60px] rounded-full" />
            <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 animate-float shadow-[0_20px_50px_rgba(139,92,246,0.15)] border-white/10 bg-slate-900/60">
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-28 flex-1 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
                    <BarChart3 className="w-8 h-8 text-violet-400/70" />
                    <div className="h-2 w-12 bg-white/20 rounded-full" />
                  </div>
                  <div className="h-28 w-1/3 bg-violet-500/10 rounded-2xl border border-violet-500/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-violet-300">89%</span>
                  </div>
                </div>
                <div className="h-32 w-full bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/5 p-5 flex flex-col justify-end">
                  <div className="flex justify-between mb-2 text-xs text-slate-400 font-medium">
                    <span>Conversão</span>
                    <span>Meta Atingida</span>
                  </div>
                  <div className="h-3 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-emerald-400 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl">
                  <div className="h-12 w-12 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-2 w-3/4 bg-white/30 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Recursos desenhados para você
            </h2>
            <p className="text-slate-400 text-lg md:text-xl">
              Tudo o que você precisa para alavancar sua presença digital em um só lugar, projetado
              para eficiência máxima.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-panel p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border-white/5 hover:border-violet-500/30"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-8 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all">
                  <f.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-100">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 tracking-tight">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-slate-950 border-4 border-violet-500/50 flex items-center justify-center text-2xl font-black text-violet-400 mb-8 shadow-[0_0_30px_rgba(139,92,246,0.15)] group-hover:scale-110 group-hover:border-violet-400 transition-all duration-300 bg-gradient-to-b from-slate-900 to-slate-950">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-100">{s.title}</h3>
                <p className="text-slate-400 text-lg">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="text-center py-6 md:py-2">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-3 tracking-tighter">
                  {s.value}
                </div>
                <div className="text-slate-400 font-medium text-lg uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="glass-panel relative overflow-hidden rounded-[3rem] p-12 md:p-24 text-center border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-emerald-600/10 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
                Pronto para começar?
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Junte-se a milhares de usuários que já transformaram a forma como se conectam e
                crescem online.
              </p>
              <Button
                size="lg"
                onClick={handleCTA}
                className="bg-white text-violet-950 hover:bg-slate-100 rounded-full h-16 px-12 text-xl font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Criar Conta Agora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
