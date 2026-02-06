import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PromptRecord } from '../../backend';
import { getCategoryInfo } from '../categories/categoryConfig';
import CategoryIcon from '../categories/CategoryIcon';
import CopyButton from '../common/CopyButton';
import FavoriteToggleButton from './FavoriteToggleButton';
import { useCurrentUserProfile } from '../../hooks/useCurrentUserProfile';

interface PromptDetailsViewProps {
  prompt: PromptRecord;
}

export default function PromptDetailsView({ prompt }: PromptDetailsViewProps) {
  const categoryInfo = getCategoryInfo(prompt.category);
  const { data: userProfile } = useCurrentUserProfile();
  const hasAccess = !prompt.isPremium || userProfile?.hasPremiumMembership;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {categoryInfo && <CategoryIcon iconIndex={categoryInfo.iconIndex} />}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{prompt.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{categoryInfo?.label || 'Other'}</Badge>
              {prompt.isPremium && <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">Premium</Badge>}
              {prompt.isNew && <Badge variant="outline">New</Badge>}
              {prompt.isPopular && <Badge variant="outline">Popular</Badge>}
            </div>
          </div>
          <FavoriteToggleButton promptId={prompt.id} />
        </div>
        <p className="text-lg text-muted-foreground">{prompt.description}</p>
      </div>

      <Separator />

      {/* Prompt Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prompt</CardTitle>
            {hasAccess ? (
              <CopyButton text={prompt.fullText} />
            ) : (
              <Button variant="outline" disabled>
                <Lock className="h-4 w-4 mr-2" />
                Premium Only
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {hasAccess ? (
            <div className="bg-muted/50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm">{prompt.fullText}</pre>
            </div>
          ) : (
            <div className="bg-muted/50 p-8 rounded-lg text-center space-y-4">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Premium Content</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to premium to access this prompt and 100+ more exclusive prompts.
                </p>
                <Button asChild>
                  <Link to="/membership">View Membership Plans</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      {hasAccess && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ol>
              <li>Copy the prompt using the button above</li>
              <li>Paste it into your preferred AI tool (ChatGPT, Claude, Midjourney, etc.)</li>
              <li>Customize any placeholders or parameters to fit your specific needs</li>
              <li>Generate and refine your results</li>
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Example Results */}
      {hasAccess && (
        <Card>
          <CardHeader>
            <CardTitle>Example Results</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              This prompt has been tested and produces high-quality results across various AI platforms. Results may
              vary based on the specific AI model and parameters used.
            </p>
            <p className="text-muted-foreground italic">
              Tip: Experiment with different variations and parameters to achieve the best results for your specific
              use case.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
