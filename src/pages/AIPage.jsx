import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AIAssistant } from '../components/AIAssistant';
import { usePageTitle } from '../hooks/usePageTitle';

export default function AIPage() {
  usePageTitle('AI Assistant');

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center pulse-purple flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--purple), var(--pink))' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          whileHover={{ scale: 1.1 }}
        >
          <Bot size={24} className="text-white" style={{ animation: 'none' }} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            AI <span className="gradient-text-purple">Assistant</span>
          </h1>
          <p className="text-sm mt-0.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{ background: 'var(--green)', boxShadow: '0 0 5px var(--green)' }} />
            Ready to help you create amazing content
          </p>
        </div>
        {/* Feature pills */}
        <div className="flex gap-2 flex-wrap">
          {[
            { label: 'Content Ideas', icon: Sparkles, color: 'var(--purple-light)' },
            { label: 'Script Writer', icon: Zap,      color: 'var(--pink)' },
          ].map(({ label, icon: Icon, color }) => (
            <motion.div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{
                background: `${color}18`, border: `1px solid ${color}33`,
                color, fontFamily: 'Space Grotesk',
              }}
              whileHover={{ scale: 1.06 }}
            >
              <Icon size={12} /> {label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Chat Panel */}
      <motion.div
        className="glass-panel p-6 md:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y:  0 }}
        transition={{ delay: 0.1 }}
      >
        <AIAssistant />
      </motion.div>
    </Layout>
  );
}
