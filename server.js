const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sistema de armazenamento em memória para o cardápio
let cardapio = [
    {
        "id": 1,
        "nome": "DevBurger Clássico",
        "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
    },
    {
        "id": 2,
        "nome": "Burger de Bacon",
        "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
    },
    {
        "id": 3,
        "nome": "Commit Veggie",
        "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
    },
    {
        "id": 4,
        "nome": "Frontend Supreme",
        "ingredientes": "Pão de batata, Carne 200g, Queijo suíço, Cebola roxa, Picles, Molho de mostarda e mel"
    }
];

// Função para gerar ID único
function gerarId() {
    return Math.max(...cardapio.map(item => item.id)) + 1;
}

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta js
app.use('/static', express.static(path.join(__dirname, 'js')));

// Rota principal - página inicial
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jornada Levty - Backend</title>
        <link rel="stylesheet" href="/static/style.css">
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                </ul>
                <a class="cta-button" href="/contato">Vamos Conversar</a>
            </div>
        </header>

        <main>
            <section class="hero" id="inicio">
                <div class="floating-icon">⚡</div>
                <div class="floating-icon">🚀</div>
                <div class="floating-icon">💻</div>
                
                <div class="hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title">Desenvolvedora Backend</h1>
                        <p class="hero-subtitle">
                            Transformo ideias em soluções robustas e escaláveis. 
                            Especializada em APIs, microsserviços e arquiteturas de alta performance.
                        </p>
                        <div class="hero-buttons">
                            <a class="cta-button" href="/formulario">Testar Formulário</a>
                            <a class="btn-secondary" href="/api/dados">Ver API</a>
                            <a class="btn-secondary" href="/cardapio">Ver Cardápio</a>
                            <a class="btn-secondary" href="/gerenciar-cardapio">Gerenciar Cardápio</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="info-section">
                <h2>Jornada Levty - Fundamentos do Backend</h2>
                <p>Esta aplicação demonstra os conceitos fundamentais do desenvolvimento backend:</p>
                <ul>
                    <li>✅ Servidor Node.js com Express</li>
                    <li>✅ Fornecimento de arquivos estáticos</li>
                    <li>✅ Geração de HTML pelo servidor</li>
                    <li>✅ Processamento de formulários</li>
                    <li>✅ Templates HTML dinâmicos</li>
                    <li>✅ Rotas API com JSON</li>
                </ul>
            </section>
        </main>
    </body>
    </html>
    `;
    res.send(html);
});

// Rota para formulário - página gerada pelo servidor
app.get('/formulario', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulário - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .form-container {
                max-width: 600px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                color: #fff;
                font-weight: bold;
            }
            .form-group input, .form-group textarea, .form-group select {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 16px;
            }
            .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
            }
            .submit-btn {
                background: linear-gradient(45deg, #007bff, #0056b3);
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
            }
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
            .back-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="form-container">
                <h2>Formulário de Contato</h2>
                <p>Preencha os dados abaixo para testar o processamento backend:</p>
                
                <form action="/processar-formulario" method="POST">
                    <div class="form-group">
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone">
                    </div>
                    
                    <div class="form-group">
                        <label for="assunto">Assunto:</label>
                        <select id="assunto" name="assunto" required>
                            <option value="">Selecione um assunto</option>
                            <option value="projeto">Projeto</option>
                            <option value="consulta">Consulta</option>
                            <option value="parceria">Parceria</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="mensagem">Mensagem:</label>
                        <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Enviar Mensagem</button>
                </form>
                
                <a href="/" class="back-link">← Voltar ao Início</a>
            </div>
        </main>
    </body>
    </html>
    `;
    res.send(html);
});

