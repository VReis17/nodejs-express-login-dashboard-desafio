"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, Shield, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)

    // Simular reset da senha
    setTimeout(() => {
      setIsLoading(false)
      alert("Senha alterada com sucesso!")
      router.push("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center">
            <div className="relative w-48 h-20">
              <Image src="/logo-m20.png" alt="Mentoria 2.0 Logo" fill className="object-contain" priority />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Redefinir senha</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Digite o código enviado para seu e-mail e sua nova senha
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input id="email" type="email" value={email} readOnly className="h-11 pl-10 bg-gray-50 text-gray-600" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                Código de verificação
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="code"
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={6}
                  className="h-11 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                Nova senha
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmar nova senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Alterando senha..." : "Alterar senha"}
            </Button>
          </form>

          <div className="mt-6">
            <Link
              href="/forgot-password"
              className="flex items-center justify-center text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
