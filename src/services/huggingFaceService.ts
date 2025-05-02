const HUGGINGFACE_TOKEN = import.meta.env.VITE_HF_TOKEN;
export async function chatWithHF(prompt: string): Promise<string> {
  const input = `Act as a movie AI assistant. Question: ${prompt}`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: input }),
    }
  );

  const data = await response.json();

  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }

  return "❌ AI не смог ответить.";
}