// Rota para processar dados do formulário
app.post('/processar-formulario', (req, res) => {
    const { nome, email, telefone, assunto, mensagem } = req.body;
    
    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erro - Jornada Levty</title>
            <link rel="stylesheet" href="/static/style.css">
            <style>
                .error-container {
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 30px;
                    background: rgba(220, 53, 69, 0.1);
                    border-radius: 15px;
                    border: 1px solid rgba(220, 53, 69, 0.3);
                    text-align: center;
                }
                .error-title {
                    color: #dc3545;
                    margin-bottom: 20px;
                }
                .back-link {
                    display: inline-block;
                    margin-top: 20px;
                    color: #007bff;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="animated-bg"></div>
            <div class="error-container">
                <h2 class="error-title">Erro no Formulário</h2>
                <p>Por favor, preencha todos os campos obrigatórios.</p>
                <a href="/formulario" class="back-link">← Voltar ao Formulário</a>
            </div>
        </body>
        </html>
        `);
    }
    
    // Simulação de processamento
    const dataEnvio = new Date().toLocaleString('pt-BR');
    const idMensagem = Math.floor(Math.random() * 10000);
    
    // Template HTML com os dados processados
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sucesso - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .success-container {
                max-width: 600px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(40, 167, 69, 0.1);
                border-radius: 15px;
                border: 1px solid rgba(40, 167, 69, 0.3);
            }
            .success-title {
                color: #28a745;
                margin-bottom: 20px;
                text-align: center;
            }
            .data-item {
                margin: 10px 0;
                padding: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
            }
            .data-label {
                font-weight: bold;
                color: #007bff;
            }
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
            .back-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="success-container">
                <h2 class="success-title">✅ Mensagem Enviada com Sucesso!</h2>
                
                <div class="data-item">
                    <span class="data-label">ID da Mensagem:</span> #${idMensagem}
                </div>
                
                <div class="data-item">
                    <span class="data-label">Nome:</span> ${nome}
                </div>
                
                <div class="data-item">
                    <span class="data-label">E-mail:</span> ${email}
                </div>
                
                ${telefone ? `<div class="data-item">
                    <span class="data-label">Telefone:</span> ${telefone}
                </div>` : ''}
                
                <div class="data-item">
                    <span class="data-label">Assunto:</span> ${assunto}
                </div>
                
                <div class="data-item">
                    <span class="data-label">Mensagem:</span> ${mensagem}
                </div>
                
                <div class="data-item">
                    <span class="data-label">Data de Envio:</span> ${dataEnvio}
                </div>
                
                <p style="margin-top: 20px; text-align: center; color: #28a745;">
                    <strong>Dados processados com sucesso pelo servidor backend!</strong>
                </p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="/formulario" class="back-link">← Enviar Nova Mensagem</a>
                    <br>
                    <a href="/" class="back-link">← Voltar ao Início</a>
                </div>
            </div>
        </main>
    </body>
    </html>
    `;
    
    res.send(html);
});

// Rota API que retorna JSON (simulando uma API)
app.get('/api/dados', (req, res) => {
    // Simulação de dados de uma API
    const dados = {
        status: "success",
        message: "Dados da API - Jornada Levty",
        timestamp: new Date().toISOString(),
        desenvolvedora: {
            nome: "Samira Kelly da Costa Reis",
            especialidade: "Desenvolvedora Backend",
            tecnologias: ["Node.js", "Express", "JavaScript", "APIs", "Microsserviços"],
            experiencia: "Transformação de ideias em soluções robustas e escaláveis"
        },
        projeto: {
            nome: "Jornada Levty - Fundamentos do Backend",
            objetivo: "Compreender os fundamentos do desenvolvimento backend",
            tecnologias_utilizadas: ["Node.js", "Express", "HTML", "CSS", "JavaScript"],
            funcionalidades: [
                "Servidor web com Express",
                "Fornecimento de arquivos estáticos",
                "Geração de HTML pelo servidor",
                "Processamento de formulários",
                "Templates HTML dinâmicos",
                "Rotas API com JSON"
            ]
        },
        contato_exemplo: {
            nome: "Tram Anh Nguyen",
            email: "tramanh@gmail.com",
            assunto: "Sugestão de Evento",
            mensagem: "Gostaria de sugerir que vocês organizassem um evento de degustação de novos lanches!"
        },
        endpoints: {
            "GET /": "Página inicial",
            "GET /formulario": "Formulário de contato",
            "POST /processar-formulario": "Processa dados do formulário",
            "GET /api/dados": "Retorna dados em JSON (esta rota)",
            "GET /api/cardapio": "Retorna cardápio de hambúrgueres",
            "GET /api/contato": "Retorna dados de contato em JSON",
            "GET /static/*": "Arquivos estáticos"
        }
    };
    
    res.json(dados);
});

// Rota API específica para o cardápio de hambúrgueres (JSON)
app.get('/api/cardapio', (req, res) => {
    res.json(cardapio);
});

// Rota para adicionar novo hambúrguer (POST)
app.post('/api/cardapio', (req, res) => {
    const { nome, ingredientes } = req.body;
    
    // Validação básica
    if (!nome || !ingredientes) {
        return res.status(400).json({
            error: "Nome e ingredientes são obrigatórios"
        });
    }
    
    // Criar novo hambúrguer
    const novoBurger = {
        id: gerarId(),
        nome: nome,
        ingredientes: ingredientes
    };
    
    // Adicionar ao cardápio
    cardapio.push(novoBurger);
    
    res.status(201).json({
        message: "Hambúrguer adicionado com sucesso!",
        burger: novoBurger
    });
});

// Rota API específica para dados de contato (JSON)
app.get('/api/contato', (req, res) => {
    const contato = {
        "nome": "Tram Anh Nguyen",
        "email": "tramanh@gmail.com",
        "assunto": "Sugestão de Evento",
        "mensagem": "Gostaria de sugerir que vocês organizassem um evento de degustação de novos lanches!"
    };
    
    res.json(contato);
});

// Rota para página de gerenciamento do cardápio (HTML)
app.get('/gerenciar-cardapio', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gerenciar Cardápio - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .gerenciar-container {
                max-width: 1000px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .gerenciar-title {
                text-align: center;
                color: #007bff;
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            .form-section {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 30px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                color: #fff;
                font-weight: bold;
            }
            .form-group input, .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 16px;
            }
            .form-group input:focus, .form-group textarea:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
            }
            .submit-btn {
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
            }
            .cardapio-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .burger-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.3s ease;
            }
            .burger-card:hover {
                transform: translateY(-3px);
            }
            .burger-id {
                background: linear-gradient(45deg, #007bff, #0056b3);
                color: white;
                padding: 3px 10px;
                border-radius: 15px;
                font-size: 0.8em;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 10px;
            }
            .burger-nome {
                color: #fff;
                font-size: 1.3em;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .burger-ingredientes {
                color: #ccc;
                font-size: 0.9em;
                line-height: 1.4;
            }
            .success-message {
                background: rgba(40, 167, 69, 0.1);
                border: 1px solid rgba(40, 167, 69, 0.3);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 20px;
                color: #28a745;
                text-align: center;
                display: none;
            }
            .error-message {
                background: rgba(220, 53, 69, 0.1);
                border: 1px solid rgba(220, 53, 69, 0.3);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 20px;
                color: #dc3545;
                text-align: center;
                display: none;
            }
            .nav-links {
                text-align: center;
                margin-top: 30px;
            }
            .nav-link {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
                margin: 0 15px;
            }
            .nav-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                    <li class="nav-item"><a href="/cardapio" class="nav-link">Cardápio</a></li>
                    <li class="nav-item"><a href="/gerenciar-cardapio" class="nav-link">Gerenciar</a></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="gerenciar-container">
                <h2 class="gerenciar-title">🍔 Gerenciar Cardápio</h2>
                
                <div class="success-message" id="successMessage">
                    Hambúrguer adicionado com sucesso!
                </div>
                
                <div class="error-message" id="errorMessage">
                    Erro ao adicionar hambúrguer!
                </div>
                
                <div class="form-section">
                    <h3>➕ Adicionar Novo Hambúrguer</h3>
                    <form id="addBurgerForm">
                        <div class="form-group">
                            <label for="nome">Nome do Hambúrguer:</label>
                            <input type="text" id="nome" name="nome" required placeholder="Ex: Backend Deluxe">
                        </div>
                        
                        <div class="form-group">
                            <label for="ingredientes">Ingredientes:</label>
                            <textarea id="ingredientes" name="ingredientes" rows="4" required placeholder="Ex: Pão brioche, Carne 150g, Queijo cheddar, Alface, Tomate, Molho especial"></textarea>
                        </div>
                        
                        <button type="submit" class="submit-btn">➕ Adicionar Hambúrguer</button>
                    </form>
                </div>
                
                <div class="form-section">
                    <h3>📋 Cardápio Atual</h3>
                    <div class="cardapio-list" id="cardapioList">
                        <!-- Os hambúrgueres serão carregados aqui via JavaScript -->
                    </div>
                </div>
                
                <div class="nav-links">
                    <a href="/cardapio" class="nav-link">Ver Cardápio Completo</a>
                    <a href="/api/cardapio" class="nav-link" target="_blank">Ver API JSON</a>
                    <a href="/" class="nav-link">← Voltar ao Início</a>
                </div>
            </div>
        </main>

        <script>
            // Função para carregar o cardápio
            async function carregarCardapio() {
                try {
                    const response = await fetch('/api/cardapio');
                    const cardapio = await response.json();
                    
                    const cardapioList = document.getElementById('cardapioList');
                    cardapioList.innerHTML = '';
                    
                    cardapio.forEach(burger => {
                        const burgerCard = document.createElement('div');
                        burgerCard.className = 'burger-card';
                        burgerCard.innerHTML = \`
                            <span class="burger-id">#\${burger.id}</span>
                            <h4 class="burger-nome">\${burger.nome}</h4>
                            <p class="burger-ingredientes">\${burger.ingredientes}</p>
                        \`;
                        cardapioList.appendChild(burgerCard);
                    });
                } catch (error) {
                    console.error('Erro ao carregar cardápio:', error);
                }
            }
            
            // Função para adicionar hambúrguer
            async function adicionarBurger(event) {
                event.preventDefault();
                
                const formData = new FormData(event.target);
                const nome = formData.get('nome');
                const ingredientes = formData.get('ingredientes');
                
                try {
                    const response = await fetch('/api/cardapio', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nome, ingredientes })
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok) {
                        // Sucesso
                        document.getElementById('successMessage').style.display = 'block';
                        document.getElementById('errorMessage').style.display = 'none';
                        
                        // Limpar formulário
                        event.target.reset();
                        
                        // Recarregar cardápio
                        carregarCardapio();
                        
                        // Esconder mensagem após 3 segundos
                        setTimeout(() => {
                            document.getElementById('successMessage').style.display = 'none';
                        }, 3000);
                    } else {
                        // Erro
                        document.getElementById('errorMessage').textContent = result.error || 'Erro ao adicionar hambúrguer';
                        document.getElementById('errorMessage').style.display = 'block';
                        document.getElementById('successMessage').style.display = 'none';
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    document.getElementById('errorMessage').textContent = 'Erro de conexão';
                    document.getElementById('errorMessage').style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                }
            }
            
            // Event listeners
            document.getElementById('addBurgerForm').addEventListener('submit', adicionarBurger);
            
            // Carregar cardápio ao carregar a página
            carregarCardapio();
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// Rota para página do cardápio (HTML)
app.get('/cardapio', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cardápio - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .cardapio-container {
                max-width: 800px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .cardapio-title {
                text-align: center;
                color: #007bff;
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            .burger-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .burger-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
            }
            .burger-id {
                background: linear-gradient(45deg, #007bff, #0056b3);
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 10px;
            }
            .burger-nome {
                color: #fff;
                font-size: 1.5em;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .burger-ingredientes {
                color: #ccc;
                line-height: 1.6;
                font-size: 1.1em;
            }
            .api-info {
                background: rgba(0, 123, 255, 0.1);
                border: 1px solid rgba(0, 123, 255, 0.3);
                border-radius: 10px;
                padding: 20px;
                margin-top: 30px;
                text-align: center;
            }
            .api-link {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
                font-size: 1.1em;
            }
            .api-link:hover {
                text-decoration: underline;
            }
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
            .back-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                    <li class="nav-item"><a href="/cardapio" class="nav-link">Cardápio</a></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="cardapio-container">
                <h2 class="cardapio-title">🍔 Cardápio DevBurger</h2>
                <p style="text-align: center; color: #ccc; margin-bottom: 30px;">
                    Uma demonstração de API com dados de hambúrgueres - Jornada Levty Backend
                </p>
                
                <div class="burger-card">
                    <span class="burger-id">#1</span>
                    <h3 class="burger-nome">DevBurger Clássico</h3>
                    <p class="burger-ingredientes">
                        <strong>Ingredientes:</strong> Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial
                    </p>
                </div>
                
                <div class="burger-card">
                    <span class="burger-id">#2</span>
                    <h3 class="burger-nome">Burger de Bacon</h3>
                    <p class="burger-ingredientes">
                        <strong>Ingredientes:</strong> Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue
                    </p>
                </div>
                
                <div class="burger-card">
                    <span class="burger-id">#3</span>
                    <h3 class="burger-nome">Commit Veggie</h3>
                    <p class="burger-ingredientes">
                        <strong>Ingredientes:</strong> Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas
                    </p>
                </div>
                
                <div class="api-info">
                    <h3>🔗 Acesse a API JSON</h3>
                    <p>Para ver os dados em formato JSON (como uma API real):</p>
                    <a href="/api/cardapio" class="api-link" target="_blank">/api/cardapio</a>
                    <p style="margin-top: 10px; font-size: 0.9em; color: #999;">
                        Esta rota retorna os mesmos dados, mas em formato JSON puro
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="/" class="back-link">← Voltar ao Início</a>
                </div>
            </div>
        </main>
    </body>
    </html>
    `;
    res.send(html);
});

// Rota para contato (página estática)
app.get('/contato', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contato - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .contact-container {
                max-width: 800px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .contact-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .contact-item {
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                text-align: center;
            }
            .contact-item h3 {
                color: #007bff;
                margin-bottom: 10px;
            }
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <header>
            <div class="nav-container">
                <h1 class="name">Samira Kelly da Costa Reis</h1>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="/formulario" class="nav-link">Formulário</a></li>
                    <li class="nav-item"><a href="/api/dados" class="nav-link">API</a></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="contact-container">
                <h2>Informações de Contato</h2>
                <p>Entre em contato para projetos, consultas ou parcerias.</p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <h3>📧 E-mail</h3>
                        <p>samira.kelly@exemplo.com</p>
                    </div>
                    <div class="contact-item">
                        <h3>📱 LinkedIn</h3>
                        <p>linkedin.com/in/samira-kelly</p>
                    </div>
                    <div class="contact-item">
                        <h3>💼 GitHub</h3>
                        <p>github.com/samira-kelly</p>
                    </div>
                    <div class="contact-item">
                        <h3>🌐 Portfolio</h3>
                        <p>samira-kelly.dev</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="/formulario" class="cta-button">Enviar Mensagem</a>
                    <br>
                    <a href="/" class="back-link">← Voltar ao Início</a>
                </div>
            </div>
        </main>
    </body>
    </html>
    `;
    res.send(html);
});

// Middleware para tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página Não Encontrada - Jornada Levty</title>
        <link rel="stylesheet" href="/static/style.css">
        <style>
            .error-container {
                max-width: 600px;
                margin: 50px auto;
                padding: 30px;
                background: rgba(255, 193, 7, 0.1);
                border-radius: 15px;
                border: 1px solid rgba(255, 193, 7, 0.3);
                text-align: center;
            }
            .error-title {
                color: #ffc107;
                margin-bottom: 20px;
            }
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        <div class="error-container">
            <h2 class="error-title">404 - Página Não Encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <a href="/" class="back-link">← Voltar ao Início</a>
        </div>
    </body>
    </html>
    `);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponíveis:`);
    console.log(`   - GET / (Página inicial)`);
    console.log(`   - GET /formulario (Formulário de contato)`);
    console.log(`   - POST /processar-formulario (Processa formulário)`);
    console.log(`   - GET /api/dados (API JSON)`);
    console.log(`   - GET /contato (Página de contato)`);
    console.log(`   - GET /static/* (Arquivos estáticos)`);
}); 