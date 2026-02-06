import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToggleFavorite, useGetFavoritePrompts } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

interface FavoriteToggleButtonProps {
  promptId: bigint;
}

export default function FavoriteToggleButton({ promptId }: FavoriteToggleButtonProps) {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: favorites } = useGetFavoritePrompts();
  const toggleFavorite = useToggleFavorite();

  const isFavorite = favorites?.some((p) => p.id === promptId) || false;

  const handleToggle = async () => {
    if (!identity) {
      toast.error('Please login to save favorites');
      navigate({ to: '/auth' });
      return;
    }

    try {
      await toggleFavorite.mutateAsync(promptId);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error: any) {
      if (error.message?.includes('Premium membership required')) {
        toast.error('Premium membership required');
      } else {
        toast.error('Failed to update favorites');
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={toggleFavorite.isPending}
      className={isFavorite ? 'text-red-500' : ''}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
}
