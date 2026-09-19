import PageHeader from '../components/common/PageHeader.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import SmartImage from '../components/common/SmartImage.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import CTA from '../components/home/CTA.jsx';
import useFetch from '../hooks/useFetch.js';
import { getTeam } from '../services/teamApi.js';
import { FACTS, SITE } from '../config/site.js';

const VALUES = [
  {
    title: 'Structural safety comes first',
    text: 'Every slab, column and footing is checked against the approved design before concrete is poured.',
  },
  {
    title: 'Honest scheduling',
    text: 'We give you dates we can keep. If something slips, you hear about it that day, not at handover.',
  },
  {
    title: 'Clean, safe sites',
    text: 'Tidy sites are safer and faster. Our crews wear protective gear and neighbours get advance notice of noisy work.',
  },
];

export default function About() {
  const { data, loading, error, refetch } = useFetch(() => getTeam(), []);

  return (
    <>
      <PageHeader
        title="A contractor that answers its phone"
        description={`${SITE.name} is a construction company built around one idea: clients should never have to chase progress.`}
        crumbs={[{ label: 'About' }]}
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="max-w-xl space-y-5 text-lg text-steel">
            <h2 className="text-3xl text-blueprint md:text-4xl">Our story</h2>
            <p>
              We started as a three-person crew building single-storey homes. Word spread because we finished on the
              dates we promised, so the jobs grew: apartment blocks, showrooms, and eventually factories.
            </p>
            <p>
              Today, engineers, architects and site supervisors work under one roof. That means a design change on
              Monday is on the drawings by Tuesday and on site by Wednesday.
            </p>
          </div>

          <dl className="grid grid-cols-2 border-l border-t border-line">
            {FACTS.map((f) => (
              <div key={f.label} className="border-b border-r border-line p-6 md:p-8">
                <dt className="text-steel">{f.label}</dt>
                <dd className="mt-1 font-display text-4xl font-extrabold md:text-5xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="container-x">
          <SectionHeading title="What we will not compromise on" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t-2 border-survey bg-white p-6">
                <h3 className="text-xl">{v.title}</h3>
                <p className="mt-2 text-steel">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading title="The people you will work with" subtitle="Real engineers and architects, not a call centre." />
          <div className="mt-10">
            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}
            {data && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.items.map((m) => (
                  <article key={m._id} className="overflow-hidden rounded-sm border border-line">
                    <SmartImage src={m.photo} alt={m.name} className="aspect-[5/6] w-full" />
                    <div className="p-5">
                      <h3 className="text-lg">{m.name}</h3>
                      <p className="text-sm font-medium text-survey">{m.designation}</p>
                      {m.bio && <p className="mt-2 text-sm text-steel">{m.bio}</p>}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
