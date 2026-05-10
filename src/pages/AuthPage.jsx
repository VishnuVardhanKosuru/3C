import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ArrowRight, User, Mail, Lock, Eye, EyeOff,
  Sparkles, Globe, GitBranch,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import EmojiUniverse from '../components/EmojiUniverse';

/* ─────────────────────────────────────────────────────────────────
   Floating-label Input
───────────────────────────────────────────────────────────────── */
function FloatingInput({ label, type, value, onChange, id, icon: Icon, delay = 0 }) {
  const [show, setShow]       = useState(false);
  const [focused, setFocused] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;
  const filled    = value.length > 0;

  return (
    <motion.div
      className="relative"
      style={{ marginBottom: 16 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1,  y: 0  }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* icon */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors"
        style={{ color: focused ? 'var(--purple-light)' : 'var(--text-muted)', transition: 'color 0.3s' }}
      >
        <Icon size={15} />
      </div>

      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className="input-field"
        style={{ paddingLeft: 40, paddingRight: type === 'password' ? 44 : 16 }}
        autoComplete={type === 'password' ? 'current-password' : id.includes('email') ? 'email' : 'off'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* floating label */}
      <label
        htmlFor={id}
        className="input-label"
        style={{
          left: 40,
          color: focused ? 'var(--purple-light)' : filled ? 'var(--purple-light)' : 'var(--text-muted)',
          transform: focused || filled
            ? 'translateY(-24px) scale(0.76)'
            : 'translateY(-50%) scale(1)',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          top: focused || filled ? '70%' : '50%',
          pointerEvents: 'none',
        }}
      >
        {label}
      </label>

      {/* eye toggle */}
      {type === 'password' && (
        <motion.button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          whileHover={{ color: 'var(--purple-light)', scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </motion.button>
      )}

      {/* focus glow border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={focused ? {
          boxShadow: '0 0 0 2px rgba(124,58,237,0.55), 0 0 24px rgba(124,58,237,0.22)',
        } : {
          boxShadow: '0 0 0 0px rgba(124,58,237,0)',
        }}
        transition={{ duration: 0.25 }}
        style={{ borderRadius: 14 }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Slide variants for form switch
───────────────────────────────────────────────────────────────── */
const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
};

/* ─────────────────────────────────────────────────────────────────
   Divider
───────────────────────────────────────────────────────────────── */
function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Inter', letterSpacing: '0.08em' }}>
        OR CONTINUE WITH
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Social button
───────────────────────────────────────────────────────────────── */
function SocialBtn({ icon: Icon, label, color }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, borderColor: color, boxShadow: `0 0 14px ${color}33` }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 13,
        color: 'var(--text-secondary)',
        fontSize: 13,
        fontFamily: 'Space Grotesk',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Icon size={16} style={{ color }} />
      {label}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Auth Page
───────────────────────────────────────────────────────────────── */
export default function AuthPage() {
  const [mode,      setMode]      = useState('login');
  const [direction, setDirection] = useState(1);
  const [form,      setForm]      = useState({ username: '', email: '', password: '', confirm: '' });
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const { login }    = useAuth();
  const navigate     = useNavigate();

  const switchMode = (m) => {
    setDirection(m === 'register' ? 1 : -1);
    setMode(m);
    setError('');
    setForm({ username: '', email: '', password: '', confirm: '' });
  };

  const field = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register') {
      if (!form.username.trim())           return setError('Username is required.');
      if (!form.email.includes('@'))       return setError('Enter a valid email.');
      if (form.password.length < 6)        return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirm)  return setError('Passwords do not match.');
    } else {
      if (!form.email.trim())    return setError('Email is required.');
      if (!form.password.trim()) return setError('Password is required.');
    }
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        login({ username: form.username || form.email.split('@')[0], email: form.email });
        navigate('/dashboard');
      }, 600);
    }, 950);
  };

  /* Field delay helper */
  const fd = (n) => 0.05 + n * 0.07;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ padding: '20px 16px' }}
    >
      {/* ── Animated gradient background ── */}
      <div className="bg-animated" aria-hidden="true">
        <div className="bg-orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* ── Three.js emoji universe ── */}
      <EmojiUniverse />

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.91 }}
        animate={{ opacity: 1,  y: 0,  scale: 1    }}
        transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 w-full"
        style={{ maxWidth: 470 }}
      >
        {/* Glass panel — ultra frosted */}
        <div className="auth-glass-panel p-8 md:p-10">

          {/* ── Shimmer sweep overlay ── */}
          <div className="auth-panel-sweep" aria-hidden="true" />

          {/* ── Logo / brand ── */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 pulse-purple float"
              style={{ background: 'linear-gradient(135deg, var(--purple), var(--pink))' }}
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
              transition={{ duration: 0.5 }}
            >
              <Zap size={30} className="text-white" />
            </motion.div>

            <motion.h1
              className="text-4xl font-bold"
              style={{ fontFamily: 'Space Grotesk' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1,  y: 0  }}
              transition={{ delay: 0.15 }}
            >
              Creator<span className="gradient-text-purple">HQ</span>
            </motion.h1>

            <motion.p
              className="text-sm mt-2 flex items-center justify-center gap-1.5"
              style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Sparkles size={12} style={{ color: 'var(--purple-light)' }} />
              Your creator command center
            </motion.p>
          </div>

          {/* ── Tab switcher ── */}
          <motion.div
            className="relative flex p-1 rounded-2xl mb-7"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* sliding pill */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-xl"
              style={{ background: 'linear-gradient(135deg,var(--purple),var(--pink))' }}
              animate={{ left: mode === 'login' ? 4 : '50%', width: 'calc(50% - 4px)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                id={`tab-${m}`}
                className="relative flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize z-10"
                style={{
                  fontFamily: 'Space Grotesk',
                  color: mode === m ? 'white' : 'var(--text-muted)',
                  transition: 'color 0.25s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </motion.div>

          {/* ── Form ── */}
          <div style={{ overflow: 'hidden' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.form
                key={mode}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                onSubmit={submit}
                noValidate
              >
                {mode === 'register' && (
                  <FloatingInput
                    label="Username" type="text" value={form.username}
                    onChange={field('username')} id="reg-username" icon={User} delay={fd(0)}
                  />
                )}

                <FloatingInput
                  label="Email Address" type="email" value={form.email}
                  onChange={field('email')}
                  id={mode === 'login' ? 'login-email' : 'reg-email'}
                  icon={Mail} delay={fd(mode === 'register' ? 1 : 0)}
                />

                <FloatingInput
                  label="Password" type="password" value={form.password}
                  onChange={field('password')}
                  id={mode === 'login' ? 'login-pass' : 'reg-pass'}
                  icon={Lock} delay={fd(mode === 'register' ? 2 : 1)}
                />

                {mode === 'register' && (
                  <FloatingInput
                    label="Confirm Password" type="password" value={form.confirm}
                    onChange={field('confirm')} id="reg-confirm" icon={Lock} delay={fd(3)}
                  />
                )}

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm mb-4 px-3 py-2.5 rounded-xl"
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        color: '#f87171',
                        border: '1px solid rgba(239,68,68,0.22)',
                        fontFamily: 'Inter',
                      }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Forgot password */}
                {mode === 'login' && (
                  <motion.div
                    className="text-right mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <button
                      type="button"
                      className="text-xs hover:underline"
                      style={{ color: 'var(--purple-light)', fontFamily: 'Inter', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Forgot password?
                    </button>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: fd(mode === 'register' ? 4 : 2) }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full !justify-center !py-4 !text-base"
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <AnimatePresence mode="wait">
                      {success ? (
                        <motion.span
                          key="success"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          ✅ {mode === 'login' ? 'Welcome back!' : 'Account created!'}
                        </motion.span>
                      ) : loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                          whileHover={{ gap: '14px' }}
                        >
                          {mode === 'login' ? 'Sign In' : 'Create Account'}
                          <ArrowRight size={17} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                {/* OR divider + social */}
                <OrDivider />
                <div className="flex gap-3">
                  <SocialBtn icon={Globe} label="Google" color="#EA4335" />
                  <SocialBtn icon={GitBranch} label="GitHub" color="#9B59B6" />
                </div>

                {/* Switch mode */}
                <p className="text-center text-sm mt-5" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                    className="font-semibold hover:underline"
                    style={{ color: 'var(--purple-light)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {mode === 'login' ? 'Register here' : 'Sign in'}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>

        {/* tagline below card */}
        <motion.p
          className="text-center text-xs mt-5"
          style={{ color: 'var(--text-muted)', fontFamily: 'Inter', letterSpacing: '0.04em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Built for Gen Z creators ✨ · v2.0
        </motion.p>
      </motion.div>
    </div>
  );
}
