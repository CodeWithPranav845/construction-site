export default function EmptyState({ title, children }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-display text-xl font-bold">{title}</p>
      {children && <p className="mt-2 text-steel">{children}</p>}
    </div>
  );
}
