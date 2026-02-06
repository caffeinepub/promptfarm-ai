import { useParams } from '@tanstack/react-router';
import { useGetPrompt } from '../hooks/useQueries';
import { parsePromptId } from '../lib/promptRouting';
import PromptDetailsView from '../components/prompts/PromptDetailsView';
import Seo from '../components/seo/Seo';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function PromptDetailsPage() {
  const { promptId } = useParams({ strict: false }) as { promptId: string };
  const id = parsePromptId(promptId);
  const { data: prompt, isLoading } = useGetPrompt(id);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse text-center py-12 text-muted-foreground">Loading prompt...</div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Prompt Not Found</h1>
          <p className="text-muted-foreground mb-6">The prompt you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/library">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title={prompt.title} description={prompt.description} />

      <div className="container py-8 md:py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/library">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Link>
        </Button>

        <PromptDetailsView prompt={prompt} />
      </div>
    </>
  );
}
