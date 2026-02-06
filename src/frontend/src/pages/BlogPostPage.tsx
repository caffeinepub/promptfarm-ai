import { useParams, Link } from '@tanstack/react-router';
import { useGetBlogPost } from '../hooks/useQueries';
import { parseBlogPostId } from '../lib/blogRouting';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/seo/Seo';

export default function BlogPostPage() {
  const { postId } = useParams({ strict: false }) as { postId: string };
  const id = parseBlogPostId(postId);
  const { data: post, isLoading } = useGetBlogPost(id);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse text-center py-12 text-muted-foreground">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title={post.title} description={post.content.substring(0, 160)} />

      <div className="container py-8 md:py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-muted-foreground">
              By {post.author} • {new Date(Number(post.timestamp) / 1000000).toLocaleDateString()}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
