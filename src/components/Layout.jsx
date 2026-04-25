import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';

/**
 * Shared page layout wrapper.
 * Renders the sidebar and a <main> that adjusts its left margin
 * whenever the sidebar collapses / expands.
 */
export function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Animated background – shared across all inner pages */}
      <div className="bg-animated" aria-hidden="true">
        <div className="bg-orb-3" />
      </div>

      <Sidebar onCollapse={setCollapsed} />

      {/* Main content shifts right by the sidebar width on md+ */}
      <motion.main
        className="flex-1 relative z-10 min-h-screen"
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          /* On mobile the sidebar is hidden, so no margin needed */
          paddingTop: 'clamp(16px, 4vw, 40px)',
          paddingBottom: 40,
          paddingLeft: 'clamp(16px, 4vw, 40px)',
          paddingRight: 'clamp(16px, 4vw, 40px)',
        }}
      >
        {/* Small screens: leave space for the floating hamburger button */}
        <div className="md:hidden h-14" aria-hidden="true" />
        {children}
      </motion.main>
    </div>
  );
}
