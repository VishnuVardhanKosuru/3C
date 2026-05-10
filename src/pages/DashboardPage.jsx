import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Tv2, Camera, Bot, Lightbulb, TrendingUp,
  Users, Eye, Heart, ExternalLink, ChevronRight, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { YouTubeChart, InstagramChart } from '../components/GrowthChart';
import { AIAssistant } from '../components/AIAssistant';
import { useIdeas } from '../hooks/useIdeas';
import { Button } from '../components/ui/Button';
import { usePageTitle } from '../hooks/usePageTitle';

/* ── Animation variants ────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const cardIn = {
  hidden: { opacity:0, y:32, scale:0.96 },
  visible: { opacity:1, y:0,  scale:1,
    transition: { duration:0.5, ease:[0.34,1.1,0.64,1] } },
};
const statIn = {
  hidden: { opacity:0, scale:0.8 },
  visible: (i) => ({
    opacity:1, scale:1,
    transition: { delay: i*0.07, duration:0.4, ease:[0.34,1.56,0.64,1] },
  }),
};

/* ── Quick IdeaVault widget ────────────────────────────── */
function QuickIdeaWidget() {
  const { ideas, addIdea } = useIdeas();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handle = () => {
    if (!addIdea(text)) return;
    setText(''); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key==='Enter' && !e.shiftKey && (e.preventDefault(), handle())}
          placeholder="Drop a spark here… 💡"
          rows={2}
          className="flex-1 px-3 py-2 rounded-xl text-sm resize-none"
          style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.07)',
            color:'var(--text-primary)',
            outline:'none', fontFamily:'Inter',
          }}
          onFocus={e  => { e.target.style.borderColor='var(--purple)'; e.target.style.boxShadow='0 0 0 3px var(--purple-dim)'; }}
          onBlur={e   => { e.target.style.borderColor='rgba(255,255,255,0.07)'; e.target.style.boxShadow='none'; }}
        />
        <motion.button
          onClick={handle}
          whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
          className="self-end px-3 py-2 rounded-xl flex items-center justify-center"
          style={{ background:'linear-gradient(135deg,var(--purple),var(--pink))', minWidth:40 }}
        >
          {saved ? <span className="text-white text-sm">✓</span> : <Sparkles size={14} className="text-white" />}
        </motion.button>
      </div>
      <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight:96 }}>
        {ideas.slice(0,3).map(idea => (
          <motion.div
            key={idea.id}
            initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
            className="text-xs px-3 py-1.5 rounded-xl flex items-center gap-2"
            style={{ background:'rgba(124,58,237,0.08)', color:'var(--text-secondary)', border:'1px solid rgba(124,58,237,0.1)' }}
          >
            <span>💡</span>
            <span className="truncate">{idea.text}</span>
          </motion.div>
        ))}
        {ideas.length === 0 && (
          <p className="text-xs italic" style={{ color:'var(--text-muted)' }}>No ideas yet — be the first spark!</p>
        )}
      </div>
      {ideas.length > 3 && (
        <button onClick={() => navigate('/ideavault')}
          className="text-xs flex items-center gap-1 hover:underline self-start"
          style={{ color:'var(--purple-light)' }}>
          View all {ideas.length} <ChevronRight size={11} />
        </button>
      )}
    </div>
  );
}

