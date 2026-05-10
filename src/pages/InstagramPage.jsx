import { motion } from 'framer-motion';
import { Camera, Heart, Users, Image, TrendingUp, BarChart2, MessageCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { InstagramChart } from '../components/GrowthChart';
import { usePageTitle } from '../hooks/usePageTitle';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.1, 0.64, 1] } },
};

const stats = [
  { icon: Users,         label: 'Followers',      value: '5,300',  delta: '+29.3%',      color: 'var(--pink)',          badge: 'badge-pink'   },
  { icon: Heart,         label: 'Avg. Likes',      value: '312',    delta: '+11.4%',      color: 'var(--red)',           badge: 'badge-green'  },
  { icon: MessageCircle, label: 'Avg. Comments',   value: '44',     delta: '+18.2%',      color: 'var(--purple-light)', badge: 'badge-purple' },
  { icon: Image,         label: 'Posts',           value: '87',     delta: '+3 this week', color: 'var(--cyan)',         badge: 'badge-green'  },
  { icon: TrendingUp,    label: 'Reach',           value: '18.4K',  delta: '+33.7%',      color: 'var(--green)',        badge: 'badge-green'  },
  { icon: BarChart2,     label: 'Eng. Rate',       value: '6.8%',   delta: '+2.1pp',      color: 'var(--blue)',         badge: 'badge-green'  },
];

const topPosts = [
  { caption: 'Behind the scenes of my studio setup 🎬', likes: '542', comments: '61', reach: '4.2K' },
  { caption: 'Morning routine that doubled my output ☀️', likes: '398', comments: '43', reach: '3.1K' },
  { caption: 'Gear I use to create content on a budget 💡', likes: '312', comments: '38', reach: '2.8K' },
];

export default function InstagramPage() {
  usePageTitle('Instagram Analytics');

  return (
    <Layout>
      {/* Page header */}
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.2)' }}
          whileHover={{ scale: 1.1, rotate: -6 }}
        >
          <Camera size={24} style={{ color: 'var(--pink)' }} />
        </motion.div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            Instagram Analytics
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            @YourProfile · <span style={{ color: 'var(--pink)' }}>5.3K followers</span>
          </p>
        </div>
      </div>

      {/* Stats grid — 3 per row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="glass-card px-5 py-4" whileHover={{ y: -3 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}20` }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
            <p className="text-2xl font-bold mb-1.5" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</p>
            <span className={`stat-badge ${s.badge}`}>{s.delta}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Growth chart */}
      <motion.div
        className="glass-card p-6 mb-5"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      >
        <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Follower Growth</h2>
        <InstagramChart />
      </motion.div>

      {/* Top posts */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
      >
        <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Top Posts</h2>
        <div className="space-y-2">
          {topPosts.map((p, i) => (
            <motion.div
              key={p.caption}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 + i * 0.06 }}
              className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              whileHover={{ x: 4, borderColor: 'rgba(236,72,153,0.25)', background: 'rgba(236,72,153,0.05)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))', color: 'white' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm font-medium truncate" style={{ fontFamily: 'Inter' }}>{p.caption}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Heart size={11} style={{ color: 'var(--pink)' }} />{p.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} />{p.comments}</span>
                <span className="flex items-center gap-1"><TrendingUp size={11} style={{ color: 'var(--green)' }} />{p.reach}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
