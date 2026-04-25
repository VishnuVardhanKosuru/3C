import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

const suggestions = [
  'Give me 5 YouTube video ideas 🎬',
  'How to grow my Instagram?',
  'Best hashtags for tech content',
  'Write a viral reel script',
];

const mockResponses = {
  default: [
    "Great idea! Here are some suggestions to boost your content:\n\n• Focus on trending topics in your niche\n• Post consistently at peak hours\n• Use strong hooks in the first 3 seconds\n• Engage with comments within the first hour 🚀",
    "Love the energy! For creator growth:\n\n1️⃣ Collaborate with micro-influencers\n2️⃣ Repurpose long-form content into shorts\n3️⃣ Use trending audio on Reels\n4️⃣ Tell authentic stories — Gen Z loves realness ✨",
    "Here's what the data says:\n\n📊 Short-form video gets 3x more engagement\n🎯 Niche content outperforms broad content\n⏰ Best posting times: 6–9 PM local\n💡 Consistency > Virality",
  ],
};

function getResponse(query) {
  const responses = mockResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
}

export function AIAssistant({ mini = false }) {
  const [messages, setMessages] = useState([
    { id: 0, role: 'ai', text: "Hey! I'm your AI creative assistant 🤖✨\nAsk me anything about growing your channel!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: getResponse(userMsg) }]);
    }, 1200 + Math.random() * 800);
  };

  if (mini) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ maxHeight: 100 }}>
          {messages.slice(-2).map(m => (
            <div key={m.id} className={`text-xs px-3 py-2 rounded-xl ${m.role === 'ai' ? 'bg-purple-900/30 text-purple-200' : 'bg-pink-900/20 text-pink-200 text-right'}`}>
              {m.text.split('\n')[0]}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask AI..."
            className="flex-1 text-xs px-3 py-2 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <button
            onClick={() => sendMessage()}
            className="px-3 py-2 rounded-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))' }}
          >
            <Send size={12} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 500 }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center pulse-purple"
          style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))' }}
        >
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>AI Assistant</h2>
          <p className="text-xs" style={{ color: 'var(--accent-green)' }}>● Online — Ready to create</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-105"
            style={{
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              color: 'var(--text-muted)',
              fontFamily: 'Inter',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4" style={{ maxHeight: 350 }}>
        <AnimatePresence initial={false}>
          {messages.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-xs text-sm px-4 py-3 rounded-2xl whitespace-pre-line"
                style={{
                  background: m.role === 'ai'
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))'
                    : 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
                  color: 'var(--text-primary)',
                  border: m.role === 'ai' ? '1px solid rgba(124,58,237,0.2)' : 'none',
                  fontFamily: 'Inter',
                  lineHeight: 1.6,
                }}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl flex items-center gap-1" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--accent-purple-light)' }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask your AI creative partner..."
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'Inter',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--accent-purple)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-purple-dim)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <Button variant="primary" onClick={() => sendMessage()} className="!px-4 !py-3 !rounded-xl">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
