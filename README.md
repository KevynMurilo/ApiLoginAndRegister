# API de Autenticação com Node.js, Express e MongoDB

Esta é uma API de autenticação simples criada usando Node.js, Express e MongoDB. Ela permite o registro de usuários, login e acesso a um recurso protegido por token JWT.

## Funcionalidades

- Registro de usuários
- Autenticação de usuários
- Acesso a um recurso protegido

## Requisitos

- Node.js e npm instalados
- MongoDB configurado e em execução
- Arquivo `.env` configurado com suas variáveis de ambiente (exemplo fornecido no `.env.example`)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/KevynMurilo/ApiLoginAndRegister.git
cd ApiLoginAndRegister
npm install
```

### Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto com as seguintes informações:
```bash
DB_USER=SeuUsuarioDoBancoDeDados
DB_PASS=SuaSenhaDoBancoDeDados
SECRET=ChaveSecretaHash
```

## Uso
### Inicie o servidor:

```bash
npm start
```
A API estará disponível em http://localhost:3000.

# Rotas
### Registro de Usuário
URL: /auth/register

## Método: POST

### Corpo da Requisição:
```bash
{
    "name": "Nome do Usuário",
    "email": "usuario@example.com",
    "password": "senha123",
    "confirmpassword": "senha123"
}
```
## Login
URL: /auth/login

Método: POST

### Corpo da Requisição:
```bash
{
    "email": "usuario@example.com",
    "password": "senha123"
}
```
### Obter Usuário por ID (Protegido por Token)
URL: /user/:id

Método: GET

## Headers:
```bash
Authorization: Bearer <seu_token>
```
## Estrutura do Projeto
controllers/: Controladores da API.

middlewares/: Middlewares utilizados na API.

models/: Definição de modelos para o MongoDB.

routes/: Rotas da API.

app.js: Configuração do Express e definição de rotas.

server.js: Arquivo de inicialização do servidor.
