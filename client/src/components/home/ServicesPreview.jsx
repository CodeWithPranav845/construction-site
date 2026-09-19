import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { getServices } from '../../services/serviceApi.js';
import ServiceIcon from '../common/ServiceIcon.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import Button from '../common/Button.jsx';

export default function ServicesPreview() {
  const { data, loading, error, refetch } = useFetch(() => getServices({ featured: true, limit: 4 }), []);

  return (
    <section className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl md:text-4xl">What we build</h2>
          <p className="mt-4 text-lg text-steel">
            From a single family home to a working factory, we take the job from first sketch to keys in hand.
          </p>
          <Button to="/services" variant="outline" className="mt-6">
            See all services
          </Button>
        </div>

        <div>
          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {data && (
            <ul className="divide-y divide-line border-y border-line">
              {data.items.map((s) => (
                <li key={s._id}>
                  <Link
                    to={`/services/${s._id}`}
                    className="group flex items-start gap-5 py-6 transition-colors hover:bg-paper sm:px-3"
                  >
                    <ServiceIcon icon={s.icon} title={s.title} className="mt-1 h-7 w-7 shrink-0 text-survey" />
                    <div className="flex-1">
                      <h3 className="text-xl">{s.title}</h3>
                      <p className="mt-1 text-steel">{s.shortDescription}</p>
                    </div>
                    <ChevronRight className="mt-2 h-5 w-5 shrink-0 text-steel transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
