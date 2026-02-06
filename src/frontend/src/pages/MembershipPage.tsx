import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useCurrentUserProfile } from '../hooks/useCurrentUserProfile';
import Seo from '../components/seo/Seo';

export default function MembershipPage() {
  const { data: userProfile } = useCurrentUserProfile();

  return (
    <>
      <Seo
        title="Membership"
        description="Upgrade to premium and unlock exclusive AI prompts and features on PromptFarm AI."
      />

      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock premium prompts and exclusive features to supercharge your AI workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className={!userProfile?.hasPremiumMembership ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Free</CardTitle>
                {!userProfile?.hasPremiumMembership && <Badge>Current Plan</Badge>}
              </div>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Access to 500+ free prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Basic search and filtering</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Save favorites</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Community support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled={!userProfile?.hasPremiumMembership}>
                {!userProfile?.hasPremiumMembership ? 'Current Plan' : 'Downgrade'}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className={userProfile?.hasPremiumMembership ? 'border-primary' : 'border-2 border-primary'}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Premium</CardTitle>
                {userProfile?.hasPremiumMembership ? (
                  <Badge>Current Plan</Badge>
                ) : (
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">Recommended</Badge>
                )}
              </div>
              <CardDescription>For professionals and power users</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Everything in Free, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Access to 1000+ premium prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Advanced search and filtering</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Bulk download prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Early access to new prompts</span>
                </li>
              </ul>
              <Button className="w-full" disabled={userProfile?.hasPremiumMembership}>
                {userProfile?.hasPremiumMembership ? 'Current Plan' : 'Upgrade to Premium'}
              </Button>
              {!userProfile?.hasPremiumMembership && (
                <p className="text-xs text-center text-muted-foreground">
                  Payment processing coming soon
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel your premium membership at any time. You'll continue to have access until the
                  end of your billing period.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Payment processing is coming soon. We'll support all major credit cards and digital payment
                  methods.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied with your premium membership,
                  contact us for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
