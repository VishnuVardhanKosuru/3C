import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <Layout>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background:'var(--bg-glass-md)', border:'1px solid var(--border-glass)' }}
            whileHover={{ rotate:30, scale:1.1 }}>
            <Settings size={22} style={{ color:'var(--text-muted)' }} />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily:'Space Grotesk' }}>Settings</h1>
            <p className="text-sm" style={{ color:'var(--text-muted)' }}>Manage your account preferences</p>
          </div>
        </div>

        <motion.div className="glass-panel p-6 md:p-8" style={{ maxWidth:560 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily:'Space Grotesk' }}>Profile</h2>
          <div className="space-y-4">
            {[['Username', user?.username||'—'], ['Email', user?.email||'—'], ['Plan','Free Tier']].map(([label,value]) => (
              <div key={label} className="flex items-center justify-between py-3 border-b"
                style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                <span className="text-sm" style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>{label}</span>
                <span className="text-sm font-medium" style={{ color:'var(--text-primary)', fontFamily:'Space Grotesk' }}>{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6 text-center" style={{ color:'var(--text-muted)' }}>
            Full settings available in V2 · Backend integration coming soon 🚀
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
