const STYLES = {
  new: 'bg-orange-100 text-orange-800',
  contacted: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

export default function StatusBadge({ status = 'new' }) {
  return (
    <span className={`inline-block rounded-sm px-2.5 py-1 text-xs font-medium ${STYLES[status] || 'bg-concrete text-steel'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
