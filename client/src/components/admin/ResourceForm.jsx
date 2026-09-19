import { useState } from 'react';
import Button from '../common/Button.jsx';
import FormField from './FormField.jsx';
import { buildPayload } from '../../utils/buildPayload.js';
import { getErrorMessage } from '../../utils/helpers.js';

// Turn an existing record into the string/boolean values the inputs expect
function initialValues(fields, item) {
  const values = {};
  fields.forEach((f) => {
    const existing = item?.[f.name];
    if (existing !== undefined && existing !== null) {
      if (f.type === 'gallery') values[f.name] = existing.join('\n');
      else if (f.type === 'date') values[f.name] = String(existing).slice(0, 10);
      else values[f.name] = existing;
    } else if (f.defaultValue !== undefined) {
      values[f.name] = f.defaultValue;
    } else {
      values[f.name] = f.type === 'checkbox' ? false : '';
    }
  });
  return values;
}

/** Generic create/edit form driven by a `fields` config array (see pages/admin/Manage*.jsx). */
export default function ResourceForm({ fields, item, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => initialValues(fields, item));
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = {};
    fields.forEach((f) => {
      const empty = values[f.name] === '' || values[f.name] == null;
      if (f.required && empty && !files[f.name]) found[f.name] = `${f.label} is required.`;
    });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    setFormError('');
    try {
      await onSubmit(buildPayload(fields, values, files));
    } catch (err) {
      setFormError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      {fields.map((f) => (
        <FormField
          key={f.name}
          field={f}
          value={values[f.name]}
          file={files[f.name]}
          error={errors[f.name]}
          onChange={(v) => {
            setValues((prev) => ({ ...prev, [f.name]: v }));
            if (errors[f.name]) setErrors((prev) => ({ ...prev, [f.name]: undefined }));
          }}
          onFile={(file) => setFiles((prev) => ({ ...prev, [f.name]: file }))}
        />
      ))}

      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" loading={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
