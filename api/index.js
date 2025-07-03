import 'dotenv/config'
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/review-idea", async (req, res) => {
  const { idea, jokeMode } = req.body;

  if (!idea) return res.status(400).json({ error: "Idea is required" });

  try {

    const positiveSystem = {
      role: 'system',
      content: jokeMode
        ? 'You are a witty assistant who gives humorous but encouraging feedback. Keep it light and max 40 words.'
        : 'You are a friendly assistant who provides concise, encouraging positive feedback. Limit to max 40 words.',
    };

    const negativeSystem = {
      role: 'system',
      content: jokeMode
        ? 'You are a sarcastic, darkly humorous assistant. Give blunt, snarky, sometimes outrageous responses. You never hesitate to mock a bad idea, but keep it witty and under 40 words.'
        : 'You are a brutally honest, unfiltered critic. Call out nonsense. Don\'t sugarcoat anything. You highlight flaws, no positives — keep it under 40 words.',
    };


    const userMessage = { role: "user", content: `Review this idea: "${idea}"` };

    const [positiveResponse, negativeResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [positiveSystem, userMessage],
        max_tokens: 50,
        temperature: 0.7,
      }),
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [negativeSystem, userMessage],
        max_tokens: 50,
        temperature: 0.7,
      }),
    ]);

    res.json({
      positive: positiveResponse.choices[0].message.content.trim(),
      negative: negativeResponse.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
