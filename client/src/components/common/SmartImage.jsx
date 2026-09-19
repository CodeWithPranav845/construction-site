import { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * <img> that shows a neutral placeholder when the URL is missing or broken,
 * so an empty Cloudinary link never leaves a hole in the layout.
 * Always give it a size via className (e.g. "h-48 w-full").
 */
export default function SmartImage({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt || 'No image available'}
        className={`flex items-center justify-center bg-concrete text-steel/60 ${className}`}
      >
        <ImageIcon className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
