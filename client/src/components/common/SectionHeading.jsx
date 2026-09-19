export default function SectionHeading({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-lg text-steel">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
