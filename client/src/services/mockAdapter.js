// A fake "server" that plugs into Axios (see api.js).
// It understands the same routes, query params, auth rules and response envelope
// as the README's REST contract, so the whole UI can be built and demoed without a backend.

import { db, saveDb, newId, slugify, MOCK_TOKEN, MOCK_ADMIN_CREDENTIALS } from './mockData.js';

const LATENCY_MS = 350;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Which fields each collection requires when creating
const REQUIRED = {
  services: ['title', 'shortDescription', 'fullDescription'],
  projects: ['title', 'category'],
  testimonials: ['clientName', 'message'],
  team: ['name', 'designation'],
  inquiries: ['name', 'email', 'phone', 'message'],
};
// Collections that return the paginated { items, page, totalPages, totalItems } shape
const PAGINATED = ['services', 'projects'];
const LABELS = {
  services: 'Service',
  projects: 'Project',
  testimonials: 'Testimonial',
  team: 'Team member',
  inquiries: 'Inquiry',
};

const success = (config, status, data, message = '') => ({
  data: { success: true, data, message },
  status,
  statusText: 'OK',
  headers: {},
  config,
  request: {},
});

const failure = (config, status, message, errors = []) => {
  const error = new Error(message);
  error.isAxiosError = true;
  error.config = config;
  error.response = {
    data: { success: false, message, errors },
    status,
    statusText: 'Error',
    headers: {},
    config,
    request: {},
  };
  return error;
};

const readToken = (config) => {
  const h = config.headers || {};
  const raw = typeof h.get === 'function' ? h.get('Authorization') : h.Authorization;
  return raw ? String(raw).replace('Bearer ', '') : null;
};

const requireAdmin = (config) => {
  if (readToken(config) !== MOCK_TOKEN) throw failure(config, 401, 'Not authorised. Please log in again.');
};

// Axios turns plain objects into JSON strings; FormData (file uploads) arrives untouched.
const parseBody = (data) => {
  if (!data) return {};
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const out = {};
    data.forEach((value, key) => {
      const val = value instanceof File ? URL.createObjectURL(value) : value;
      if (key === 'gallery' || key === 'existingGallery') (out[key] ||= []).push(val);
      else out[key] = val;
    });
    if (out.existingGallery) {
      out.gallery = [...out.existingGallery, ...(out.gallery || [])];
      delete out.existingGallery;
    }
    return out;
  }
  return data;
};

const coerce = (body) => {
  const out = {};
  Object.entries(body).forEach(([k, v]) => {
    if (v !== undefined) out[k] = v;
  });
  if ('featured' in out) out.featured = out.featured === true || out.featured === 'true';
  if ('rating' in out) out.rating = Math.min(5, Math.max(1, Number(out.rating) || 5));
  return out;
};

const byNewest = (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

const listResource = (name, params) => {
  let items = [...db[name]].sort(byNewest);

  if (params.category && params.category !== 'All') items = items.filter((i) => i.category === params.category);
  if (params.featured === true || params.featured === 'true') items = items.filter((i) => i.featured);
  if (params.search) {
    const q = String(params.search).toLowerCase();
    items = items.filter((i) => (i.title || i.name || '').toLowerCase().includes(q));
  }

  if (!PAGINATED.includes(name)) return items;

  const limit = Math.max(1, parseInt(params.limit, 10) || 9);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const page = Math.min(Math.max(1, parseInt(params.page, 10) || 1), totalPages);
  return { items: items.slice((page - 1) * limit, page * limit), page, totalPages, totalItems };
};

const route = (config) => {
  const method = (config.method || 'get').toLowerCase();
  const [resource, id] = String(config.url).split('?')[0].split('/').filter(Boolean);
  const params = config.params || {};

  // ---------- auth ----------
  if (resource === 'auth') {
    if (id === 'login' && method === 'post') {
      const { email, password } = parseBody(config.data);
      if (email === MOCK_ADMIN_CREDENTIALS.email && password === MOCK_ADMIN_CREDENTIALS.password) {
        return success(config, 200, { token: MOCK_TOKEN, admin: db.admin }, 'Login successful');
      }
      throw failure(config, 401, 'Invalid email or password.');
    }
    if (id === 'me' && method === 'get') {
      requireAdmin(config);
      return success(config, 200, db.admin);
    }
    throw failure(config, 404, 'Route not found');
  }

  if (!(resource in REQUIRED)) throw failure(config, 404, 'Route not found');
  const label = LABELS[resource];

  // Public: reading everything except inquiries, and submitting an inquiry. Everything else is admin-only.
  const publicRead = method === 'get' && resource !== 'inquiries';
  const publicSubmit = method === 'post' && resource === 'inquiries';
  if (!publicRead && !publicSubmit) requireAdmin(config);

  // ---------- read ----------
  if (method === 'get' && !id) return success(config, 200, listResource(resource, params));
  if (method === 'get') {
    const item = db[resource].find((i) => i._id === id);
    if (!item) throw failure(config, 404, `${label} not found`);
    return success(config, 200, item);
  }

  // ---------- create ----------
  if (method === 'post') {
    const body = coerce(parseBody(config.data));
    const errors = REQUIRED[resource]
      .filter((f) => !String(body[f] ?? '').trim())
      .map((f) => ({ field: f, message: `${f} is required` }));
    if (errors.length) throw failure(config, 400, 'Validation failed', errors);

    const item = { _id: newId(), ...body, createdAt: new Date().toISOString() };
    if (resource === 'services') {
      item.slug = slugify(item.title);
      item.featured = Boolean(item.featured);
    }
    if (resource === 'inquiries') item.status = 'new';
    db[resource] = [item, ...db[resource]];
    saveDb();
    return success(config, 201, item, `${label} created`);
  }

  // ---------- update ----------
  if (method === 'put' || method === 'patch') {
    const index = db[resource].findIndex((i) => i._id === id);
    if (index === -1) throw failure(config, 404, `${label} not found`);
    const updated = { ...db[resource][index], ...coerce(parseBody(config.data)) };
    if (resource === 'services') updated.slug = slugify(updated.title);
    db[resource][index] = updated;
    saveDb();
    return success(config, 200, updated, `${label} updated`);
  }

  // ---------- delete ----------
  if (method === 'delete') {
    if (!db[resource].some((i) => i._id === id)) throw failure(config, 404, `${label} not found`);
    db[resource] = db[resource].filter((i) => i._id !== id);
    saveDb();
    return success(config, 200, null, `${label} deleted`);
  }

  throw failure(config, 405, 'Method not allowed');
};

/** Axios adapter: replaces the real network call. */
export async function mockAdapter(config) {
  await wait(LATENCY_MS);
  return route(config);
}
