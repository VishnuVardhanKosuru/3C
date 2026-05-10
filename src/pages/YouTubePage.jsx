import { motion } from 'framer-motion';
import { Tv2, TrendingUp, Users, Eye, Clock, BarChart2, ThumbsUp } from 'lucide-react';
import { Layout } from '../components/Layout';
import { YouTubeChart } from '../components/GrowthChart';
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
  { icon: Users,      label: 'Subscribers',     value: '11,200', delta: '+18.5%', color: 'var(--blue)',         badge: 'badge-green'  },
  { icon: Eye,        label: 'Monthly Views',    value: '48,900', delta: '+22.1%', color: 'var(--purple-light)', badge: 'badge-purple' },
  { icon: Clock,      label: 'Watch Time (hrs)', value: '3,240',  delta: '+15.7%', color: 'var(--cyan)',          badge: 'badge-green'  },
  { icon: ThumbsUp,   label: 'Avg. Likes / Vid', value: '892',    delta: '+9.3%',  color: 'var(--green)',         badge: 'badge-green'  },
  { icon: TrendingUp, label: 'Growth Rate',      value: '+24%',   delta: 'MoM',    color: 'var(--pink)',          badge: 'badge-pink'   },
  { icon: BarChart2,  label: 'Eng. Rate',        value: '4.2%',   delta: '+0.8pp', color: 'var(--blue)',          badge: 'badge-green'  },
];

const topVideos = [
  { title: 'How I grew my channel 10x in 30 days', views: '12,400', likes: '1.1K', duration: '14:32' },
  { title: 'Creator tools I use every single day',  views: '8,700',  likes: '742',  duration: '9:18'  },
  { title: 'My YouTube content strategy 2025',      views: '6,200',  likes: '554',  duration: '11:45' },
];

export default function YouTubePage() {
  usePageTitle('YouTube Analytics');

  return (
    <Layout>
      {/* Page header */}
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)' }}
          whileHover={{ scale: 1.1, rotate: 6 }}
        >
          <Tv2 size={24} style={{ color: 'var(--blue)' }} />
        </motion.div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            YouTube Analytics
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            @YourChannel · <span style={{ color: 'var(--blue)' }}>11.2K subscribers</span>
          </p>
        </div>
      </div>

      {/* 3-col then 3-col stats — 6 total */}
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
        <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Subscriber Growth</h2>
        <YouTubeChart />
      </motion.div>

      {/* Top videos */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
      >
        <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Top Performing Videos</h2>
        <div className="space-y-2">
          {topVideos.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 + i * 0.06 }}
              className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              whileHover={{ x: 4, borderColor: 'rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.05)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-lg font-bold flex-shrink-0"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Space Grotesk', minWidth: 22 }}>
                  {i + 1}
                </span>
                <p className="text-sm font-medium truncate" style={{ fontFamily: 'Inter' }}>{v.title}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Eye size={11} />{v.views}</span>
                <span className="flex items-center gap-1"><ThumbsUp size={11} />{v.likes}</span>
                <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{v.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
