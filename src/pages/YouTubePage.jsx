import { motion } from 'framer-motion';
import { Tv2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { YouTubeChart } from '../components/GrowthChart';

export default function YouTubePage() {
  return (
    <Layout>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background:'rgba(59,130,246,0.15)' }}
            whileHover={{ scale:1.1, rotate:5 }}>
            <Tv2 size={24} style={{ color:'var(--blue)' }} />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily:'Space Grotesk' }}>YouTube Analytics</h1>
            <p className="text-sm" style={{ color:'var(--text-muted)' }}>@YourChannel · 11.2K subscribers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[['Subscribers','11,200','+18.5%'],['Monthly Views','48,900','+22.1%'],['Watch Time (hrs)','3,240','+15.7%']].map(([l,v,d],i) => (
            <motion.div key={l} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.08 }} className="glass-card px-5 py-4" whileHover={{ y:-3 }}>
              <p className="text-xs mb-1" style={{ color:'var(--text-muted)' }}>{l}</p>
              <p className="text-2xl font-bold" style={{ fontFamily:'Space Grotesk' }}>{v}</p>
              <span className="stat-badge badge-green mt-2 inline-block">{d}</span>
            </motion.div>
          ))}
        </div>

        <motion.div className="glass-card p-6" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily:'Space Grotesk' }}>Subscriber Growth</h2>
          <YouTubeChart />
        </motion.div>
      </motion.div>
    </Layout>
  );
}
