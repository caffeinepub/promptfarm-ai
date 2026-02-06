import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { PromptRecord } from '../../backend';
import { getCategoryInfo } from '../categories/categoryConfig';
import CategoryIcon from '../categories/CategoryIcon';
import CopyButton from '../common/CopyButton';
import FavoriteToggleButton from './FavoriteToggleButton';
import { buildPromptPath } from '../../lib/promptRouting';
import { useCurrentUserProfile } from '../../hooks/useCurrentUserProfile';

interface PromptCardProps {
  prompt: PromptRecord;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const categoryInfo = getCategoryInfo(prompt.category);
  const { data: userProfile } = useCurrentUserProfile();
  const hasAccess = !prompt.isPremium || userProfile?.hasPremiumMembership;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {categoryInfo && <CategoryIcon iconIndex={categoryInfo.iconIndex} className="w-8 h-8" />}
            <Badge variant="secondary" className="text-xs">
              {categoryInfo?.label || 'Other'}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {prompt.isPremium && <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">Premium</Badge>}
            {prompt.isNew && <Badge variant="outline">New</Badge>}
            {prompt.isPopular && <Badge variant="outline">Popular</Badge>}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{prompt.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {hasAccess ? (
            <CopyButton text={prompt.fullText} size="sm" />
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </Button>
          )}
          <Button size="sm" variant="outline" asChild>
            <Link to={buildPromptPath(prompt)}>View Details</Link>
          </Button>
        </div>
        <FavoriteToggleButton promptId={prompt.id} />
      </CardFooter>
    </Card>
  );
}
