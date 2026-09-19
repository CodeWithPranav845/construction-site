import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import { submitInquiry } from '../../services/contactApi.js';
import { validateInquiry } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import { BUDGET_RANGES, PROJECT_TYPES } from '../../config/site.js';

const EMPTY = { name: '', email: '', phone: '', projectType: '', budgetRange: '', message: '' };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the field's error as soon as the person starts fixing it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const found = validateInquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await submitInquiry({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      });
      setSent(true);
      setValues(EMPTY);
    } catch (err) {
      // Backend validation errors may look like [{ field, message }]; show them under the right input
      const list = err?.response?.data?.errors;
      if (Array.isArray(list) && list.length) {
        const mapped = {};
        list.forEach((item) => {
          if (item?.field) mapped[item.field] = item.message;
        });
        setErrors(mapped);
      }
      setServerError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="rounded-sm border border-line bg-paper p-8">
        <CheckCircle2 className="h-8 w-8 text-survey" aria-hidden="true" />
        <h3 className="mt-4 text-2xl">Thanks, we have your request</h3>
        <p className="mt-2 text-steel">An engineer will reply within one working day. Check your email for our response.</p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  const cls = (name) => `field ${errors[name] ? 'field-error' : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} className={cls('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91-9876543210" value={values.phone} onChange={handleChange} className={cls('phone')} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
        </Field>
      </div>

      <Field id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} className={cls('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="projectType" label="Project type" error={errors.projectType}>
          <select id="projectType" name="projectType" value={values.projectType} onChange={handleChange} className={cls('projectType')} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? 'projectType-error' : undefined}>
            <option value="">Choose one</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budgetRange" label="Budget (optional)" error={errors.budgetRange}>
          <select id="budgetRange" name="budgetRange" value={values.budgetRange} onChange={handleChange} className={cls('budgetRange')}>
            <option value="">Not sure yet</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Tell us about the project" error={errors.message}>
        <textarea id="message" name="message" rows={5} placeholder="Plot size, location, number of floors, when you want to start..." value={values.message} onChange={handleChange} className={cls('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
      </Field>

      <Button type="submit" size="lg" loading={submitting}>
        {submitting ? 'Sending...' : 'Send quote request'}
      </Button>
    </form>
  );
}
