import CategoriesGrid from '../components/categories/CategoriesGrid';
import Seo from '../components/seo/Seo';

export default function CategoriesPage() {
  return (
    <>
      <Seo
        title="Categories"
        description="Browse AI prompts by category: video generation, photo creation, marketing, storytelling, and more."
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse by Category</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect prompts for your specific needs across all categories
          </p>
        </div>

        <CategoriesGrid />
      </div>
    </>
  );
}
