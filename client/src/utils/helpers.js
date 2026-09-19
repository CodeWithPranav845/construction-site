// Small pure helpers shared across the app.

/** Pull the most useful message out of an Axios error. */
export const getErrorMessage = (err) =>
  err?.response?.data?.message ||
  err?.message ||
  'Something went wrong. Please try again.';

/**
 * The API contract says list endpoints return { items, page, totalPages, totalItems },
 * but testimonials/team may return a plain array. This accepts both shapes.
 */
export const toPaginated = (data) => {
  if (Array.isArray(data)) {
    return { items: data, page: 1, totalPages: 1, totalItems: data.length };
  }
  const items = data?.items ?? [];
  return {
    items,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    totalItems: data?.totalItems ?? items.length,
  };
};

export const formatDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const truncate = (text = '', max = 90) =>
  text.length > max ? `${text.slice(0, max).trim()}...` : text;

export const splitLines = (text = '') =>
  String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

export const telHref = (phone = '') => `tel:${phone.replace(/[^\d+]/g, '')}`;
