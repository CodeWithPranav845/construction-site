import Button from '../common/Button.jsx';
import { SITE } from '../../config/site.js';
import { telHref } from '../../utils/helpers.js';

export default function CTA() {
  return (
    <section className="blueprint-grid text-white">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">Have a plot, a plan, or just an idea?</h2>
          <p className="mt-3 text-lg text-white/80">
            Send us the details. An engineer will reply within one working day with next steps and a rough estimate.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg">
            Get a free quote
          </Button>
          <a
            href={telHref(SITE.phone)}
            className="inline-flex items-center justify-center rounded-sm border border-white/70 px-7 py-3.5 text-lg font-medium text-white transition-colors hover:bg-white hover:text-blueprint"
          >
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
