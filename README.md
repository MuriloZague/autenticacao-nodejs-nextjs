# Next.js + Node.js — Repositório de Estudos

Este repositório é um projeto de estudos pessoal com o objetivo de praticar o desenvolvimento full-stack, integrando um frontend moderno com Next.js e um backend RESTful com Node.js/Express. O projeto implementa um sistema simples de autenticação e gerenciamento de usuários.

## Estrutura

```
nextjs-nodejs/
├── backend/   # API REST com Node.js + Express
└── frontend/  # Aplicação web com Next.js
```

## Tecnologias

### Backend
- **Node.js** — runtime JavaScript server-side
- **Express 5** — framework para criação da API REST
- **Prisma** — ORM para acesso ao banco de dados
- **MongoDB** — banco de dados NoSQL
- **JSON Web Token (JWT)** — autenticação via tokens
- **bcrypt** — hash de senhas
- **Zod** — validação de dados de entrada
- **cookie-parser** — leitura de cookies nas requisições
- **express-rate-limit** — proteção contra força bruta
- **CORS** — liberação de requisições cross-origin com credenciais
- **dotenv** — gerenciamento de variáveis de ambiente

### Frontend
- **Next.js** — framework React com suporte a SSR/SSG
- **React** — biblioteca para construção de interfaces
- **TypeScript** — tipagem estática
- **Tailwind CSS** — estilização utilitária
- **Zod** — validação de formulários
- **React Hook Form** — gerenciamento de formulários
- **Axios** — cliente HTTP
- **ESLint** — linting de código

## Segurança implementada

### Autenticação
- O token JWT é armazenado em cookie `httpOnly; Secure; SameSite=Strict`, impedindo acesso via JavaScript e protegendo contra XSS e CSRF
- Cookies são enviados automaticamente pelo browser e lidos pelo backend via `cookie-parser` — nenhum token trafega no corpo das requisições

### Validação de entrada
- Schemas Zod em `backend/schemas/auth.js` validam todos os dados recebidos nas rotas públicas antes de qualquer operação no banco
- E-mail duplicado no cadastro retorna `409` com mensagem legível no frontend
- Dados do backend nunca vêm diretamente de `req.body` — apenas de `result.data` após validação

### Rate limiting
- `/login`: máximo de 10 tentativas por IP a cada 15 minutos
- `/cadastro`: máximo de 5 cadastros por IP a cada hora
- O backend retorna os segundos restantes (`retryAfter`) na resposta; o frontend exibe um countdown em tempo real e desabilita o botão até o bloqueio expirar

### Autorização
- A rota `DELETE /usuarios/:id` verifica se o `id` do token JWT corresponde ao `id` da URL antes de executar a exclusão, impedindo que um usuário delete a conta de outro (proteção contra IDOR)

### CORS
- Configurado com `origin` explícita via variável de ambiente `FRONTEND_URL` e `credentials: true`, rejeitando requisições de origens não autorizadas

## Variáveis de ambiente

### Backend (`backend/.env`)
```env
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

## Como executar

### Backend

```bash
cd backend
npm install
# Configure o arquivo .env com as variáveis acima
npm start
```

O servidor sobe na porta `3002`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3000`.