/* ── Dashboard Page ────────────────────────────────────── */
export default function DashboardPage() {
  usePageTitle('Dashboard');
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users,      value:'11.2K',  label:'Subscribers',       color:'var(--blue)' },
    { icon: Heart,      value:'5.3K',   label:'Followers',          color:'var(--pink)' },
    { icon: Eye,        value:'48.9K',  label:'Monthly Views',      color:'var(--purple-light)' },
    { icon: TrendingUp, value:'+24%',   label:'Growth This Month',  color:'var(--green)' },
  ];

  return (
    <Layout>
      {/* Welcome header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Welcome back,{' '}
              <span className="gradient-text-purple">{user?.username || 'Creator'}</span> 👋
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Here's what's happening with your creator empire today.
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl shimmer flex-shrink-0"
            style={{ background: 'var(--purple-dim)', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
            <span className="text-sm font-medium" style={{ fontFamily: 'Space Grotesk', color: 'var(--purple-light)' }}>
              All systems live
            </span>
          </div>
        </div>

        {/* Stats bar — auto-fit 4 cols on lg, 2 on sm */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={statIn}
              className="glass-card flex items-center gap-3 px-4 py-4"
              whileHover={{ y: -3 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}20` }}
              >
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xl leading-tight" style={{ fontFamily: 'Space Grotesk', color: s.color }}>
                  {s.value}
                </p>
                <p className="text-xs leading-tight truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 2×2 card grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* YouTube */}
        <motion.div variants={cardIn} className="glass-card p-6" whileHover={{ y: -3 }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.15)' }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Tv2 size={20} style={{ color: 'var(--blue)' }} />
              </motion.div>
              <div>
                <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>YouTube</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@YourChannel</p>
              </div>
            </div>
            <span className="stat-badge badge-green">↑ 18.5%</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[['11.2K', 'Subscribers'], ['48.9K', 'Views/mo'], ['4.2%', 'Eng. Rate']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>{v}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{l}</p>
              </div>
            ))}
          </div>
          <YouTubeChart mini />
          <button
            onClick={() => navigate('/youtube')}
            className="flex items-center gap-1 text-xs mt-4 hover:underline"
            style={{ color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            View full analytics <ExternalLink size={11} />
          </button>
        </motion.div>

        {/* Instagram */}
        <motion.div variants={cardIn} className="glass-card p-6" whileHover={{ y: -3 }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(236,72,153,0.15)' }}
                whileHover={{ rotate: -10, scale: 1.1 }}
              >
                <Camera size={20} style={{ color: 'var(--pink)' }} />
              </motion.div>
              <div>
                <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>Instagram</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@YourProfile</p>
              </div>
            </div>
            <span className="stat-badge badge-pink">↑ 29.3%</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[['5.3K', 'Followers'], ['312', 'Avg. Likes'], ['6.8%', 'Eng. Rate']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>{v}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{l}</p>
              </div>
            ))}
          </div>
          <InstagramChart mini />
          <button
            onClick={() => navigate('/instagram')}
            className="flex items-center gap-1 text-xs mt-4 hover:underline"
            style={{ color: 'var(--pink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            View full analytics <ExternalLink size={11} />
          </button>
        </motion.div>

        {/* AI Assistant */}
        <motion.div variants={cardIn} className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center pulse-purple flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Bot size={20} className="text-white" style={{ animation: 'none' }} />
              </motion.div>
              <div>
                <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>AI Assistant</h3>
                <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--green)' }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: 'var(--green)' }} />
                  Ready to create
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/ai')}
              className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg"
              style={{
                background: 'var(--purple-dim)', color: 'var(--purple-light)',
                border: '1px solid rgba(124,58,237,0.25)', cursor: 'pointer',
              }}
            >
              Open <ExternalLink size={11} />
            </button>
          </div>
          <AIAssistant mini />
        </motion.div>

        {/* IdeaVault */}
        <motion.div variants={cardIn} className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center float flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(16,185,129,0.15))' }}
              >
                <Lightbulb size={20} style={{ color: 'var(--purple-light)' }} />
              </motion.div>
              <div>
                <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk' }}>IdeaVault</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Capture every spark</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/ideavault')}
              className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(124,58,237,0.1)', color: 'var(--purple-light)',
                border: '1px solid rgba(124,58,237,0.18)', cursor: 'pointer',
              }}
            >
              Open Vault <ExternalLink size={11} />
            </button>
          </div>
          <QuickIdeaWidget />
        </motion.div>
      </motion.div>
    </Layout>
  );
}
