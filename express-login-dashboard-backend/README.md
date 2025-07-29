# API de Login e Cadastro

API REST desenvolvida em Node.js com Express para cadastro e login de usuários, incluindo sistema de bloqueio após tentativas falhadas e recuperação de senha.

## 🚀 Funcionalidades

- **Cadastro de Usuário**: Criar nova conta com nome, email e senha
- **Login**: Autenticação com email e senha
- **Bloqueio de Senha**: Usuário é bloqueado após 3 tentativas falhadas
- **Recuperação de Senha**: Sistema de recuperação com código de verificação
- **Documentação Swagger**: API documentada automaticamente

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório
2. Navegue até a pasta do backend:
```bash
cd express-login-dashboard-backend
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor:
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

**URL da Documentação**: `http://localhost:3000/api-docs`

## 🔗 Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cadastrar novo usuário |
| POST | `/api/auth/login` | Realizar login |
| POST | `/api/auth/forgot-password` | Solicitar recuperação de senha |
| POST | `/api/auth/reset-password` | Redefinir senha com código |

### Exemplos de Uso

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

#### 2. Realizar Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "password": "123456"
  }'
```

#### 3. Solicitar Recuperação de Senha
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

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com as seguintes camadas:

### Estrutura de Pastas
```
express-login-dashboard-backend/
├── controllers/          # Controladores (lógica de requisição/resposta)
├── services/            # Serviços (lógica de negócio)
├── repositories/        # Repositórios (acesso a dados)
├── middleware/          # Middlewares personalizados
├── routes/             # Definição de rotas
├── data/               # Dados dos usuários (JSON)
├── server.js           # Arquivo principal do servidor
└── package.json        # Dependências do projeto
```

### Camadas da Aplicação

1. **Controller**: Gerencia requisições HTTP e respostas
2. **Service**: Contém a lógica de negócio da aplicação
3. **Repository**: Gerencia acesso aos dados (arquivo JSON)

## 🔒 Segurança

- **Senhas criptografadas** com bcrypt
- **Rate limiting** para prevenir ataques
- **Validação de dados** com express-validator
- **Headers de segurança** com helmet
- **CORS** configurado
- **JWT** para autenticação

## 📊 Armazenamento de Dados

Os dados dos usuários são armazenados em um arquivo JSON localizado em:
```
data/users.json
```

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

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 🔧 Configurações

### Variáveis de Ambiente
- `PORT`: Porta do servidor (padrão: 3000)
- `JWT_SECRET`: Chave secreta para JWT (padrão: 'sua-chave-secreta-aqui')
- `NODE_ENV`: Ambiente de execução (development/production)

### Scripts Disponíveis
- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em desenvolvimento com nodemon
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

## 🚨 Sistema de Bloqueio

- Usuário é bloqueado após **3 tentativas** de login falhadas
- O bloqueio é removido automaticamente ao:
  - Redefinir a senha com código de recuperação
  - Fazer login com sucesso (reseta tentativas)

## 🔄 Recuperação de Senha

1. Usuário solicita recuperação informando o email
2. Sistema gera código de 8 caracteres (hexadecimal)
3. Código expira em **30 minutos**
4. Usuário informa código + nova senha
5. Sistema desbloqueia usuário e reseta tentativas

## 📦 Dependências Principais

- **express**: Framework web
- **bcryptjs**: Criptografia de senhas
- **jsonwebtoken**: Autenticação JWT
- **express-validator**: Validação de dados
- **swagger-jsdoc**: Documentação da API
- **swagger-ui-express**: Interface da documentação
- **helmet**: Headers de segurança
- **cors**: Cross-Origin Resource Sharing

## 🤝 Contribuição

Este projeto foi desenvolvido para estudos de teste de software. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. 