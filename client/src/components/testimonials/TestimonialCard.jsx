import { Quote } from 'lucide-react';
import RatingStars from '../common/RatingStars.jsx';
import SmartImage from '../common/SmartImage.jsx';

export default function TestimonialCard({ testimonial }) {
  const { clientName, clientCompany, message, rating, avatar } = testimonial;
  return (
    <figure className="flex h-full flex-col rounded-sm border border-line bg-white p-7 md:p-9">
      <Quote className="h-7 w-7 text-survey" aria-hidden="true" />
      <RatingStars rating={rating} className="mt-4" />
      <blockquote className="mt-4 flex-1 text-lg md:text-xl">{message}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <SmartImage src={avatar} alt="" className="h-12 w-12 rounded-full" />
        <div>
          <p className="font-semibold">{clientName}</p>
          {clientCompany && <p className="text-sm text-steel">{clientCompany}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
