## Projeto: Login e Dashboard – Backend, Frontend, Testes de API e Testes Web

Este repositório contém:
- Backend (API Express)
- Frontend (Next.js)
- Testes de API (Mocha/Supertest no backend)
- Testes Web (Cypress)

Siga este guia para instalar, configurar e executar cada parte no Windows PowerShell (e também há comandos para Linux/Mac quando aplicável).

---

### Pré‑requisitos
- Node.js 18+ recomendado (Backend funciona com 14+, Frontend usa Next 15)
- npm (ou yarn/pnpm, se preferir)

Opcional (para testes Web):
- Google Chrome/Edge para `cypress open`

---

### Estrutura do Repositório
- `express-login-dashboard-backend/` – API (Express, Swagger)
- `express-login-dashboard-frontend/` – Aplicação Web (Next.js)
- `supertest-login-dashboard-test-api/` – Pasta reservada para testes de API externos (opcional)
- `cypress-login-dashboard-test-web/` – Testes E2E (Cypress)

---

### 1) Backend (API Express)
Local: `express-login-dashboard-backend/`

1. Instalar dependências
```powershell
cd express-login-dashboard-backend
npm install
```

2. Executar em desenvolvimento (com nodemon)
```powershell
npm run dev
```

3. Executar em produção
```powershell
npm start
```

4. Porta e documentação
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

5. Alterar a porta (opcional)
- Windows PowerShell (somente para a execução atual):
```powershell
$env:PORT=4000; npm run dev
```
- Linux/Mac:
```bash
PORT=4000 npm run dev
```

6. Variáveis de ambiente importantes
- `PORT` (padrão: 3000)
- `JWT_SECRET` (padrão de desenvolvimento definido no código)
- `NODE_ENV` (development/production)

7. Health check rápido
```
GET http://localhost:3000/api/health
```

---

### 2) Frontend (Next.js)
Local: `express-login-dashboard-frontend/`

1. Instalar dependências
```powershell
cd ../express-login-dashboard-frontend
npm install --force
```

2. Executar em desenvolvimento (sugerido usar porta 3001)
```powershell
npm run dev -- -p 3001
```
Alternativa PowerShell:
```powershell
$env:PORT=3001; npm run dev
```

3. Build e execução em produção
```powershell
npm run build
npm start -- -p 3001
```

4. URL do Frontend
- `http://localhost:3001`

5. Backend da aplicação (URL da API)
- O Frontend consome a API definida em `express-login-dashboard-frontend/lib/config.ts` via `API_CONFIG.BASE_URL`.
- Padrão: `http://localhost:3000/api`
- Se você mudar a porta do backend, ajuste a base URL no arquivo acima para refletir, por exemplo: `http://localhost:4000/api`.

---

### 3) Testes de API (Mocha/Supertest)
Local: dentro do backend (`express-login-dashboard-backend/`)

Pré‑requisito: o backend não precisa estar rodando; os testes sobem a app em memória.

1. Executar testes
```powershell
cd ../express-login-dashboard-backend
npm test
```

2. Cobertura (se preferir usar Jest/nyc, ajuste conforme seu setup). No projeto atual, há suite com Mocha/Supertest já configurada em `tests/`.

Observação: existe uma pasta `supertest-login-dashboard-test-api/` reservada para cenários externos de testes de API. Caso você deseje usá-la, crie os testes e scripts conforme sua conveniência. O fluxo recomendado é usar os testes já presentes no backend (`npm test`).

---

### 4) Testes Web (Cypress)
Local: `cypress-login-dashboard-test-web/`

Pré‑requisitos:
- Backend rodando (padrão em `http://localhost:3000`)
- Frontend rodando em `http://localhost:3001` (os testes usam essa URL)

1. Instalar dependências do projeto de testes Web
```powershell
cd ../cypress-login-dashboard-test-web
npm install
```

2. Abrir o Cypress (modo interativo)
```powershell
npx cypress open
```

3. Executar em modo headless
```powershell
npx cypress run
```

4. Ajuste de URL (se mudar a porta do Frontend)
- Edite `cypress-login-dashboard-test-web/cypress/pages/login/index.js` e altere `openLoginPage()` para a nova URL.

---

### Execução Rápida (passo a passo)
Em dois terminais separados:

Terminal A – Backend
```powershell
cd express-login-dashboard-backend
npm install
npm run dev
```

Terminal B – Frontend
```powershell
cd express-login-dashboard-frontend
npm install
npm run dev -- -p 3001
```

Swagger: `http://localhost:3000/api-docs`
App Web: `http://localhost:3001`

Testes de API (no backend):
```powershell
cd express-login-dashboard-backend
npm test
```

Testes Web (Cypress):
```powershell
cd cypress-login-dashboard-test-web
npm install
npx cypress open
```

---

### Dicas e Solução de Problemas
- Porta 3000 ocupada (backend): use `PORT=4000` (veja seção de porta)
- Porta 3001 ocupada (frontend): use `-p 3002` ou outra
- CORS: a API já está com CORS habilitado; se necessário, ajuste em `express-login-dashboard-backend/server.js`
- Dados persistidos do backend: ficam em `express-login-dashboard-backend/data/users.json` (pasta ignorada no Git)

---

### Contatos e Documentação
- API Docs (Swagger): `http://localhost:3000/api-docs`
- Em caso de erro, verifique os logs do terminal onde cada serviço está rodando


