const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function chatWithOpenRouter(prompt: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // replace with your domain in production
      "X-Title": "Movie AI Chat"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free", // free model
      messages: [
        {
          role: "system",
          content: "You are a smart movie assistant. Respond briefly and stay on topic."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();

  const reply = data?.choices?.[0]?.message?.content;
  return reply?.trim() || "❌ AI failed to respond.";
}
