import { splitLines } from './helpers.js';

/**
 * Turns admin form state into what we send to the API.
 *
 * - No files picked  -> plain JSON (matches the API contract: image fields are URL strings)
 * - Files picked     -> multipart/form-data. Each file is sent under the SAME field name
 *                       (image, coverImage, avatar, photo, gallery) so Multer can read it.
 *
 * If the backend's upload field names differ, this is the ONLY file you need to change.
 */
export function buildPayload(fields, values, files) {
  const hasFiles = Object.values(files).some((f) => (Array.isArray(f) ? f.length > 0 : Boolean(f)));

  if (!hasFiles) {
    const body = {};
    fields.forEach((f) => {
      let v = values[f.name];
      if (f.type === 'gallery') v = splitLines(v);
      if (f.type === 'number') v = v === '' ? undefined : Number(v);
      body[f.name] = v;
    });
    return body;
  }

  const fd = new FormData();
  fields.forEach((f) => {
    const v = values[f.name];
    if (f.type === 'image') {
      if (files[f.name]) fd.append(f.name, files[f.name]);
      else if (v) fd.append(f.name, v);
    } else if (f.type === 'gallery') {
      splitLines(v).forEach((url) => fd.append('existingGallery', url));
      (files[f.name] || []).forEach((file) => fd.append(f.name, file));
    } else if (v !== undefined && v !== null && v !== '') {
      fd.append(f.name, v);
    }
  });
  return fd;
}
