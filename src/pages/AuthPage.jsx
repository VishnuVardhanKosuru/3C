import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

/* ── Floating label input ─────────────────────────────────── */
function FloatingInput({ label, type, value, onChange, id, icon: Icon }) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;

  return (
    <div className="relative" style={{ marginBottom: 18 }}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ color: 'var(--text-muted)' }}>
        <Icon size={15} />
      </div>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={label}
        required
        className="input-field"
        style={{ paddingLeft: 40, paddingRight: type === 'password' ? 44 : 16 }}
        autoComplete={type === 'password' ? 'current-password' : id === 'email' ? 'email' : 'off'}
      />
      <label className="input-label" htmlFor={id} style={{ left: 40 }}>{label}</label>
      {type === 'password' && (
        <button type="button" onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: 'var(--text-muted)' }}>
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  );
}

/* ── Slide variants ───────────────────────────────────────── */
const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (d) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
};

/* ── Floating particles (pure CSS-driven in background) ───── */
function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left:  `${Math.random() * 100}%`,
            top:   `${Math.random() * 100}%`,
            background: i % 3 === 0
              ? 'rgba(124,58,237,0.6)'
              : i % 3 === 1
              ? 'rgba(236,72,153,0.6)'
              : 'rgba(59,130,246,0.6)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Auth Page ────────────────────────────────────────────── */
export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState({ username:'', email:'', password:'', confirm:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const switchMode = (m) => {
    setDirection(m === 'register' ? 1 : -1);
    setMode(m);
    setError('');
    setForm({ username:'', email:'', password:'', confirm:'' });
  };

  const field = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register') {
      if (!form.username.trim()) return setError('Username is required.');
      if (!form.email.includes('@')) return setError('Enter a valid email.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirm) return setError('Passwords do not match.');
    } else {
      if (!form.email.trim()) return setError('Email is required.');
      if (!form.password.trim()) return setError('Password is required.');
    }
    setLoading(true);
    setTimeout(() => {
      login({ username: form.username || form.email.split('@')[0], email: form.email });
      navigate('/dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ padding: '20px 16px' }}>

      <div className="bg-animated" aria-hidden="true">
        <div className="bg-orb-3" />
        <div className="grid-overlay" />
      </div>
      <Particles />

      <motion.div
        initial={{ opacity:0, y:40, scale:0.93 }}
        animate={{ opacity:1, y:0,  scale:1   }}
        transition={{ duration:0.6, ease:[0.34,1.56,0.64,1] }}
        className="relative z-10 w-full"
        style={{ maxWidth: 460 }}
      >
        <div className="glass-panel p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 pulse-purple float"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--pink))' }}
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Zap size={30} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold" style={{ fontFamily:'Space Grotesk' }}>
              Creator<span className="gradient-text-purple">HQ</span>
            </h1>
            <p className="text-sm mt-1.5 flex items-center justify-center gap-1.5"
              style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>
              <Sparkles size={13} style={{ color:'var(--purple-light)' }} />
              Your creator command center
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-2xl mb-8"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
            {['login','register'].map((m) => (
              <motion.button
                key={m}
                onClick={() => switchMode(m)}
                id={`tab-${m}`}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize"
                style={{
                  fontFamily:'Space Grotesk',
                  background: mode===m ? 'linear-gradient(135deg,var(--purple),var(--pink))' : 'transparent',
                  color: mode===m ? 'white' : 'var(--text-muted)',
                }}
                whileHover={mode !== m ? { color: 'var(--text-primary)' } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <div style={{ overflow:'hidden' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.form
                key={mode}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration:0.3, ease:[0.4,0,0.2,1] }}
                onSubmit={submit}
                noValidate
              >
                {mode === 'register' && (
                  <FloatingInput label="Username" type="text" value={form.username}
                    onChange={field('username')} id="reg-username" icon={User} />
                )}
                <FloatingInput label="Email Address" type="email" value={form.email}
                  onChange={field('email')} id={mode==='login'?'login-email':'reg-email'} icon={Mail} />
                <FloatingInput label="Password" type="password" value={form.password}
                  onChange={field('password')} id={mode==='login'?'login-pass':'reg-pass'} icon={Lock} />
                {mode === 'register' && (
                  <FloatingInput label="Confirm Password" type="password" value={form.confirm}
                    onChange={field('confirm')} id="reg-confirm" icon={Lock} />
                )}

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity:0, y:-8, height:0 }}
                      animate={{ opacity:1, y:0, height:'auto' }}
                      exit={{ opacity:0, height:0 }}
                      className="text-sm mb-4 px-3 py-2 rounded-xl"
                      style={{
                        background:'rgba(239,68,68,0.1)',
                        color:'#f87171',
                        border:'1px solid rgba(239,68,68,0.2)',
                        fontFamily:'Inter',
                      }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {mode === 'login' && (
                  <div className="text-right mb-4">
                    <button type="button" className="text-xs hover:underline"
                      style={{ color:'var(--purple-light)', fontFamily:'Inter' }}>
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button type="submit" variant="primary" disabled={loading}
                  className="w-full !justify-center !py-4 !text-base">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate:360 }}
                        transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}
                      />
                      {mode==='login' ? 'Signing in…' : 'Creating account…'}
                    </span>
                  ) : (
                    <motion.span
                      className="flex items-center gap-2"
                      whileHover={{ gap: '12px' }}
                    >
                      {mode==='login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={17} />
                    </motion.span>
                  )}
                </Button>

                <p className="text-center text-sm mt-5" style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>
                  {mode==='login' ? "Don't have an account? " : 'Already have an account? '}
                  <button type="button" onClick={() => switchMode(mode==='login'?'register':'login')}
                    className="font-semibold hover:underline" style={{ color:'var(--purple-light)' }}>
                    {mode==='login' ? 'Register here' : 'Sign in'}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color:'var(--text-muted)', fontFamily:'Inter' }}>
          Built for Gen Z creators ✨
        </p>
      </motion.div>
    </div>
  );
}
