const POINTS = [
  {
    title: 'One accountable team',
    text: 'The engineer who quotes your project stays on it until handover, so you always know who to call.',
  },
  {
    title: 'A schedule you can hold us to',
    text: 'You get a written programme before work starts and a progress report every Friday.',
  },
  {
    title: 'Materials you can inspect',
    text: 'Cement, steel and fittings come from named suppliers, and test certificates are shared with you.',
  },
  {
    title: 'Prices that do not drift',
    text: 'Quotes list every line item. Any change is agreed in writing before the work happens.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-paper section-y">
      <div className="container-x">
        <h2 className="max-w-2xl text-3xl md:text-4xl">How we run a site</h2>
        <dl className="mt-10 grid border-l border-t border-line sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.title} className="border-b border-r border-line bg-white p-7 md:p-9">
              <dt className="font-display text-xl font-bold">{p.title}</dt>
              <dd className="mt-2 max-w-md text-steel">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
