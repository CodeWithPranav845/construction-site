import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import SmartImage from '../components/common/SmartImage.jsx';
import ServiceIcon from '../components/common/ServiceIcon.jsx';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import useFetch from '../hooks/useFetch.js';
import { getServiceById, getServices } from '../services/serviceApi.js';

export default function ServiceDetail() {
  const { id } = useParams();
  const { data: service, loading, error, refetch } = useFetch(() => getServiceById(id), [id]);
  const { data: others } = useFetch(() => getServices({ limit: 6 }), []);

  if (loading) return <Loader className="min-h-[60vh]" />;
  if (error) {
    return (
      <div className="container-x py-16">
        <ErrorState message={error} onRetry={refetch} />
        <p className="text-center">
          <Link to="/services" className="font-medium text-survey hover:underline">
            Back to all services
          </Link>
        </p>
      </div>
    );
  }

  const paragraphs = (service.fullDescription || '').split(/\n+/).filter(Boolean);
  const related = (others?.items ?? []).filter((s) => s._id !== service._id).slice(0, 4);

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <article>
            <SmartImage src={service.image} alt={service.title} className="aspect-[16/9] w-full rounded-sm" />
            <div className="mt-8 max-w-2xl space-y-5 text-lg text-steel">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sm bg-blueprint p-6 text-white">
              <ServiceIcon icon={service.icon} title={service.title} className="h-7 w-7 text-survey" />
              <h2 className="mt-3 text-2xl">Want this built?</h2>
              <p className="mt-2 text-white/80">Tell us about your project and get a written estimate.</p>
              <Button to="/contact" className="mt-5 w-full">
                Get a free quote
              </Button>
            </div>

            {related.length > 0 && (
              <div className="rounded-sm border border-line p-6">
                <h2 className="text-lg">Other services</h2>
                <ul className="mt-3 divide-y divide-line">
                  {related.map((s) => (
                    <li key={s._id}>
                      <Link to={`/services/${s._id}`} className="block py-2.5 text-steel hover:text-blueprint hover:underline">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
