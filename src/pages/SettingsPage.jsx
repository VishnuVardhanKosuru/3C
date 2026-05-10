import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, Palette, Shield, ChevronRight, Check, LogOut } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const sections = [
  { id: 'profile',       icon: User,    title: 'Profile',       color: 'var(--purple-light)', colorDim: 'rgba(168,85,247,0.14)' },
  { id: 'notifications', icon: Bell,    title: 'Notifications', color: 'var(--pink)',          colorDim: 'rgba(236,72,153,0.14)' },
  { id: 'appearance',    icon: Palette, title: 'Appearance',    color: 'var(--cyan)',          colorDim: 'rgba(6,182,212,0.14)'  },
  { id: 'security',      icon: Shield,  title: 'Security',      color: 'var(--green)',         colorDim: 'rgba(16,185,129,0.14)' },
];

/* Animated toggle switch */
function Toggle({ id, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <motion.button
      id={id}
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      style={{
        width: 44, height: 24, borderRadius: 99, flexShrink: 0,
        background: on ? 'linear-gradient(135deg,var(--purple),var(--pink))' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${on ? 'var(--purple)' : 'rgba(255,255,255,0.12)'}`,
        cursor: 'pointer', position: 'relative',
        transition: 'background 0.3s, border 0.3s',
      }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.span
        style={{
          position: 'absolute', top: 3,
          width: 16, height: 16, borderRadius: '50%', background: 'white',
          boxShadow: on ? '0 0 8px rgba(168,85,247,0.5)' : 'none',
        }}
        animate={{ left: on ? 22 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

/* Single row in a settings section */
function SettingRow({ label, value, toggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between py-4"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}>{label}</span>
      {toggle
        ? <Toggle id={`toggle-${label}`} defaultOn={toggle === 'on'} />
        : <span className="text-sm font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>{value}</span>
      }
    </motion.div>
  );
}

const sectionContent = {
  profile: [
    { label: 'Username',     value: null, _user: 'username' },
    { label: 'Email',        value: null, _user: 'email'    },
    { label: 'Plan',         value: 'Free Tier' },
    { label: 'Member since', value: 'May 2025'  },
  ],
  notifications: [
    { label: 'Email digests',       toggle: 'on'  },
    { label: 'Growth alerts',       toggle: 'on'  },
    { label: 'Weekly summary',      toggle: 'off' },
    { label: 'New follower alerts', toggle: 'on'  },
  ],
  appearance: [
    { label: 'Dark mode',      toggle: 'on'  },
    { label: 'Compact sidebar', toggle: 'off' },
    { label: 'Reduced motion', toggle: 'off' },
    { label: 'High contrast',  toggle: 'off' },
  ],
  security: [
    { label: 'Two-factor auth',       toggle: 'off'  },
    { label: 'Session timeout',       value: '30 min' },
    { label: 'Login notifications',   toggle: 'on'    },
    { label: 'Password last changed', value: 'Never'  },
  ],
};

export default function SettingsPage() {
  usePageTitle('Settings');
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [active, setActive] = useState('profile');
  const [saved,  setSaved]  = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const activeSection = sections.find((s) => s.id === active);
  const rows = sectionContent[active].map((r) => ({
    ...r,
    value: r._user ? (user?.[r._user] || '—') : r.value,
  }));

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-7">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-glass-md)', border: '1px solid var(--border-glass)' }}
          whileHover={{ rotate: 30, scale: 1.1 }}
        >
          <Settings size={22} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your account preferences</p>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: 'minmax(0, 200px) 1fr', alignItems: 'start' }}
      >
        {/* Left nav */}
        <motion.div
          className="glass-panel p-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x:  0 }}
          transition={{ delay: 0.08 }}
        >
          {sections.map(({ id, icon: Icon, title, color, colorDim }) => (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 text-sm text-left"
              style={{
                fontFamily:  'Inter',
                background:  active === id ? colorDim : 'transparent',
                color:       active === id ? color    : 'var(--text-muted)',
                border:      active === id ? `1px solid ${color}33` : '1px solid transparent',
                fontWeight:  active === id ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span className="truncate">{title}</span>
              {active === id && (
                <motion.span layoutId="settings-chevron" className="ml-auto flex-shrink-0">
                  <ChevronRight size={13} />
                </motion.span>
              )}
            </motion.button>
          ))}

          {/* Logout */}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <motion.button
              onClick={handleLogout}
              whileHover={{ x: 2, background: 'rgba(239,68,68,0.08)' }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm"
              style={{ color: '#f87171', fontFamily: 'Inter', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <LogOut size={15} className="flex-shrink-0" />
              Log out
            </motion.button>
          </div>
        </motion.div>

        {/* Right content panel */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <activeSection.icon size={18} style={{ color: activeSection.color }} />
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                {activeSection.title}
              </h2>
            </div>
            <motion.button
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2200); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: saved ? 'rgba(16,185,129,0.14)' : 'linear-gradient(135deg,var(--purple),var(--pink))',
                color: 'white',
                border: saved ? '1px solid rgba(16,185,129,0.3)' : 'none',
                fontFamily: 'Space Grotesk',
                cursor: 'pointer',
                minWidth: 120,
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <AnimatePresence mode="wait">
                {saved
                  ? <motion.span key="saved" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5">
                      <Check size={14} /> Saved!
                    </motion.span>
                  : <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Save Changes
                    </motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Section rows with slide animation on tab change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {rows.map((row, i) => (
                <SettingRow key={row.label} {...row} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="text-xs mt-6 text-center" style={{ color: 'var(--text-muted)' }}>
            CreatorHQ v2.0 · Backend integration coming soon 🚀
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
