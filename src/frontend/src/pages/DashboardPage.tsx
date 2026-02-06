import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCurrentUserProfile } from '../hooks/useCurrentUserProfile';
import { useGetFavoritePrompts } from '../hooks/useQueries';
import { useNavigate, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Heart, Crown } from 'lucide-react';
import PromptCard from '../components/prompts/PromptCard';
import { downloadPromptsAsText } from '../lib/download';
import Seo from '../components/seo/Seo';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: profileLoading } = useCurrentUserProfile();
  const { data: favorites = [], isLoading: favoritesLoading } = useGetFavoritePrompts();

  useEffect(() => {
    if (!identity && !profileLoading) {
      navigate({ to: '/auth' });
    }
  }, [identity, profileLoading, navigate]);

  const handleDownloadAll = () => {
    if (favorites.length === 0) {
      toast.error('No favorites to download');
      return;
    }
    downloadPromptsAsText(favorites);
    toast.success('Favorites downloaded!');
  };

  if (profileLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse text-center py-12 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard" description="Manage your favorites and account settings." />

      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
          <p className="text-lg text-muted-foreground">Manage your favorites and account</p>
        </div>

        <Tabs defaultValue="favorites" className="space-y-6">
          <TabsList>
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="membership">
              <Crown className="h-4 w-4 mr-2" />
              Membership
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Favorite Prompts</CardTitle>
                    <CardDescription>
                      {favorites.length} {favorites.length === 1 ? 'prompt' : 'prompts'} saved
                    </CardDescription>
                  </div>
                  {favorites.length > 0 && (
                    <Button onClick={handleDownloadAll} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {favoritesLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading favorites...</div>
                ) : favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">You haven't saved any favorites yet.</p>
                    <Button asChild>
                      <Link to="/library">Browse Prompts</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((prompt) => (
                      <PromptCard key={prompt.id.toString()} prompt={prompt} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Membership Status</CardTitle>
                <CardDescription>Manage your premium membership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Current Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {userProfile.hasPremiumMembership ? 'Premium Member' : 'Free Plan'}
                    </p>
                  </div>
                  <Badge
                    className={
                      userProfile.hasPremiumMembership
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-muted'
                    }
                  >
                    {userProfile.hasPremiumMembership ? 'Premium' : 'Free'}
                  </Badge>
                </div>

                {!userProfile.hasPremiumMembership && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upgrade to premium to unlock exclusive prompts and features.
                    </p>
                    <Button asChild>
                      <Link to="/membership">View Membership Plans</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
