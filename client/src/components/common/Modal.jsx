import { useEffect } from 'react';
import { X } from 'lucide-react';

const WIDTHS = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

/** Simple accessible dialog: closes on Esc or backdrop click and locks page scroll while open. */
export default function Modal({ open, onClose, title, size = 'md', children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-blueprint-dark/70 p-4 sm:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`w-full ${WIDTHS[size]} rounded-sm bg-white`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-xl">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-sm p-1 hover:bg-concrete">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
