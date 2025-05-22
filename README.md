# To-Do List App

App de organização pessoal para planejar e acompanhar tarefas diárias.

---

## Como rodar

1. Clone o repositório  
2. Rode `npm install` para instalar dependências  
3. Configure o banco (SQLite para desenvolvimento)  
4. Rode `npm run dev` para iniciar o servidor Next.js  
5. Acesse `http://localhost:3000`

---

## Funcionalidades

- CRUD completo de tarefas (criar, listar, editar, excluir)  
- Marcar tarefa como concluída  
- Exibição visual do status da tarefa (concluída, pendente, atrasada)  
- Responsivo para desktop e mobile

---

## Arquitetura

- Frontend com Next.js (App Router) e Tailwind CSS  
- Backend via API routes Next.js com Prisma e SQLite  
- Hook personalizado `useTasks` para consumir API e gerenciar estado  
- Componentes reutilizáveis para inputs, botões e tarefas


---

## Banco de Dados

O projeto usa Prisma com SQLite para desenvolvimento.

Para criar e atualizar o banco, rode:

```bash
npx prisma migrate dev --name init
```
---

## Uso de IA

Utilizei IA para gerar esboços iniciais do código e estrutura do projeto, além de otimizar trechos repetitivos e esclarecer dúvidas sobre erros e boas práticas de codificação. Foi importante principalmente para entender sobre a implementação de componentes com CVA(class-variance-authority).