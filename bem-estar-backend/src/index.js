// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Firebase Admin setup ----------
const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH || path.join(process.cwd(), "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.warn(
    "Aviso: serviceAccountKey.json não encontrado. Crie o arquivo e atualize FIREBASE_SERVICE_ACCOUNT_PATH se necessário."
  );
}

let admin;
try {
  const adminImport = await import("firebase-admin");
  admin = adminImport.default || adminImport;
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (err) {
  console.error("Erro ao inicializar Firebase Admin:", err.message);
  // Continua sem admin para evitar crash — endpoints de registro verificarão admin
}

// ---------- OpenAI client ----------
let openaiClient = null;
if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
  console.warn("OPENAI_API_KEY não definida. A rota /api/gerarResultado não funcionará até configurar.");
}

// Backwards-compatible mock route
app.post("/api/recommendations", async (req, res) => {
  try {
    const { answers } = req.body || {};
    const recommendations = `
      💤 Durma 7-8h por noite
      🍎 Mantenha refeições regulares e equilibradas
      🏃 Pratique atividade física leve 3x/semana
      😌 Faça pausas para relaxamento diário
    `;
    res.json({ recommendations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno" });
  }
});

/**
 * Rota: POST /api/register
 * Body: { email, password, displayName }
 * Retorna: { uid, customToken } ou erro
 */
app.post("/api/register", async (req, res) => {
  try {
    if (!admin || !admin.auth) {
      return res.status(500).json({ error: "Firebase Admin não está configurado no servidor." });
    }

    const { email, password, displayName } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email e senha são obrigatórios." });

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || undefined,
    });

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ uid: userRecord.uid, customToken });
  } catch (err) {
    console.error("Erro /api/register:", err);
    let message = "Erro ao criar usuário.";
    if (err.code) message += ` ${err.code}`;
    return res.status(500).json({ error: message });
  }
});

/**
 * NOVA ROTA: POST /api/gerarResultado
 * Body esperado: { section?: string, answers?: object, prompt?: string }
 * - Se frontend enviar prompt pronto, o backend usa esse prompt.
 * - Caso contrário, backend pode montar um prompt básico com section+answers.
 */
app.post("/api/gerarResultado", async (req, res) => {
  try {
    if (!openaiClient) return res.status(500).json({ error: "OpenAI não configurado no servidor." });

    const { section, answers, prompt: promptFromClient } = req.body || {};

    // Se o frontend já montou um prompt, use-o. Caso contrário, cria um prompt simples.
    const prompt =
      (promptFromClient && String(promptFromClient)) ||
      (() => {
        const header = `Você é um assistente de saúde que fornece recomendações práticas e seguras. Seção: ${section ||
          "geral"}. Receba abaixo as respostas do usuário (estruturadas por etapas).`;
        const body = JSON.stringify(answers || {}, null, 2);
        return `${header}\n\nDados:\n${body}\n\nCom base nesses dados, gere recomendações práticas, concisas e fáceis de aplicar. Use bullet points.`;
      })();

    // Chamada à OpenAI (chat completion)
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini", // adapte se quiser outro modelo
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.8,
    });

    // Compatibilidade: tente extrair o texto da resposta
    const choices = completion?.choices || [];
    let text = "";
    if (choices.length > 0) {
      text = (choices[0].message && choices[0].message.content) || choices[0].text || "";
    }

    res.json({ recommendations: text.trim() });
  } catch (err) {
    console.error("Erro /api/gerarResultado:", err);
    res.status(500).json({ error: "Erro ao gerar resultado com OpenAI" });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/api/test", (req, res) => {
  res.json({ ok: true, message: "Backend está respondendo!" });
});
app.listen(3000, "0.0.0.0", () => console.log(`Backend rodando na porta ${PORT}`));
