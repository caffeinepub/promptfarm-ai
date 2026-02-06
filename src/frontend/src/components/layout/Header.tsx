import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '../theme/ThemeToggle';
import AuthButton from '../auth/AuthButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const navLinks = [
    { href: '/library', label: 'Prompts' },
    { href: '/categories', label: 'Categories' },
    { href: '/blog', label: 'Blog' },
    { href: '/membership', label: 'Premium' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/generated/promptfarm-logo.dim_512x128.png"
            alt="PromptFarm AI"
            className="h-8 w-auto dark:brightness-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          )}
          <AuthButton />
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    activeProps={{ className: 'text-primary' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    activeProps={{ className: 'text-primary' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <div className="pt-4 border-t">
                  <AuthButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
