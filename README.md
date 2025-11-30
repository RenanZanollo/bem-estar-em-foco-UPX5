📱 Bem-Estar em Foco
<p align="center"> <img src="https://via.placeholder.com/600x250?text=Bem-Estar+em+Foco" /> </p> <p align="center"> <i>“O primeiro passo para uma vida melhor começa com você.”</i> </p>
🔰 Badges
<p align="center"> <img src="https://img.shields.io/badge/React_Native-Expo-blue?logo=react" /> <img src="https://img.shields.io/badge/Node-18.19.1-green?logo=node.js" /> <img src="https://img.shields.io/badge/NestJS-Backend-red?logo=nestjs" /> <img src="https://img.shields.io/badge/Firebase-Auth%20%7C%20DB-yellow?logo=firebase" /> <img src="https://img.shields.io/badge/OpenAI-API-black?logo=openai" /> <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange" /> </p>
📖 Sobre o Projeto

O Bem-Estar em Foco é um aplicativo mobile criado para ajudar pessoas a desenvolverem hábitos saudáveis, com recomendações personalizadas e motivacionais geradas pela API da OpenAI.

Através de perguntas simples sobre sono, alimentação, humor e rotina, o app devolve orientações práticas e positivas que ajudam o usuário a evoluir de forma leve e gradual.

🎯 Objetivo

✔ Ajudar quem quer melhorar hábitos, mas não sabe por onde começar
✔ Criar uma experiência acolhedora baseada em motivação
✔ Usar IA para recomendações personalizadas
✔ Tornar acessível o autocuidado por meio da tecnologia

👥 Público-Alvo

Estudantes

Trabalhadores com rotina intensa

Pessoas buscando autocuidado

Instituições, empresas e programas de saúde

✨ Funcionalidades Principais
🧠 Inteligência Artificial Motivacional

Recomendações sobre hábitos baseadas nas respostas do usuário.

🔑 Autenticação

Login via Firebase Auth.

📝 Registro Diário

Formulário simples para o check-in do dia.

📲 Interface Intuitiva

Desenvolvida em React Native + Expo.

🚀 Funcionalidades Futuras
Feature	Status
⏰ Lembretes Personalizados	🔜 Em breve
📊 Histórico de Hábitos	🔜 Em breve
📈 Gráficos de Progresso	🔜 Em breve
🎯 IA com contexto histórico	🔜 Em estudo
🛠️ Tecnologias Utilizadas
Frontend

React Native

Expo

TypeScript

Backend

NestJS

TypeScript

Serviços

Firebase Auth

Firebase Firestore

OpenAI API

⚠️ Requisitos Importantes

⚠ Para evitar erros e garantir compatibilidade total o projeto recomenda:

✔ Node.js 18.19.1
Usando NVM:
nvm install 18.19.1
nvm use 18.19.1

🏗 Arquitetura da Solução
flowchart LR
A[App Mobile - Expo] --> B[Backend - NestJS]
B --> C[Firebase Auth]
B --> D[Firebase Firestore]
B --> E[OpenAI API]

📂 Estrutura do Projeto
bem-estar-em-foco/
│
├── frontend/
│   ├── src/
│   ├── app/
│   └── .env
│
└── backend/
    ├── src/
    ├── prisma/
    └── .env

📸 Screenshots (adicione depois)
/assets/images/screenshot1.png  
/assets/images/screenshot2.png  
/assets/gifs/demo.gif  


Exemplo:

<p align="center"> <img src="https://via.placeholder.com/300x600?text=Tela+Inicial" /> <img src="https://via.placeholder.com/300x600?text=Formulário+Check" /> </p>
⚙️ Como Rodar o Projeto
🔧 Pré-requisitos

Node.js 18.19.1

Expo CLI

Nest CLI

Firebase configurado

Chave da OpenAI

🔹 1. Clonar o Repositório
git clone https://github.com/RenanZanollo/bem-estar-em-foco-UPX5.git
cd bem-estar-em-foco

🔹 2. Frontend – React Native + Expo
cd frontend
npm install

Criar .env:
FIREBASE_API_KEY=xxxx
FIREBASE_AUTH_DOMAIN=xxxx
FIREBASE_PROJECT_ID=xxxx
FIREBASE_STORAGE_BUCKET=xxxx
FIREBASE_MESSAGING_SENDER_ID=xxxx
FIREBASE_APP_ID=xxxx

BACKEND_URL=http://localhost:3000

Iniciar o App
npx expo start

🔹 3. Backend – NestJS
cd backend
npm install

Criar .env:
OPENAI_API_KEY=xxxx
FIREBASE_PROJECT_ID=xxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=xxxx

Rodar servidor:
npm run start:dev

🧪 Testes

Backend (NestJS):

npm run test
npm run test:e2e

🧱 .env.example
Frontend
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
BACKEND_URL=

Backend
OPENAI_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

🛤️ Roadmap

 Configurar Firebase Auth

 Criar protótipo no Figma

 Implementar login

 Integrar OpenAI

 Criar lembretes

 Criar tabela histórica

 Criar gráficos

 Publicar na Play Store

🤝 Contribuições

Contribuições são bem-vindas!

Para contribuir:

Faça um fork

Crie uma branch: feature/nova-feature

Envie seu PR

👥 Autores
Nome	Função
Carlos Augusto	Documentação
Giovani Boccardo Ruiz	Backend
Guilherme Mendes Alcantara	Documentação + Gestão
Isabela Queiroz Ferreira	Design + Documentação final
Renan Zanollo Amorim	Full-stack Developer
📄 Licença

Este projeto é de uso acadêmico (UPX5 – FACENS).

⚡ Bem-estar em Foco
“Um passo de cada vez — e nós caminhamos com você.”
