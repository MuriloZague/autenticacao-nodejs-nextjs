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
- **CORS** — liberação de requisições cross-origin
- **dotenv** — gerenciamento de variáveis de ambiente

### Frontend
- **Next.js** — framework React com suporte a SSR/SSG
- **React** — biblioteca para construção de interfaces
- **TypeScript** — tipagem estática
- **Tailwind CSS** — estilização utilitária
- **ESLint** — linting de código

## Como executar

### Backend

```bash
cd backend
npm install
# Configure o arquivo .env com DATABASE_URL
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
