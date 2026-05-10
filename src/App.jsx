import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage        from './pages/AuthPage';
import DashboardPage   from './pages/DashboardPage';
import IdeaVaultPage   from './pages/IdeaVaultPage';
import YouTubePage     from './pages/YouTubePage';
import InstagramPage   from './pages/InstagramPage';
import AIPage          from './pages/AIPage';
import SettingsPage    from './pages/SettingsPage';

/* ── Global loading spinner ──────────────────────────────────── */
function Spinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        className="w-9 h-9 rounded-full border-2 border-t-transparent"
        style={{ borderColor: 'var(--accent-purple)' }}
      />
    </div>
  );
}

/* ── Protected route guard ───────────────────────────────────── */
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

/* ── Route definitions with AnimatePresence ──────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/ideavault" element={<ProtectedRoute><IdeaVaultPage /></ProtectedRoute>} />
        <Route path="/youtube"   element={<ProtectedRoute><YouTubePage /></ProtectedRoute>} />
        <Route path="/instagram" element={<ProtectedRoute><InstagramPage /></ProtectedRoute>} />
        <Route path="/ai"        element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
        <Route path="/settings"  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
