import { motion } from 'framer-motion';
import { Trash2, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function IdeaCard({ idea, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="idea-card"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
          style={{ background: 'var(--accent-purple-dim)' }}
        >
          <Lightbulb size={15} style={{ color: 'var(--accent-purple-light)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}>
            {idea.text}
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {formatDate(idea.createdAt)}
          </p>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(idea.id)}
          className="flex-shrink-0 !px-2 !py-2 !rounded-lg"
          aria-label="Delete idea"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </motion.div>
  );
}
