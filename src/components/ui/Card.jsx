export function Card({ children, className = '', onClick, glow }) {
  const glowClass = glow === 'purple' ? 'neon-purple' : glow === 'pink' ? 'neon-pink' : glow === 'blue' ? 'neon-blue' : '';
  return (
    <div
      className={`glass-card ${glowClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
