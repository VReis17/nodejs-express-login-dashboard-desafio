"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Clock, Zap, Layout, TrendingUp, Gauge } from "lucide-react"
import Image from "next/image"

interface MetricCardProps {
  title: string
  description: string
  importance: string
  idealTime: string
  icon: React.ReactNode
  color: string
}

function MetricCard({ title, description, importance, idealTime, icon, color }: MetricCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
            <Badge variant="secondary" className="mt-1 text-xs">
              {idealTime}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">O que é:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Por que importa:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{importance}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const metrics = [
    {
      title: "FCP (First Contentful Paint)",
      description: "Tempo até que o primeiro conteúdo (texto, imagem, SVG etc.) apareça na tela.",
      importance: "Mostra ao usuário que algo está acontecendo.",
      idealTime: "< 1,8s",
      icon: <Clock className="w-5 h-5 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "LCP (Largest Contentful Paint)",
      description:
        "Tempo até que o maior conteúdo visível (geralmente uma imagem ou bloco de texto grande) seja carregado.",
      importance: "Mede a percepção de carregamento principal.",
      idealTime: "< 2,5s",
      icon: <Layout className="w-5 h-5 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "TBT (Total Blocking Time)",
      description:
        "Soma do tempo em que o thread principal ficou bloqueado e impediu interações (por exemplo, cliques).",
      importance: "Indica problemas de JavaScript que impedem o usuário de interagir.",
      idealTime: "< 200ms",
      icon: <Zap className="w-5 h-5 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "CLS (Cumulative Layout Shift)",
      description: "Mede quanto os elementos da tela se movem enquanto a página carrega.",
      importance: "Mudanças inesperadas na interface são ruins para o usuário.",
      idealTime: "< 0.1",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "SI (Speed Index)",
      description: "Mede a velocidade com que o conteúdo é visivelmente carregado.",
      importance: "Quanto mais rápido o conteúdo aparece, melhor a experiência.",
      idealTime: "< 3.4s",
      icon: <Gauge className="w-5 h-5 text-white" />,
      color: "bg-red-500",
    },
  ]

  const handleLogout = () => {
    // Simular logout
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-8">
                <Image src="/logo-m20.png" alt="Mentoria 2.0 Logo" fill className="object-contain" priority />
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Métricas Técnicas de Performance</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Entenda as principais métricas que impactam a experiência do usuário e a performance de aplicações web.
            Essas métricas são fundamentais para criar interfaces rápidas e responsivas.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Additional Info Card */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">Core Web Vitals</CardTitle>
            <CardDescription className="text-center text-lg">
              As métricas mais importantes segundo o Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">LCP</h3>
                <p className="text-sm text-blue-600">Carregamento</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">FID/TBT</h3>
                <p className="text-sm text-yellow-600">Interatividade</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">CLS</h3>
                <p className="text-sm text-green-600">Estabilidade Visual</p>
              </div>
            </div>
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Essas três métricas formam os <strong>Core Web Vitals</strong>, que são usados pelo Google como fatores
                de ranking e são essenciais para uma boa experiência do usuário.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
