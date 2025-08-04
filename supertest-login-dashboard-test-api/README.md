# Testes da API - SuperTest + Mocha

Este projeto contém testes automatizados para a API REST de login e dashboard usando SuperTest e Mocha.

## Estrutura dos Testes

- `tests/auth.test.js` - Testes básicos de configuração da API
- `tests/login-success.test.js` - Testes de login com sucesso
- `tests/login-invalid.test.js` - Testes de login inválido
- `tests/forgot-password.test.js` - Testes de recuperação de senha

## Instalação

```bash
npm install
```

## Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Funcionalidades Testadas

### Login com Sucesso
- Login com credenciais válidas
- Retorno de token de autenticação
- Estrutura de resposta correta

### Login Inválido
- Senha incorreta
- Email inexistente
- Email inválido
- Campos vazios
- Dados ausentes

### Recuperação de Senha
- Solicitação de recuperação com email válido
- Email inexistente
- Email inválido
- Redefinição de senha com código válido
- Login com nova senha
- Código inválido
- Nova senha muito curta

## Pré-requisitos

- Node.js instalado
- API backend rodando (express-login-dashboard-backend)
- Dependências instaladas via npm install 