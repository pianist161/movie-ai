// src/services/chatWithAi.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // только для клиентской разработки
});

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function chatWithMovieAI(messages: ChatMessage[], movieTitle: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "user",
        content: `Ты киновед. Помогай пользователю обсуждать фильм "${movieTitle}". Отвечай понятно и по делу.`,
      },
      ...messages,
    ],
  });

  return response.choices[0].message?.content || "Нет ответа от AI.";
}
