# Jornada Levty - Fundamentos do Backend

Este projeto demonstra os conceitos fundamentais do desenvolvimento backend através de uma aplicação Node.js com Express, criada para a **Jornada Levty**.

## 🎯 Objetivo

Compreender como uma página da internet consegue exibir um formulário, receber dados e retornar uma resposta, explorando os fundamentos do desenvolvimento backend antes mesmo da separação entre front-end e back-end.

## 🚀 Funcionalidades Implementadas

### ✅ Requisitos Atendidos
- **Servidor Node.js com Express**: Aplicação backend completa
- **Fornecimento de arquivos estáticos**: CSS e recursos servidos pelo servidor
- **Geração de HTML pelo servidor**: Páginas dinâmicas criadas no backend
- **Processamento de formulários**: Recebimento e validação de dados
- **Templates HTML dinâmicos**: Respostas personalizadas baseadas nos dados
- **Rotas API com JSON**: Simulação de uma API REST
- **Diferenciação de rotas**: Estáticas, templates e API

### 📋 Endpoints Disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Página inicial com informações do projeto |
| GET | `/formulario` | Formulário de contato gerado pelo servidor |
| POST | `/processar-formulario` | Processa dados do formulário e retorna resposta |
| GET | `/api/dados` | API que retorna dados em JSON |
| GET | `/api/cardapio` | API que retorna cardápio de hambúrgueres em JSON |
| POST | `/api/cardapio` | API para adicionar novo hambúrguer ao cardápio |
| GET | `/api/contato` | API que retorna dados de contato em JSON |
| GET | `/cardapio` | Página HTML do cardápio de hambúrgueres |
| GET | `/gerenciar-cardapio` | Página para gerenciar o cardápio (adicionar hambúrgueres) |
| GET | `/contato` | Página de informações de contato |
| GET | `/static/*` | Arquivos estáticos (CSS, imagens) |

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web para Node.js
- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização e animações
- **JavaScript**: Lógica do servidor
- **Body Parser**: Processamento de dados de formulário

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm ou yarn

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd jornada-levty-backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   - Abra seu navegador
   - Acesse: `http://localhost:3000`

### Modo de desenvolvimento
```bash
npm run dev
```
(Requer nodemon instalado globalmente: `npm install -g nodemon`)

## 🏗️ Estrutura do Projeto

```
jornada-levty-backend/
├── server.js              # Servidor principal com Express
├── package.json           # Configurações e dependências
├── README.md              # Documentação
└── js/                    # Arquivos estáticos
    ├── main.html          # Página original (não utilizada pelo servidor)
    ├── style.css          # Estilos CSS
    └── imagem.png         # Imagem do projeto
```

## 🔧 Conceitos Demonstrados

### 1. **Protocolo HTTP**
- Requisições GET e POST
- Códigos de status (200, 400, 404)
- Headers e body das requisições

### 2. **Servidor Web**
- Criação de servidor com Express
- Middleware para processamento de dados
- Roteamento de requisições

### 3. **Geração de HTML**
- Templates HTML dinâmicos
- Inserção de dados do usuário
- Respostas personalizadas

### 4. **Processamento de Dados**
- Validação de formulários
- Parsing de dados (body-parser)
- Tratamento de erros

### 5. **APIs REST**
- Endpoint JSON
- Estrutura de resposta padronizada
- Simulação de dados de API

## 🎨 Interface

A aplicação mantém o design original do portfolio com:
- Fundo animado
- Design responsivo
- Elementos flutuantes
- Gradientes e efeitos visuais
- Formulários estilizados

## 📚 Aprendizados

Esta aplicação demonstra como:

1. **Servidores funcionam**: Processamento de requisições HTTP
2. **Dados são trocados**: Formulários e APIs
3. **HTML é gerado**: Templates dinâmicos no backend
4. **Rotas são organizadas**: Diferentes tipos de resposta
5. **APIs são estruturadas**: Padrões REST básicos

## 👩‍💻 Desenvolvedora

**Samira Kelly da Costa Reis**
- Desenvolvedora Backend
- Especializada em APIs e microsserviços
- Transformando ideias em soluções robustas

## 📄 Licença

MIT License - Sinta-se livre para usar, modificar e distribuir.

---

**Jornada Levty** - Resgatando os fundamentos do desenvolvimento backend! 🚀