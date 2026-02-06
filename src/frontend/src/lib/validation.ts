export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) {
    return 'Message is required';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  return null;
}
