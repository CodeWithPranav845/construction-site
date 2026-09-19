import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { getTestimonials } from '../../services/testimonialApi.js';
import TestimonialCard from './TestimonialCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';

const AUTOPLAY_MS = 7000;

export default function TestimonialSlider() {
  const { data, loading, error, refetch } = useFetch(() => getTestimonials(), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const items = data?.items ?? [];
  const count = items.length;

  // Auto-advance, but stop while the visitor hovers/focuses the slider
  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused]);

  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="bg-paper section-y">
      <div className="container-x">
        <SectionHeading title="What clients say after handover" />

        <div className="mt-10">
          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {count > 0 && (
            <div
              className="mx-auto max-w-3xl"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              aria-roledescription="carousel"
              aria-label="Client testimonials"
            >
              <div aria-live="polite">
                <TestimonialCard testimonial={items[index % count]} />
              </div>

              {count > 1 && (
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-2" role="group" aria-label="Choose testimonial">
                    {items.map((t, i) => (
                      <button
                        key={t._id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Show testimonial ${i + 1}`}
                        aria-current={i === index % count}
                        className={`h-2.5 rounded-full transition-all ${
                          i === index % count ? 'w-8 bg-survey' : 'w-2.5 bg-line hover:bg-steel'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-sm border border-line bg-white p-2 hover:border-blueprint">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="rounded-sm border border-line bg-white p-2 hover:border-blueprint">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
