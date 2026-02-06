import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface FormStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  successMessage?: string;
  errorMessage?: string;
}

export default function FormStatus({ status, successMessage, errorMessage }: FormStatusProps) {
  if (status === 'idle') return null;

  if (status === 'loading') {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Processing...</AlertTitle>
        <AlertDescription>Please wait while we process your request.</AlertDescription>
      </Alert>
    );
  }

  if (status === 'success') {
    return (
      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>{successMessage || 'Your request was successful.'}</AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage || 'Something went wrong. Please try again.'}</AlertDescription>
      </Alert>
    );
  }

  return null;
}
