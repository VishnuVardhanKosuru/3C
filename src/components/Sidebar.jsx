import { useState, createContext, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Tv2, Camera, Bot, Lightbulb, Settings,
  ChevronLeft, ChevronRight, Zap, LogOut, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sidebar state context so pages can read the current width
export const SidebarContext = createContext({ collapsed: false, mobile: false });
export const useSidebar = () => useContext(SidebarContext);

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/youtube', icon: Tv2, label: 'YouTube' },
  { path: '/instagram', icon: Camera, label: 'Instagram' },
  { path: '/ai', icon: Bot, label: 'AI Assistant' },
  { path: '/ideavault', icon: Lightbulb, label: 'IdeaVault' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

// ── Mobile overlay drawer ──────────────────────────────────────────────────
function MobileDrawer({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.aside
            className="fixed left-0 top-0 bottom-0 z-[201] flex flex-col"
            style={{
              width: 260,
              background: 'rgba(8,12,28,0.98)',
              backdropFilter: 'blur(40px)',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                  <Zap size={15} className="text-white" />
                </div>
                <span className="font-bold text-base" style={{ fontFamily: 'Space Grotesk', color: '#f1f5f9' }}>
                  Creator<span style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>HQ</span>
                </span>
              </div>
              <button onClick={onClose} style={{ color: '#64748b' }}><X size={20} /></button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 space-y-1 px-3">
              {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500 }}>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User + Logout */}
            <div className="border-t p-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {user && (
                <div className="px-3 pb-2">
                  <p className="text-xs" style={{ color: '#64748b' }}>Logged in as</p>
                  <p className="text-sm font-semibold" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk' }}>{user.username}</p>
                </div>
              )}
              <button onClick={handleLogout} className="sidebar-nav-item w-full" style={{ color: '#f87171', width: '100%', margin: 0 }}>
                <LogOut size={20} style={{ color: '#f87171' }} />
                <span style={{ color: '#f87171', fontSize: 14, fontWeight: 500 }}>Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Desktop sidebar ────────────────────────────────────────────────────────
export function Sidebar({ onCollapse }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const toggle = (val) => {
    setCollapsed(val);
    onCollapse?.(val);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-[150] md:hidden flex items-center justify-center w-10 h-10 rounded-xl"
        style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}
        aria-label="Open menu"
      >
        <Menu size={20} style={{ color: '#a855f7' }} />
      </button>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Desktop Sidebar */}
      <motion.aside
        className="sidebar hidden md:flex"
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)', minHeight: 72 }}>
          <motion.div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center pulse-purple"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Zap size={18} className="text-white" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-lg whitespace-nowrap"
                style={{ fontFamily: 'Space Grotesk', color: '#f1f5f9' }}
              >
                Creator<span className="gradient-text-purple">HQ</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ path, icon: Icon, label }, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <NavLink
                to={path}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Icon size={20} className="flex-shrink-0" />
                    </motion.div>
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500 }}
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: '#a855f7' }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t py-3 px-2 flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <AnimatePresence>
            {!collapsed && user && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3 pb-2 overflow-hidden"
              >
                <p className="text-xs" style={{ color: '#64748b' }}>Logged in as</p>
                <p className="text-sm font-semibold truncate" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk' }}>
                  {user.username}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={handleLogout}
            className="sidebar-nav-item w-full"
            style={{ margin: '0 8px', width: 'calc(100% - 16px)' }}
            title={collapsed ? 'Logout' : undefined}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <LogOut size={20} className="flex-shrink-0" style={{ color: '#f87171' }} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#f87171', fontSize: 14, fontWeight: 500 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Collapse Toggle */}
        <motion.button
          onClick={() => toggle(!collapsed)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center border"
          style={{
            background: '#1e293b',
            borderColor: 'rgba(255,255,255,0.12)',
            color: '#64748b',
            zIndex: 101,
          }}
          whileHover={{ scale: 1.2, borderColor: '#7c3aed', color: '#a855f7' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </motion.button>
      </motion.aside>
    </>
  );
}
