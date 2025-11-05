# Sistema Acadêmico - Trabalho de Desenvolvimento de Framework

## 📚 Descrição

Sistema completo de gerenciamento acadêmico desenvolvido com arquitetura em camadas, utilizando Node.js no backend e JavaScript puro no frontend. O sistema permite o gerenciamento de usuários, professores, alunos, disciplinas, tarefas e notas com controle de acesso baseado em roles.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para banco de dados
- **PostgreSQL/MySQL** - Banco de dados relacional
- **JWT (JSON Web Token)** - Autenticação e autorização
- **Swagger** - Documentação automática da API
- **bcrypt** - Criptografia de senhas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript (Vanilla)** - Lógica de interação
- **Bootstrap 5.3.0** - Framework CSS responsivo
- **Bootstrap Icons 1.10.0** - Ícones

## 📁 Estrutura do Projeto

```
Trabalho-Desenv-Framework/
├
├── BackEnd/
│   ├── src/
│   │   ├── config/           # Configurações (banco de dados)
│   │   ├── controllers/      # Controladores das rotas
│   │   ├── middlewares/      # Middlewares (autenticação)
│   │   ├── models/           # Modelos do Sequelize
│   │   ├── repositories/     # Camada de acesso a dados
│   │   ├── routes/           # Definição de rotas
│   │   └── services/         # Lógica de negócio
│   ├── doc/                  # Documentação Swagger
│   ├── index.js              # Arquivo principal do servidor
│   ├── package.json          # Dependências do projeto
│   └── Dockerfile            # Container Docker
│
└── FrontEnd/
    └── src/
        ├── login/            # Tela de autenticação
        ├── home/             # Dashboard principal
        ├── usuarios/         # Gerenciamento de usuários
        ├── professores/      # Gerenciamento de professores
        ├── alunos/           # Gerenciamento de alunos
        ├── disciplinas/      # Gerenciamento de disciplinas
        ├── tarefas/          # Gerenciamento de tarefas
        └── notas/            # Gerenciamento de notas
```

## 👥 Tipos de Usuário e Permissões

### 🔴 Administrador (Admin)
- ✅ Gerenciar usuários (CRUD completo)
- ✅ Gerenciar professores (CRUD completo)
- ✅ Gerenciar alunos (CRUD completo)
- ✅ Gerenciar disciplinas (CRUD completo)
- ✅ Gerenciar tarefas (CRUD completo)
- ✅ Gerenciar notas (CRUD completo)

### 🟢 Professor
- ✅ Visualizar e gerenciar disciplinas (CRUD completo)
- ✅ Gerenciar tarefas (CRUD completo)
- ✅ Gerenciar notas (CRUD completo)

### 🔵 Aluno
- ✅ Visualizar suas próprias notas (somente leitura)

## 🛠️ Funcionalidades Principais

### Autenticação
- Login com email ou RA
- Autenticação via JWT
- Botão de mostrar/ocultar senha
- Controle de sessão com localStorage

### Dashboard Dinâmico
- Navegação adaptativa baseada no cargo do usuário
- Menu personalizado por role
- Informações do usuário logado

### Gerenciamento de Usuários
- Cadastro com email, senha e cargo (admin, professor, aluno)
- Busca e filtro por cargo
- Edição e exclusão de usuários

### Gerenciamento de Professores e Alunos
- Cadastro com informações pessoais (nome, CPF, telefone, etc.)
- Vinculação opcional com usuário do sistema (por RA)
- Seleção de usuário via dropdown
- Busca e filtros personalizados

### Gerenciamento de Disciplinas
- Cadastro com nome e professor responsável
- Seleção de professor via dropdown
- Exibição do nome do professor (não apenas ID)
- Busca por nome ou professor

### Gerenciamento de Tarefas
- Cadastro com nome, tipo (atividade/prova), disciplina, datas e nota máxima
- Seleção de disciplina via dropdown
- Campos de data e hora para abertura e fechamento
- Validação de datas (fechamento > abertura)
- Badges visuais por tipo (atividade azul, prova vermelha)
- Filtros por tipo e busca

### Gerenciamento de Notas
- Lançamento de notas com aluno, tarefa e valor
- Validação automática (nota ≤ nota máxima)
- Cálculo de desempenho percentual
- Indicadores visuais de desempenho:
  - 🟢 Verde (≥70%)
  - 🟡 Amarelo (50-69%)
  - 🔴 Vermelho (<50%)
- Alunos visualizam apenas suas próprias notas
- Professores e admins visualizam todas

## 🔧 Instalação e Configuração

### Instalação

1. **Instale as dependências do backend:**
```bash
cd Trabalho-Desenv-Framework/screens/BackEnd
npm install
```

2. **Inicie o servidor:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

3. **Abra o frontend:**
Abra o arquivo `screens/FrontEnd/src/login/login.html` no navegador ou use um servidor local como Live Server.

## 📡 API Endpoints

### Autenticação
- `POST /user/login` - Login de usuário

### Usuários
- `GET /user` - Listar todos (Admin)
- `POST /user` - Criar usuário (Admin)
- `PUT /user/:id` - Atualizar usuário (Admin)
- `DELETE /user/:id` - Deletar usuário (Admin)

### Professores
- `GET /professor` - Listar todos (Admin)
- `POST /professor` - Criar professor (Admin)
- `PUT /professor/:id` - Atualizar professor (Admin)
- `DELETE /professor/:id` - Deletar professor (Admin)

### Alunos
- `GET /aluno` - Listar todos (Admin/Professor)
- `POST /aluno` - Criar aluno (Admin)
- `PUT /aluno/:id` - Atualizar aluno (Admin)
- `DELETE /aluno/:id` - Deletar aluno (Admin)

### Disciplinas
- `GET /disciplina` - Listar todas (Admin/Professor)
- `POST /disciplina` - Criar disciplina (Admin)
- `PUT /disciplina/:id` - Atualizar disciplina (Admin)
- `DELETE /disciplina/:id` - Deletar disciplina (Admin)

### Tarefas
- `GET /task` - Listar todas (Admin/Professor)
- `POST /task` - Criar tarefa (Admin/Professor)
- `PUT /task/:id` - Atualizar tarefa (Admin/Professor)
- `DELETE /task/:id` - Deletar tarefa (Admin/Professor)

### Notas
- `GET /nota` - Listar notas (todos - filtrado por cargo)
- `POST /nota` - Criar nota (Admin/Professor)
- `PUT /nota/:id` - Atualizar nota (Admin/Professor)
- `DELETE /nota/:id` - Deletar nota (Admin/Professor)

## 📝 Documentação da API

A documentação completa da API está disponível via Swagger em:
```
http://localhost:3000/api-docs
```

## 🎨 Interface do Usuário

- Design responsivo com Bootstrap 5
- Interface intuitiva e moderna
- Feedback visual para ações do usuário
- Modais para criação e edição
- Confirmação para exclusões
- Busca e filtros em tempo real
- Badges e ícones para melhor visualização
- Dropdowns inteligentes para seleção de dados relacionados

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Middleware de autorização baseado em roles
- Validação de dados no backend
- Proteção de rotas sensíveis

## 🐳 Docker

O projeto inclui um Dockerfile para containerização do backend:

```bash
docker build -t sistema-academico -f  .
docker run -p 3000:3000 sistema-academico
```
