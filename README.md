# 🔧 KIANGOLA EMPREGOS — API

API RESTful da plataforma **KIANGOLA EMPREGOS**, desenvolvida em **Node.js + Fastify + TypeScript + Prisma**, com banco de dados **MySQL**.

Criado por **João Laurindo Chilepa Tchiwila**.

---

## 🧱 Tecnologias Utilizadas

- Node.js
- TypeScript
- fastify
- Prisma ORM
- MySQL
- JWT (se ativado futuramente)

---

## 🚀 Como Executar

### 1. Instalar dependências

```bash
cd api
npm install
```

### 2. Configurar variáveis de ambiente

Crie um `.env`:

```env
PORT=3000
DATABASE_URL="mysql://usuario:senha@localhost:3306/kiangola"
JWT_SECRET=sua_chave_jwt
```

### 3. Executar migrações e gerar Prisma Client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

API estará disponível em: [http://localhost:3000/kiangola](http://localhost:3000/kiangola)

---

## 🧪 Endpoints Principais

- `POST /kiangola/login` – Login com validação por SMS
- `GET /kiangola/jobs` – Listagem de vagas
- `GET /kiangola/jobs?search=` – Busca de vagas
- `POST /kiangola/jobs` – Criar nova vaga
- `PUT /kiangola/jobs/:id` – Atualizar vaga
- `DELETE /kiangola/jobs/:id` – Remover vaga

---

## 🛡️ Segurança

- Permissões e autenticação podem ser ativadas com JWT
- Validações no back-end com `zod` 

---

## ✍️ Autor

**João Laurindo Chilepa Tchiwila**

---

## 📜 Licença

Licenciado sob a **MIT License**
