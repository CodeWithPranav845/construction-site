import { useEffect, useState } from 'react';
import { CheckCircle2, Plus, XCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import Pagination from '../common/Pagination.jsx';
import DataTable from './DataTable.jsx';
import ResourceForm from './ResourceForm.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

/**
 * One reusable CRUD screen (table + add/edit modal + delete confirmation).
 * ManageServices, ManageProjects, ManageTestimonials and ManageTeam are just configs for this.
 *
 * Props:
 *  title, singular      - "Services", "Service"
 *  fields               - form config (see FormField for the types)
 *  columns              - table config (see DataTable)
 *  api                  - { list, create, update, remove } functions from src/services/*Api.js
 */
export default function ResourceManager({ title, singular, description, fields, columns, api, pageSize = 10 }) {
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', text }

  const { data, loading, error, refetch } = useFetch(() => api.list({ page, limit: pageSize }), [page]);

  // Notices fade away by themselves
  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(id);
  }, [notice]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  // ResourceForm calls this; if it throws, the form shows the error and stays open
  const handleSubmit = async (payload) => {
    const wasEditing = Boolean(editing);
    if (wasEditing) await api.update(editing._id, payload);
    else await api.create(payload);
    closeForm();
    setNotice({ type: 'success', text: `${singular} ${wasEditing ? 'updated' : 'created'}.` });
    refetch();
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await api.remove(deleting._id);
      setNotice({ type: 'success', text: `${singular} deleted.` });
      setDeleting(null);
      // If we just removed the last row on this page, step back one page
      if (data.items.length === 1 && page > 1) setPage(page - 1);
      else refetch();
    } catch (err) {
      setNotice({ type: 'error', text: getErrorMessage(err) });
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  };

  const itemName = deleting?.title || deleting?.name || deleting?.clientName || `this ${singular.toLowerCase()}`;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">{title}</h1>
          {description && <p className="mt-1 text-steel">{description}</p>}
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add {singular.toLowerCase()}
        </Button>
      </div>

      {notice && (
        <div
          role="status"
          className={`mb-4 flex items-center gap-2 rounded-sm border p-3 text-sm ${
            notice.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {notice.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {notice.text}
        </div>
      )}

      {loading && <Loader />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && !loading && (
        <>
          <DataTable
            columns={columns}
            rows={data.items}
            onEdit={openEdit}
            onDelete={setDeleting}
            emptyMessage={`No ${title.toLowerCase()} yet. Use "Add ${singular.toLowerCase()}" to create the first one.`}
          />
          <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}

      <Modal open={formOpen} onClose={closeForm} title={editing ? `Edit ${singular.toLowerCase()}` : `Add ${singular.toLowerCase()}`}>
        <ResourceForm
          key={editing?._id || 'new'}
          fields={fields}
          item={editing}
          submitLabel={editing ? 'Save changes' : `Create ${singular.toLowerCase()}`}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} title={`Delete ${singular.toLowerCase()}?`} size="sm">
        <p>
          You are about to delete <strong>{itemName}</strong>. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleting(null)} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} loading={busy}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
