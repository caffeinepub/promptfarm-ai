import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCurrentUserProfile } from '../hooks/useCurrentUserProfile';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthButton from '../components/auth/AuthButton';
import ProfileSetupDialog from '../components/auth/ProfileSetupDialog';
import Seo from '../components/seo/Seo';

export default function AuthPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useCurrentUserProfile();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, userProfile, navigate]);

  return (
    <>
      <Seo title="Login" description="Login to PromptFarm AI to access your favorites and premium features." />

      <div className="container py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome to PromptFarm AI</CardTitle>
              <CardDescription>Login to access your favorites and premium features</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <AuthButton />
            </CardContent>
          </Card>
        </div>
      </div>

      <ProfileSetupDialog open={showProfileSetup} />
    </>
  );
}
