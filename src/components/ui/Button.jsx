import { useRef } from 'react';

export function Button({ children, variant = 'primary', onClick, className = '', disabled = false, type = 'button', size = 'md' }) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    // Ripple effect
    const btn = btnRef.current;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
    if (onClick) onClick(e);
  };

  const sizeClass = size === 'sm' ? '!px-4 !py-2 !text-sm' : size === 'lg' ? '!px-8 !py-4 !text-lg' : '';

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`btn btn-${variant} ${sizeClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
