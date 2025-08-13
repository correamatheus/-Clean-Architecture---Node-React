# 🧪 Teste Técnico – Sistema de Gestão de Familiares

Este projeto foi desenvolvido como parte de um teste técnico.  
O objetivo é gerenciar familiares e suas relações hierárquicas, permitindo criar, editar, deletar e visualizar a árvore genealógica interativa.

O repositório está organizado em duas pastas principais:

```
/backend   → API REST em Node.js + TypeScript
/frontend  → Interface web em React + Shadcn/UI
```

---

## 📐 Design Patterns Utilizados

Durante o desenvolvimento, apliquei **3 design patterns** para manter o código mais organizado, escalável e fácil de manter:

### 1. **Repository Pattern**
O Repository Pattern foi aplicado para isolar a lógica de acesso a dados da lógica de negócio.  
Isso significa que, se amanhã eu trocar o banco de dados (ex.: de Postgres para MongoDB), só preciso alterar o repository, sem mudar os casos de uso ou controllers.

- **Onde foi aplicado:**  
  - `src/ports/IFamiliarRepository.ts`
  - `src/adapters/repositories/FamiliarRepository.ts`

---

### 2. **Dependency Injection**
A injeção de dependências foi usada para que as classes (como Use Cases e Controllers) recebam suas dependências externamente, ao invés de criarem elas mesmas.  
Isso facilita testes unitários, pois posso injetar mocks, e deixa o código mais desacoplado.

- **Onde foi aplicado:**  
  - Controllers recebem os Use Cases e Repositories via construtor (`FamiliarController`).

---

### 3. **Use Case (Command Pattern aplicado ao contexto de Clean Architecture)**
Cada ação principal da aplicação (criar familiar, editar, buscar descendentes) foi encapsulada em uma classe de caso de uso.  
Isso separa claramente as regras de negócio da camada de transporte (HTTP) e facilita reutilização em outros contextos, como fila de eventos ou CLI.

- **Onde foi aplicado:**  
  - Pasta `src/usecases/` com classes como:
    - `CreateFamiliarUseCase`
    - `EditFamiliarUseCase`
    - `GetFamiliarWithDescendantsUseCase`

---

## 🚀 Como executar o projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/correamatheus/Clean-Architecture-React-Node.git
cd Clean-Architecture-React-Node
```

---

### 2️⃣ Rodar o backend

**Requisitos:**
- Node.js 18+
- NPM ou Yarn

```bash
cd backend
npm install
npm run dev
```

O backend será iniciado em:
```
http://localhost:3000
```

---

### 3️⃣ Rodar o frontend

⚠️ **Importante:** O backend precisa estar rodando antes do frontend.

**Requisitos:**
- Node.js 18+
- NPM ou Yarn

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em:
```
http://localhost:5173
```

---

## 🧪 Executando os testes

### Backend
```bash
cd backend
npm run test
```
### Frontend
```bash
cd frontend
npm run test
```

Os resultados serão exibidos no terminal.

---

## 📡 Documentação dos Endpoints

### `GET /familiares`
Retorna a lista de todos os familiares.
```json
[
  {
    "id": "uuid",
    "nome": "João Silva",
    "dataNascimentoISO": "1990-01-01",
    "idPai": null
  }
]
```

---

### `GET /familiares/:id`
Retorna um familiar específico e seus descendentes diretos.
```json
{
  "familiar": { "id": "uuid", "nome": "João Silva" },
  "descendentes": [
    { "id": "uuid", "nome": "Maria Silva" }
  ]
}
```

---

### `POST /familiares`
Cria um novo familiar.
```json
{
  "nome": "Maria Silva",
  "dataNascimentoISO": "1995-05-05",
  "idPai": "uuid-ou-null"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "nome": "Maria Silva",
  "dataNascimentoISO": "1995-05-05",
  "idPai": "uuid"
}
```

---

### `PUT /familiares/:id`
Atualiza dados de um familiar.
```json
{
  "nome": "Maria Oliveira Silva"
}
```

---

### `DELETE /familiares/:id`
Remove um familiar (desde que não possua descendentes).

**Resposta:**
```json
"Familiar removido com sucesso"
```

---

## 🖥️ Tecnologias Utilizadas

### Backend
- Node.js + TypeScript
- Express
- Zod (validação)
- UUID
- Clean Architecture

### Frontend
- React + TypeScript
- Vite
- Shadcn/UI
- React Query
- React D3 Tree

---

📌 **Observação:** Este projeto é apenas uma entrega de teste técnico e não está otimizado para produção.
