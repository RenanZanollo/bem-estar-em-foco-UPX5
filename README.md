📱 Bem-estar em Foco

O Bem-estar em Foco é um aplicativo mobile desenvolvido em React Native (com Expo), integrado a um backend em NestJS, que tem como objetivo ajudar pessoas a melhorarem seus hábitos de vida de forma simples e motivacional.

A ideia é que, através de perguntas rápidas do dia a dia, o usuário receba um retorno personalizado e positivo da API da OpenAI, destacando os pontos fortes de seus hábitos atuais e sugerindo pequenas mudanças para evoluir constantemente.

✨ Funcionalidades atuais

🔑 Login e autenticação com Firebase Auth

🏠 Tela principal com navegação simples e intuitiva

✅ Novo Check: formulário com perguntas como:

"Como está seu sono?"

"Como você está se alimentando?"

🤖 Análise motivacional: respostas processadas pela API da OpenAI, trazendo orientações personalizadas de forma positiva e encorajadora

🚀 Funcionalidades futuras

⏰ Lembretes personalizados para não esquecer seus hábitos

📊 Histórico de respostas para acompanhar sua evolução

📈 Gráficos de progresso para visualizar melhorias ao longo do tempo

🛠️ Tecnologias utilizadas
Frontend

React Native com Expo

Backend

NestJS

Serviços

API da OpenAI para geração de respostas motivacionais

Firebase para banco de dados

Firebase Auth para autenticação segura

🎯 Objetivo do app

O Bem-estar em Foco busca ajudar pessoas que querem melhorar sua qualidade de vida, mas não sabem por onde começar.
Nosso foco é motivar: valorizar o primeiro passo dado pelo usuário (buscar ajuda) e mostrar, de forma positiva, como ele pode evoluir gradualmente em seus hábitos.

📌 Estrutura inicial do projeto

frontend/ → Aplicativo em React Native com Expo

backend/ → API em NestJS para comunicação com Firebase e OpenAI

⚙️ Como rodar o projeto
Pré-requisitos

Node.js (versão LTS recomendada)

Expo CLI

Nest CLI

Conta no Firebase configurada

Chave da API da OpenAI

🔹 Clonando o repositório
git clone https://github.com/seu-usuario/bem-estar-em-foco.git
cd bem-estar-em-foco

🔹 Frontend (React Native + Expo)

Vá para a pasta do frontend:

cd frontend


Instale as dependências:

npm install


Configure o arquivo .env com as variáveis necessárias:

FIREBASE_API_KEY=xxxx
FIREBASE_AUTH_DOMAIN=xxxx
FIREBASE_PROJECT_ID=xxxx
FIREBASE_STORAGE_BUCKET=xxxx
FIREBASE_MESSAGING_SENDER_ID=xxxx
FIREBASE_APP_ID=xxxx
BACKEND_URL=http://localhost:3000


Rode o app:

npx expo start

🔹 Backend (NestJS)

Vá para a pasta do backend:

cd backend


Instale as dependências:

npm install


Configure o arquivo .env com:

OPENAI_API_KEY=xxxx
FIREBASE_PROJECT_ID=xxxx
FIREBASE_PRIVATE_KEY=xxxx
FIREBASE_CLIENT_EMAIL=xxxx


Rode o servidor:

npm run start:dev

🔮 Próximos passos

Implementar sistema de notificações push para lembretes

Criar dashboard com histórico e gráficos

Melhorar personalização das recomendações da IA

⚡ Bem-estar em Foco – o primeiro passo para uma vida melhor começa aqui.
