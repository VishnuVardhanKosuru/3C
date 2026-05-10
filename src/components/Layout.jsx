import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';

/* Shared page entry animation used by all inner pages */
export const pageEnter = {
  initial:    { opacity: 0, y: 14 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -8 },
  transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
};

/**
 * PageWrapper — wraps individual page content with a fade+slide entrance.
 * Only use this standalone when NOT inside Layout (e.g. Auth page).
 */
export function PageWrapper({ children, style }) {
  return (
    <motion.div
      initial={pageEnter.initial}
      animate={pageEnter.animate}
      exit={pageEnter.exit}
      transition={pageEnter.transition}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Layout — shared shell with sidebar + main content area.
 *
 * Key fixes:
 * - `style.marginLeft` is set as BOTH the initial style AND the animate target
 *   so there is never a flash of zero-margin on first render.
 * - Padding is generous and consistent so nothing clips against the sidebar.
 * - A max-width content wrapper prevents over-stretching on wide screens.
 */
export function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 72 : 240;

  return (
    <div className="flex min-h-screen relative">
      {/* Animated background – shared across all inner pages */}
      <div className="bg-animated" aria-hidden="true">
        <div className="bg-orb-3" />
      </div>

      <Sidebar onCollapse={setCollapsed} />

      {/*
        Main content area.
        We set initial marginLeft equal to the current sidebar width
        so the first paint is already correct — no flash/clipping.
      */}
      <motion.main
        className="flex-1 relative z-10 min-h-screen overflow-x-hidden"
        initial={{ marginLeft: sidebarW }}
        animate={{ marginLeft: sidebarW }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          paddingTop:    32,
          paddingBottom: 48,
          paddingLeft:   32,
          paddingRight:  32,
        }}
      >
        {/* Mobile: space for hamburger button */}
        <div className="md:hidden h-14" aria-hidden="true" />

        {/* Content max-width wrapper — prevents over-stretch on ultrawide */}
        <div style={{ maxWidth: 1400, width: '100%' }}>
          <PageWrapper>{children}</PageWrapper>
        </div>
      </motion.main>
    </div>
  );
}
