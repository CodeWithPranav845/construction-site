import { AlertTriangle } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-survey" aria-hidden="true" />
      <p className="font-medium">We couldn't load this content.</p>
      <p className="text-sm text-steel">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
