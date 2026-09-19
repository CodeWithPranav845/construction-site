import { Pencil, Trash2 } from 'lucide-react';

/**
 * columns: [{ key, label, render?: (row) => node, className? }]
 * Pass onEdit / onDelete to get action buttons, or `renderActions(row)` for custom ones.
 */
export default function DataTable({ columns, rows, onEdit, onDelete, renderActions, emptyMessage = 'Nothing here yet.' }) {
  const hasActions = onEdit || onDelete || renderActions;

  return (
    <div className="overflow-x-auto rounded-sm border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line bg-concrete/60">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={`px-4 py-3 font-semibold ${c.className || ''}`}>
                {c.label}
              </th>
            ))}
            {hasActions && (
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-4 py-12 text-center text-steel">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row._id} className="align-middle hover:bg-paper">
              {columns.map((c) => (
                <td key={c.key} className={`px-4 py-3 ${c.className || ''}`}>
                  {c.render ? c.render(row) : row[c.key] ?? '-'}
                </td>
              ))}
              {hasActions && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    {renderActions?.(row)}
                    {onEdit && (
                      <button type="button" onClick={() => onEdit(row)} aria-label="Edit" className="rounded-sm p-2 hover:bg-concrete">
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button type="button" onClick={() => onDelete(row)} aria-label="Delete" className="rounded-sm p-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
