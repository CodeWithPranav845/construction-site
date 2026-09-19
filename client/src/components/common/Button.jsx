import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-survey text-white hover:bg-survey-dark',
  dark: 'bg-blueprint text-white hover:bg-blueprint-light',
  outline: 'border border-blueprint text-blueprint hover:bg-blueprint hover:text-white',
  outlineLight: 'border border-white/70 text-white hover:bg-white hover:text-blueprint',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-blueprint hover:bg-concrete',
};
const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-7 py-3.5 text-lg',
};

/**
 * <Button to="/contact">Get a quote</Button>   -> renders a router <Link>
 * <Button onClick={save} loading={saving}>Save</Button> -> renders a <button>
 */
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={loading || disabled} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
