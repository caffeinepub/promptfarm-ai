import { useState } from 'react';
import { useSubscribeToNewsletter } from '../hooks/useQueries';
import { validateEmail } from '../lib/validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import FormStatus from '../components/common/FormStatus';
import Seo from '../components/seo/Seo';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = useSubscribeToNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('idle');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setStatus('loading');
    try {
      await subscribe.mutateAsync(email.trim());
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  return (
    <>
      <Seo
        title="Newsletter"
        description="Subscribe to the PromptFarm AI newsletter for the latest prompts, tips, and AI insights."
      />

      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest AI prompts, tips, and insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`flex-1 ${error ? 'border-destructive' : ''}`}
                />
                <Button type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive text-left">{error}</p>}
            </div>

            <FormStatus
              status={status}
              successMessage="Thank you for subscribing! Check your inbox for confirmation."
              errorMessage="Failed to subscribe. Please try again."
            />
          </form>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Weekly Updates</h3>
              <p className="text-sm text-muted-foreground">Get new prompts and tips every week</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Exclusive Content</h3>
              <p className="text-sm text-muted-foreground">Access subscriber-only prompts and guides</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Spam</h3>
              <p className="text-sm text-muted-foreground">Unsubscribe anytime with one click</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
