import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import IdeaVaultPage from './pages/IdeaVaultPage';
import YouTubePage from './pages/YouTubePage';
import InstagramPage from './pages/InstagramPage';
import AIPage from './pages/AIPage';
import SettingsPage from './pages/SettingsPage';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 rounded-full border-2 border-t-transparent"
        style={{ borderColor: 'var(--accent-purple)' }}
      />
    </div>
  );
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/ideavault" element={<ProtectedRoute><IdeaVaultPage /></ProtectedRoute>} />
      <Route path="/youtube" element={<ProtectedRoute><YouTubePage /></ProtectedRoute>} />
      <Route path="/instagram" element={<ProtectedRoute><InstagramPage /></ProtectedRoute>} />
      <Route path="/ai" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
