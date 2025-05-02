import { chatWithOpenRouter } from '@/services/openRouterService';
import { useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

function MovieChat({ movieTitle, onClose }: { movieTitle: string; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const prompt = `Фильм: "${movieTitle}". Вопрос: ${input}`;
      const reply = await chatWithOpenRouter(prompt);

      const aiMessage: Message = {
        role: 'assistant',
        content: reply,
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: '❌ Ошибка при обращении к AI-сервису.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className='fixed top-0 right-0 w-full max-w-md h-full bg-zinc-900 text-white p-4 shadow-lg z-50 overflow-y-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>💬 Chat about "{movieTitle}"</h2>
        <button onClick={onClose} className='text-2xl'>
          ×
        </button>
      </div>

      <div className='space-y-2 mb-4'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === 'user' ? 'bg-indigo-600' : 'bg-gray-700'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className='flex gap-2'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 p-2 rounded bg-zinc-800'
          placeholder='Ask about the plot, ending, actors...'
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className='px-4 py-2 bg-green-600 rounded'
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default MovieChat;
