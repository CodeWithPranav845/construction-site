import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? 'fill-survey text-survey' : 'text-line'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
