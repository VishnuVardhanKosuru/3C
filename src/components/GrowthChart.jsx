import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ytData = [
  { name: 'Jan', subs: 4200 }, { name: 'Feb', subs: 5100 }, { name: 'Mar', subs: 4800 },
  { name: 'Apr', subs: 6200 }, { name: 'May', subs: 7100 }, { name: 'Jun', subs: 8900 },
  { name: 'Jul', subs: 11200 },
];

const igData = [
  { name: 'Jan', followers: 1200 }, { name: 'Feb', followers: 1800 }, { name: 'Mar', followers: 2100 },
  { name: 'Apr', followers: 2600 }, { name: 'May', followers: 3200 }, { name: 'Jun', followers: 4100 },
  { name: 'Jul', followers: 5300 },
];

const CustomTooltip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15,23,42,0.95)',
        border: `1px solid ${color}40`,
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: 12,
        color: color,
        fontFamily: 'Space Grotesk',
        fontWeight: 600,
      }}>
        {payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

export function YouTubeChart({ mini = false }) {
  return (
    <ResponsiveContainer width="100%" height={mini ? 80 : 180}>
      <AreaChart data={ytData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="ytGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        {!mini && <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />}
        {!mini && <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />}
        <Tooltip content={<CustomTooltip color="#3b82f6" />} />
        <Area type="monotone" dataKey="subs" stroke="#3b82f6" strokeWidth={2} fill="url(#ytGrad)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function InstagramChart({ mini = false }) {
  return (
    <ResponsiveContainer width="100%" height={mini ? 80 : 180}>
      <BarChart data={igData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="igGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {!mini && <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />}
        {!mini && <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />}
        <Tooltip content={<CustomTooltip color="#ec4899" />} />
        <Bar dataKey="followers" fill="url(#igGrad)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
