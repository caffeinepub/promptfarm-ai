import { lazy, Suspense } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const PromptLibraryPage = lazy(() => import('./pages/PromptLibraryPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const PromptDetailsPage = lazy(() => import('./pages/PromptDetailsPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MembershipPage = lazy(() => import('./pages/MembershipPage'));
const AdminPromptsPage = lazy(() => import('./pages/AdminPromptsPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  ),
});

// Define all routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: PromptLibraryPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: CategoriesPage,
});

const promptDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prompt/$promptId',
  component: PromptDetailsPage,
});

const blogIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogIndexPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$postId',
  component: BlogPostPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/newsletter',
  component: NewsletterPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/membership',
  component: MembershipPage,
});

const adminPromptsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/prompts',
  component: AdminPromptsPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  libraryRoute,
  categoriesRoute,
  promptDetailsRoute,
  blogIndexRoute,
  blogPostRoute,
  aboutRoute,
  contactRoute,
  newsletterRoute,
  authRoute,
  dashboardRoute,
  membershipRoute,
  adminPromptsRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
