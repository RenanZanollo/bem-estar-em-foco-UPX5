import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// import OpenAI from 'openai';

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Desabilitado o cliente da OpenAI para o MVP
// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/recommendations', async (req, res) => {
  try {
    const { answers } = req.body;

    // 🔹 Esse prompt será usado futuramente com a IA
    // const prompt = `O usuário respondeu o seguinte sobre seus hábitos:\n- Sono: ${answers.sono}\n- Alimentação: ${answers.alimentacao}\n- Humor: ${answers.humor}\n- Atividade física: ${answers.atividade}\n\nGere recomendações práticas de saúde e bem-estar.`;

    // 🔹 Chamadas à IA estão comentadas por enquanto
    // const completion = await client.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [{ role: 'user', content: prompt }],
    // });

    // const recommendations = completion.choices[0].message.content;

    // 🔹 Resposta mocada para teste do front-end
    const recommendations = `
      💤 Durma pelo menos 7 a 8 horas por noite;
      🍎 Mantenha uma alimentação equilibrada e evite ultraprocessados;
      🏃 Faça caminhadas leves 3x por semana;
      😄 Tire momentos do dia para relaxar e cuidar da sua mente.
    `;

    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar recomendações.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
