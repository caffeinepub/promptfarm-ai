import { useState } from 'react';
import { useSubmitContactForm } from '../hooks/useQueries';
import { validateEmail, validateName, validateMessage } from '../lib/validation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import FormStatus from '../components/common/FormStatus';
import Seo from '../components/seo/Seo';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submitForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    if (nameError || emailError || messageError) {
      setErrors({
        ...(nameError && { name: nameError }),
        ...(emailError && { email: emailError }),
        ...(messageError && { message: messageError }),
      });
      return;
    }

    setStatus('loading');
    try {
      await submitForm.mutateAsync({ name: name.trim(), email: email.trim(), message: message.trim() });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  return (
    <>
      <Seo title="Contact" description="Get in touch with the PromptFarm AI team. We'd love to hear from you!" />

      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Have a question or feedback? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={6}
                className={errors.message ? 'border-destructive' : ''}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={status === 'loading'} className="w-full">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>

            <FormStatus
              status={status}
              successMessage="Thank you for your message! We'll get back to you soon."
              errorMessage="Failed to send message. Please try again."
            />
          </form>
        </div>
      </div>
    </>
  );
}
