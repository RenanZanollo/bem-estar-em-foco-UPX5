import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/recommendations", async (req, res) => {
  try {
    const { answers } = req.body;

    const prompt = `
    O usuário respondeu o seguinte sobre seus hábitos:
    - Sono: ${answers.sono}
    - Alimentação: ${answers.alimentacao}
    - Humor: ${answers.humor}
    - Atividade física: ${answers.atividade}

    Gere um texto amigável com dicas personalizadas de saúde e bem-estar,
    abordando possíveis melhorias e encorajando o usuário com uma linguagem leve.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const recommendations = completion.choices[0].message.content;
    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar recomendações." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
