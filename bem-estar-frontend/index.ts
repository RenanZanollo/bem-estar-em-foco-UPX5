import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recommendations", async (req: Request, res: Response) => {
  const answers = req.body;

  try {
    const prompt = `
      Baseado nas seguintes respostas: ${JSON.stringify(answers)},
      gere recomendações práticas de bem-estar.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({
      recommendations: response.data.choices[0].message.content,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000 🚀"));
