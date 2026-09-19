import { useEffect, useState } from 'react';
import SmartImage from '../common/SmartImage.jsx';

// Creates a temporary preview URL for a picked file and cleans it up afterwards
function usePreview(file) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (!file) {
      setUrl('');
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url;
}

const fileInputClass =
  'block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-concrete file:px-3 file:py-2 file:font-medium hover:file:bg-concrete-dark';

function ImageInput({ id, value, file, onChange, onFile }) {
  const preview = usePreview(file);
  const shown = preview || value;
  return (
    <div className="space-y-2">
      <input id={id} type="text" className="field" placeholder="Paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} />
      <input type="file" accept="image/*" aria-label="Or upload an image file" className={fileInputClass} onChange={(e) => onFile(e.target.files?.[0] || null)} />
      {shown && <SmartImage src={shown} alt="Preview" className="h-28 w-40 rounded-sm" />}
    </div>
  );
}

/** Renders one input based on field.type: text | textarea | number | date | select | checkbox | image | gallery */
export default function FormField({ field, value, file, error, onChange, onFile }) {
  const id = `field-${field.name}`;
  const invalid = error ? 'field-error' : '';

  let control;
  switch (field.type) {
    case 'textarea':
      control = <textarea id={id} rows={field.rows || 4} className={`field ${invalid}`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
      break;
    case 'select':
      control = (
        <select id={id} className={`field ${invalid}`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose one</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case 'checkbox':
      control = (
        <label className="flex cursor-pointer items-center gap-2.5">
          <input id={id} type="checkbox" className="h-4 w-4 accent-survey" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.checkboxLabel || field.label}</span>
        </label>
      );
      break;
    case 'image':
      control = <ImageInput id={id} value={value} file={file} onChange={onChange} onFile={onFile} />;
      break;
    case 'gallery':
      control = (
        <div className="space-y-2">
          <textarea id={id} rows={4} className="field" value={value} onChange={(e) => onChange(e.target.value)} placeholder={'One image URL per line'} />
          <input type="file" accept="image/*" multiple aria-label="Or upload image files" className={fileInputClass} onChange={(e) => onFile(Array.from(e.target.files || []))} />
          {file?.length > 0 && <p className="text-sm text-steel">{file.length} file(s) selected for upload</p>}
        </div>
      );
      break;
    default:
      control = (
        <input
          id={id}
          type={field.type || 'text'}
          className={`field ${invalid}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          maxLength={field.maxLength}
        />
      );
  }

  return (
    <div>
      {field.type !== 'checkbox' && (
        <label htmlFor={id} className="field-label">
          {field.label}
          {field.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      {control}
      {field.hint && <p className="mt-1 text-sm text-steel">{field.hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
