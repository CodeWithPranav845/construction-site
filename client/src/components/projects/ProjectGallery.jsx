import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from '../common/SmartImage.jsx';

/** Thumbnail grid + fullscreen viewer (arrow keys and Esc work). */
export default function ProjectGallery({ images = [], title = '' }) {
  const [active, setActive] = useState(null); // index of the open image, or null

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, close, prev, next]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="overflow-hidden rounded-sm border border-line"
          >
            <SmartImage src={src} alt={`${title} photo ${i + 1}`} className="aspect-[4/3] w-full transition-opacity hover:opacity-85" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blueprint-dark/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo viewer`}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <button type="button" onClick={close} aria-label="Close viewer" className="absolute right-4 top-4 rounded-sm p-2 text-white hover:bg-white/10">
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-3 rounded-sm p-2 text-white hover:bg-white/10">
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button type="button" onClick={next} aria-label="Next photo" className="absolute right-3 rounded-sm p-2 text-white hover:bg-white/10">
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <SmartImage src={images[active]} alt={`${title} photo ${active + 1}`} className="max-h-[85vh] max-w-full !object-contain" />
          <p className="absolute bottom-4 text-sm text-white/80">
            {active + 1} of {images.length}
          </p>
        </div>
      )}
    </>
  );
}
