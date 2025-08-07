# 🔗 Integração Frontend + Backend - Instruções

## ✅ **Integração Implementada com Sucesso!**

A conexão entre o frontend (Next.js) e o backend (Express) foi implementada com as seguintes funcionalidades:

### 🛠️ **Arquivos Criados/Modificados:**

#### **Novos Arquivos:**
- `lib/api.ts` - Serviço principal de API
- `lib/config.ts` - Configurações da aplicação

#### **Páginas Atualizadas:**
- `app/page.tsx` - Login com API real
- `app/register/page.tsx` - Cadastro com API real  
- `app/forgot-password/page.tsx` - Recuperação de senha real
- `app/reset-password/page.tsx` - Reset de senha real
- `app/dashboard/page.tsx` - Dashboard com autenticação

---

## 🔧 **Como Iniciar o Projeto Completo:**

### 1. **Iniciar o Backend:**
```bash
cd express-login-dashboard-backend
npm install
npm run dev
```
**Backend estará em:** `http://localhost:3000`

### 2. **Iniciar o Frontend:**
```bash
cd express-login-dashboard-frontend
npm install
npm run dev
```
**Frontend estará em:** `http://localhost:3000` (mudará automaticamente para 3001 se o backend estiver rodando)

---

## 🔗 **Funcionalidades da Integração:**

### ✅ **Login Completo:**
- Validação de credenciais via API
- Armazenamento seguro do token JWT
- Redirecionamento automático para dashboard
- Mensagens de erro em tempo real

### ✅ **Cadastro de Usuário:**
- Cadastro via API com validação
- Verificação de email duplicado
- Redirecionamento automático para login
- Feedback visual de sucesso/erro

### ✅ **Recuperação de Senha:**
- Solicitação de código via API
- Exibição do código na tela (em produção seria enviado por email)
- Redirecionamento automático para reset

### ✅ **Reset de Senha:**
- Redefinição com código de verificação
- Validação de código via API
- Desbloqueio automático do usuário
- Reset das tentativas de login

### ✅ **Dashboard Protegido:**
- Verificação de autenticação
- Exibição de dados do usuário logado
- Logout funcional
- Redirecionamento se não autenticado

---

## 📱 **Fluxo de Uso:**

### **1. Cadastro:**
1. Acesse o frontend
2. Clique em "Cadastre-se"
3. Preencha nome, email e senha
4. Após sucesso, será redirecionado para login

### **2. Login:**
1. Faça login com email e senha
2. Após sucesso, será redirecionado para dashboard
3. Token e dados do usuário ficam salvos no localStorage

### **3. Dashboard:**
1. Visualize seu nome no header
2. Navegue pelas métricas de performance
3. Use o botão "Sair" para fazer logout

### **4. Recuperação de Senha:**
1. Na tela de login, clique em "Esqueci minha senha"
2. Digite seu email
3. O código aparecerá na tela
4. Será redirecionado automaticamente para reset
5. Digite o código e nova senha

---

## 🔒 **Segurança Implementada:**

- **JWT Token:** Autenticação segura
- **LocalStorage:** Persistência de sessão
- **Validação:** Frontend + Backend
- **Proteção de Rotas:** Dashboard só acessível logado
- **Logout Seguro:** Limpeza completa de dados

---

## 🚨 **Sistema de Bloqueio:**

1. Após 3 tentativas de login incorretas, usuário é bloqueado
2. Para desbloquear, use a recuperação de senha
3. O reset de senha automaticamente desbloqueia o usuário

---

## 📋 **Dados de Teste:**

O backend salva dados em `express-login-dashboard-backend/data/users.json`

**Exemplo de usuário:**
```json
{
  "id": "1704649200000",
  "name": "João Silva",
  "email": "joao@teste.com",
  "password": "hash_da_senha",
  "isBlocked": false,
  "loginAttempts": 0,
  "resetCode": null,
  "resetCodeExpiry": null,
  "createdAt": "2024-01-07T12:00:00.000Z"
}
```

---

## 🔧 **Configurações Importantes:**

### **URLs da API:**
- Backend: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api-docs`
- Frontend: `http://localhost:3001` (se backend rodando)

### **Endpoints Utilizados:**
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login  
- `POST /api/auth/forgot-password` - Solicitar código
- `POST /api/auth/reset-password` - Reset senha

---

## 🐛 **Resolução de Problemas:**

### **Frontend não conecta:**
1. Verifique se o backend está rodando em localhost:3000
2. Verifique se não há bloqueio de CORS
3. Veja o console do navegador para erros

### **Erro de CORS:**
- O backend já está configurado com CORS habilitado
- Se necessário, ajuste em `express-login-dashboard-backend/server.js`

### **LocalStorage não funciona:**
- Use o navegador em modo normal (não privado)
- Limpe o localStorage se necessário: `localStorage.clear()`

### **Dados não persistem:**
- Verifique se a pasta `data/` existe no backend
- Verifique permissões de escrita

---

## 🎯 **Próximos Passos:**

A integração está completa e funcional! Para uso em produção, considere:

1. **Variáveis de ambiente** para URLs da API
2. **HTTPS** para segurança
3. **Envio real de emails** para códigos
4. **Banco de dados** ao invés de arquivo JSON
5. **Refresh tokens** para sessões longas

---

**✨ A aplicação está totalmente funcional e integrada!**
