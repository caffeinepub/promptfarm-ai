import { Link } from '@tanstack/react-router';
import { useGetAllBlogPosts } from '../hooks/useQueries';
import { buildBlogPostPath } from '../lib/blogRouting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Seo from '../components/seo/Seo';

export default function BlogIndexPage() {
  const { data: posts = [], isLoading } = useGetAllBlogPosts();

  return (
    <>
      <Seo
        title="Blog"
        description="Learn about AI tools, prompt engineering, and creative techniques from the PromptFarm AI blog."
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-lg text-muted-foreground">
            AI tools, prompt engineering tips, and creative insights
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id.toString()} to={buildBlogPostPath(post)}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="mt-4 text-xs text-muted-foreground">
                      By {post.author} • {new Date(Number(post.timestamp) / 1000000).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
