import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import QuoteForm from '../components/contact/QuoteForm.jsx';
import { SITE } from '../config/site.js';
import { telHref } from '../utils/helpers.js';

export default function Contact() {
  const details = [
    { Icon: Phone, label: 'Phone', value: SITE.phone, href: telHref(SITE.phone) },
    { Icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: MapPin, label: 'Office', value: SITE.address },
    { Icon: Clock, label: 'Hours', value: SITE.hours },
  ];

  return (
    <>
      <PageHeader
        title="Get a free quote"
        description="Tell us what you want to build. An engineer will reply within one working day."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-6 text-2xl md:text-3xl">Project details</h2>
            <QuoteForm />
          </div>

          <aside>
            <h2 className="mb-6 text-2xl md:text-3xl">Or reach us directly</h2>
            <ul className="divide-y divide-line border-y border-line">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-4 py-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-survey" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-steel">{label}</p>
                    {href ? (
                      <a href={href} className="font-medium hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
