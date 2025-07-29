# 🚀 Instruções para Usar a API de Login e Cadastro

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação e Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação interativa em: `http://localhost:3000/api-docs`

## 🔗 Endpoints Disponíveis

### 1. Cadastrar Usuário
```bash
POST http://localhost:3000/api/auth/register
```

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "123456"
}
```

### 2. Fazer Login
```bash
POST http://localhost:3000/api/auth/login
```

**Body:**
```json
{
  "email": "joao@exemplo.com",
  "password": "123456"
}
```

### 3. Solicitar Recuperação de Senha
```bash
POST http://localhost:3000/api/auth/forgot-password
```

**Body:**
```json
{
  "email": "joao@exemplo.com"
}
```

### 4. Redefinir Senha
```bash
POST http://localhost:3000/api/auth/reset-password
```

**Body:**
```json
{
  "email": "joao@exemplo.com",
  "resetCode": "A1B2C3D4",
  "newPassword": "nova123456"
}
```

## 🧪 Testando a API

### Usando cURL

#### 1. Cadastrar Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "password": "123456"
  }'
```

#### 2. Fazer Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "password": "123456"
  }'
```

#### 3. Solicitar Recuperação
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com"
  }'
```

#### 4. Redefinir Senha
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "resetCode": "A1B2C3D4",
    "newPassword": "nova123456"
  }'
```

### Usando Postman

1. Importe a coleção do Postman (se disponível)
2. Configure a URL base: `http://localhost:3000`
3. Use os endpoints listados acima

### Usando os Exemplos JavaScript

```bash
# Instalar axios (se necessário)
npm install axios

# Executar exemplos
node examples/api-examples.js
```

## 🔒 Funcionalidades de Segurança

### Sistema de Bloqueio
- Usuário é bloqueado após **3 tentativas** de login falhadas
- O bloqueio é removido automaticamente ao:
  - Redefinir a senha com código de recuperação
  - Fazer login com sucesso (reseta tentativas)

### Recuperação de Senha
1. Usuário solicita recuperação informando o email
2. Sistema gera código de 8 caracteres (hexadecimal)
3. Código expira em **30 minutos**
4. Usuário informa código + nova senha
5. Sistema desbloqueia usuário e reseta tentativas

## 📊 Dados Armazenados

Os dados dos usuários são salvos em: `data/users.json`

### Estrutura do Usuário
```json
{
  "id": "1234567890",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "hash_da_senha",
  "isBlocked": false,
  "loginAttempts": 0,
  "resetCode": null,
  "resetCodeExpiry": null,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm test -- --coverage
```

## 🔧 Configurações

### Variáveis de Ambiente
- `PORT`: Porta do servidor (padrão: 3000)
- `JWT_SECRET`: Chave secreta para JWT
- `NODE_ENV`: Ambiente de execução

### Scripts Disponíveis
- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em desenvolvimento
- `npm test`: Executa os testes

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 401 | Credenciais inválidas |
| 404 | Recurso não encontrado |
| 423 | Usuário bloqueado |
| 500 | Erro interno do servidor |

## 🚨 Solução de Problemas

### Servidor não inicia
1. Verifique se a porta 3000 está livre
2. Verifique se todas as dependências foram instaladas
3. Verifique se há erros no console

### Erro de módulo não encontrado
```bash
npm install
```

### Erro de permissão
- No Windows: Execute o PowerShell como administrador
- No Linux/Mac: Use `sudo` se necessário

### Problemas com CORS
- A API já está configurada com CORS
- Se necessário, ajuste as configurações em `server.js`

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `/api-docs`
2. Consulte os logs do servidor
3. Execute os testes para verificar se tudo está funcionando 