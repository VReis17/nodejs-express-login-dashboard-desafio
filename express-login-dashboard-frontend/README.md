# 🚀 Express Login Dashboard Frontend

Um frontend moderno construído com **Next.js 15**, **TypeScript** e **Tailwind CSS** para uma aplicação de login e dashboard da Mentoria 2.0.

## 🌟 Características

- ✅ **Next.js 15** com App Router
- ✅ **TypeScript** para tipagem estática
- ✅ **Tailwind CSS** para estilização
- ✅ **Radix UI** para componentes acessíveis
- ✅ **React Hook Form** para gerenciamento de formulários
- ✅ **Zod** para validação de esquemas
- ✅ **Lucide React** para ícones
- ✅ Design responsivo e moderno
- ✅ Sistema de temas (dark/light)
- ✅ Componentes reutilizáveis com shadcn/ui

## 📦 Tecnologias Utilizadas

### Core
- **Next.js 15.2.4** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - JavaScript com tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utilitário

### UI/UX
- **Radix UI** - Componentes primitivos acessíveis
- **shadcn/ui** - Componentes de interface reutilizáveis
- **Lucide React** - Biblioteca de ícones
- **next-themes** - Sistema de temas
- **Geist** - Fonte otimizada

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript
- **@hookform/resolvers** - Resolvers para React Hook Form

### Gráficos e Visualização
- **Recharts** - Biblioteca de gráficos para React
- **date-fns** - Utilitários para manipulação de datas

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm/yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd express-login-dashboard-frontend
```

### 2. Instale as dependências
```bash
pnpm install
# ou
npm install
# ou
yarn install
```

### 3. Execute o projeto em desenvolvimento
```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
express-login-dashboard-frontend/
├── app/                        # App Router do Next.js
│   ├── dashboard/             # Página do dashboard
│   ├── forgot-password/       # Página de recuperação de senha
│   ├── register/              # Página de registro
│   ├── reset-password/        # Página de redefinição de senha
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página de login (home)
├── components/               # Componentes reutilizáveis
│   ├── ui/                   # Componentes da interface (shadcn/ui)
│   └── theme-provider.tsx    # Provedor de temas
├── hooks/                    # Custom hooks
├── lib/                      # Utilitários e configurações
├── public/                   # Arquivos estáticos
├── styles/                   # Arquivos de estilo adicionais
├── components.json           # Configuração do shadcn/ui
├── next.config.mjs          # Configuração do Next.js
├── tailwind.config.ts       # Configuração do Tailwind CSS
└── tsconfig.json            # Configuração do TypeScript
```

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia o servidor de desenvolvimento

# Produção
pnpm build        # Gera a build de produção
pnpm start        # Inicia o servidor de produção

# Qualidade de código
pnpm lint         # Executa o linter do Next.js
```

## 🎨 Páginas Disponíveis

- **/** - Página de login principal
- **/dashboard** - Dashboard após login
- **/register** - Página de registro de novo usuário
- **/forgot-password** - Página para recuperação de senha
- **/reset-password** - Página para redefinir senha

## 🎯 Funcionalidades

### Página de Login
- Formulário de login com email e senha
- Validação de campos
- Alternância de visibilidade da senha
- Loading state durante autenticação
- Links para registro e recuperação de senha

### Dashboard
- Interface moderna e responsiva
- Componentes reutilizáveis
- Sistema de temas

### Sistema de Temas
- Suporte a tema claro e escuro
- Persistência da preferência do usuário
- Transições suaves entre temas

## 🔧 Configuração Personalizada

### Tailwind CSS
O projeto utiliza uma configuração personalizada do Tailwind CSS com:
- Paleta de cores customizada
- Animações personalizadas
- Breakpoints responsivos
- Variáveis CSS para temas

### Componentes shadcn/ui
Componentes pré-configurados e estilizados incluem:
- Button, Input, Label
- Card, Dialog, Sheet
- Form, Select, Checkbox
- Table, Tabs, Toast
- E muitos outros...

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para abrir uma issue no repositório.

---

**Desenvolvido com ❤️ para Mentoria 2.0**
