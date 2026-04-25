import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Search, FileText } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useIdeas } from '../hooks/useIdeas';
import { IdeaCard } from '../components/IdeaCard';
import { Button } from '../components/ui/Button';

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.9 }}
      animate={{ opacity:1, scale:1 }}
      transition={{ type:'spring', stiffness:200 }}
      className="flex flex-col items-center justify-center py-20 gap-5"
    >
      <motion.div
        className="w-24 h-24 rounded-3xl flex items-center justify-center"
        style={{ background:'linear-gradient(135deg,var(--purple-dim),rgba(236,72,153,0.1))' }}
        animate={{ y:[0,-8,0] }}
        transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
      >
        <FileText size={40} style={{ color:'var(--purple-light)' }} />
      </motion.div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-1" style={{ fontFamily:'Space Grotesk' }}>
          IdeaVault is empty
        </h3>
        <p className="text-sm" style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>
          Every great creator starts with a single idea. Drop yours above! 💡
        </p>
      </div>
    </motion.div>
  );
}

export default function IdeaVaultPage() {
  const { ideas, addIdea, deleteIdea } = useIdeas();
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [focused, setFocused] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    if (addIdea(text)) {
      setText(''); setCharCount(0);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    }
  };

  const handleChange = (e) => { setText(e.target.value); setCharCount(e.target.value.length); };

  const filtered = search.trim()
    ? ideas.filter(i => i.text.toLowerCase().includes(search.toLowerCase()))
    : ideas;

  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity:0, y:-24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }}
        className="mb-10"
      >
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center float"
            style={{ background:'linear-gradient(135deg,var(--purple),var(--pink))' }}
            whileHover={{ rotate:15, scale:1.1 }}
          >
            <Lightbulb size={26} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold gradient-text-full" style={{ fontFamily:'Space Grotesk' }}>
              IdeaVault
            </h1>
            <p className="text-sm" style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>
              Capture your creative sparks before they fade
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <motion.div
            className="px-4 py-2 rounded-xl"
            style={{ background:'var(--purple-dim)', border:'1px solid rgba(124,58,237,0.28)' }}
            whileHover={{ scale:1.04 }}
          >
            <span className="text-sm font-bold" style={{ fontFamily:'Space Grotesk', color:'var(--purple-light)' }}>
              {ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'} stored
            </span>
          </motion.div>
          {search && (
            <motion.div
              initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }}
              className="px-4 py-2 rounded-xl"
              style={{ background:'var(--pink-dim)', border:'1px solid rgba(236,72,153,0.28)' }}>
              <span className="text-sm font-medium" style={{ color:'var(--pink-light)' }}>
                {filtered.length} results
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity:0, y:24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.15, duration:0.5 }}
        className="glass-panel p-6 mb-8"
        style={{ maxWidth: 780 }}
        animate={focused ? { boxShadow:'0 0 0 2px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)' } : {}}
      >
        <label className="block text-sm font-semibold mb-3 flex items-center gap-2"
          style={{ color:'var(--text-secondary)', fontFamily:'Space Grotesk' }}>
          <Sparkles size={14} style={{ color:'var(--purple-light)' }} /> New Idea
        </label>
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={e => e.key==='Enter' && e.ctrlKey && handleSave()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Write your idea here… What video can you make? What topic is trending? What would your audience love? 🚀"
          rows={4}
          maxLength={500}
          className="w-full px-5 py-4 rounded-2xl text-sm resize-none mb-4"
          style={{
            background:'rgba(255,255,255,0.04)',
            border:`1px solid ${focused ? 'var(--purple)' : 'rgba(255,255,255,0.07)'}`,
            color:'var(--text-primary)',
            outline:'none',
            fontFamily:'Inter',
            lineHeight:1.7,
            transition:'all 0.3s ease',
            boxShadow: focused
              ? '0 0 0 3px rgba(124,58,237,0.18), 0 0 24px rgba(124,58,237,0.14)'
              : 'inset 0 2px 8px rgba(0,0,0,0.2)',
          }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs" style={{ color: charCount > 450 ? '#f87171' : 'var(--text-muted)', fontFamily:'Inter' }}>
            {charCount}/500 · Ctrl+Enter to save
          </span>
          <Button variant="primary" onClick={handleSave} disabled={!text.trim()} className="!px-6">
            {saved ? (
              <motion.span
                initial={{ scale:0.5 }} animate={{ scale:1 }}
                transition={{ type:'spring', stiffness:300 }}
                className="flex items-center gap-2"
              >
                ✓ Saved!
              </motion.span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={15} /> Save Idea
              </span>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      {ideas.length > 0 && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
          className="relative mb-6" style={{ maxWidth:420 }}
        >
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color:'var(--text-muted)' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search your ideas…"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
            style={{
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.07)',
              color:'var(--text-primary)', outline:'none', fontFamily:'Inter',
            }}
            onFocus={e => { e.target.style.borderColor='var(--purple)'; e.target.style.boxShadow='0 0 0 3px var(--purple-dim)'; }}
            onBlur={e  => { e.target.style.borderColor='rgba(255,255,255,0.07)'; e.target.style.boxShadow='none'; }}
          />
        </motion.div>
      )}

      {/* List */}
      <div className="space-y-3" style={{ maxWidth:780 }}>
        <AnimatePresence mode="popLayout">
          {filtered.length > 0
            ? filtered.map(idea => <IdeaCard key={idea.id} idea={idea} onDelete={deleteIdea} />)
            : ideas.length === 0
              ? <EmptyState />
              : (
                <motion.p
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  className="text-sm py-8 text-center"
                  style={{ color:'var(--text-muted)' }}
                >
                  No ideas match "{search}"
                </motion.p>
              )
          }
        </AnimatePresence>
      </div>
    </Layout>
  );
}
