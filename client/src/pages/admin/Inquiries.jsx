import { useEffect, useState } from 'react';
import { CheckCircle2, Eye, Mail, Phone, Trash2, XCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { deleteInquiry, getInquiries, updateInquiryStatus } from '../../services/contactApi.js';
import { INQUIRY_STATUSES } from '../../config/site.js';
import { formatDate, getErrorMessage, telHref, truncate } from '../../utils/helpers.js';

const FILTERS = ['all', ...INQUIRY_STATUSES];

export default function Inquiries() {
  const { data, loading, error, refetch } = useFetch(() => getInquiries(), []);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(id);
  }, [notice]);

  const items = data?.items ?? [];
  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter);
  const countFor = (f) => (f === 'all' ? items.length : items.filter((i) => i.status === f).length);

  const changeStatus = async (inquiry, status) => {
    setBusy(true);
    try {
      const updated = await updateInquiryStatus(inquiry._id, status);
      setSelected((prev) => (prev ? { ...prev, ...(updated || {}), status } : prev));
      setNotice({ type: 'success', text: `Marked as ${status}.` });
      refetch();
    } catch (err) {
      setNotice({ type: 'error', text: getErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteInquiry(deleting._id);
      setNotice({ type: 'success', text: 'Inquiry deleted.' });
      setDeleting(null);
      setSelected(null);
      refetch();
    } catch (err) {
      setNotice({ type: 'error', text: getErrorMessage(err) });
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Contact',
      render: (r) => (
        <div>
          <p className="font-medium">{r.name}</p>
          <p className="text-steel">{r.email}</p>
        </div>
      ),
    },
    { key: 'projectType', label: 'Type' },
    { key: 'budgetRange', label: 'Budget', render: (r) => r.budgetRange || '-' },
    { key: 'message', label: 'Message', render: (r) => truncate(r.message, 60) },
    { key: 'createdAt', label: 'Received', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <h1 className="text-3xl">Inquiries</h1>
      <p className="mt-1 text-steel">Quote requests sent from the Contact page.</p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-sm border px-4 py-2 text-sm font-medium ${
              filter === f ? 'border-blueprint bg-blueprint text-white' : 'border-line bg-white hover:border-blueprint'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({countFor(f)})
          </button>
        ))}
      </div>

      {notice && (
        <div
          role="status"
          className={`mt-4 flex items-center gap-2 rounded-sm border p-3 text-sm ${
            notice.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {notice.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {notice.text}
        </div>
      )}

      <div className="mt-4">
        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {data && !loading && (
          <DataTable
            columns={columns}
            rows={visible}
            onDelete={setDeleting}
            renderActions={(row) => (
              <button type="button" onClick={() => setSelected(row)} aria-label="View details" className="rounded-sm p-2 hover:bg-concrete">
                <Eye className="h-4 w-4" />
              </button>
            )}
            emptyMessage={filter === 'all' ? 'No quote requests yet.' : `No ${filter} inquiries.`}
          />
        )}
      </div>

      {/* Details modal */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Quote request">
        {selected && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xl font-bold">{selected.name}</p>
                <p className="text-sm text-steel">Received {formatDate(selected.createdAt)}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-steel">Project type</dt>
                <dd className="font-medium">{selected.projectType}</dd>
              </div>
              <div>
                <dt className="text-steel">Budget</dt>
                <dd className="font-medium">{selected.budgetRange || 'Not given'}</dd>
              </div>
              <div>
                <dt className="text-steel">Email</dt>
                <dd>
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 font-medium hover:underline">
                    <Mail className="h-4 w-4 text-survey" /> {selected.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-steel">Phone</dt>
                <dd>
                  <a href={telHref(selected.phone)} className="inline-flex items-center gap-1.5 font-medium hover:underline">
                    <Phone className="h-4 w-4 text-survey" /> {selected.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-5 rounded-sm border border-line bg-paper p-4">
              <p className="whitespace-pre-line">{selected.message}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setDeleting(selected)}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" disabled={busy || selected.status === 'contacted'} onClick={() => changeStatus(selected, 'contacted')}>
                  Mark contacted
                </Button>
                <Button disabled={busy || selected.status === 'resolved'} onClick={() => changeStatus(selected, 'resolved')}>
                  Mark resolved
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} title="Delete inquiry?" size="sm">
        <p>
          Delete the request from <strong>{deleting?.name}</strong>? This cannot be undone.
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
