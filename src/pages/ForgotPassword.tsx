import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await resetPassword(email)

    setIsLoading(false)
    setIsSubmitted(true)

    toast({
      title: 'E-mail enviado',
      description: 'Se houver uma conta com este e-mail, enviaremos um link de recuperação.',
    })
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 py-20 animate-fade-in-up">
      <Card className="w-full max-w-md glass-panel border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            Recuperar Senha
          </CardTitle>
          <CardDescription className="text-slate-400">
            Digite seu e-mail para receber um link de redefinição
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-primary font-semibold hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Link de Recuperação
              </Button>
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6 pt-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <MailCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-slate-300">
                Se uma conta existir para <strong>{email}</strong>, você receberá um e-mail com
                instruções para redefinir sua senha em breve.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-white/5 hover:text-white"
            >
              <Link to="/login">Voltar para o login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
