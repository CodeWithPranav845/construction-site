import { PROJECT_CATEGORIES } from '../../config/site.js';

const OPTIONS = ['All', ...PROJECT_CATEGORIES];

/** Category buttons. `value` is the active category, `onChange` receives the new one. */
export default function ProjectFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {OPTIONS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={value === c}
          className={`rounded-sm border px-4 py-2 text-sm font-medium transition-colors ${
            value === c ? 'border-blueprint bg-blueprint text-white' : 'border-line hover:border-blueprint'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
