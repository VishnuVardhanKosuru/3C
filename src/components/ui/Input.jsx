import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({ label, type = 'text', value, onChange, placeholder, id, required, className = '' }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${className}`}>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
        className="input-field"
        autoComplete={type === 'password' ? 'current-password' : 'off'}
      />
      <label className="input-label" htmlFor={id}>{label}</label>
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
          style={{ color: 'var(--text-muted)' }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
