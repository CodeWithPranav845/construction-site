import { Loader2 } from 'lucide-react';

export default function Loader({ label = 'Loading...', fullPage = false, className = '' }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 text-steel ${
        fullPage ? 'min-h-screen' : 'py-16'
      } ${className}`}
    >
      <Loader2 className="h-7 w-7 animate-spin text-survey" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
