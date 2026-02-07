import { useState, useMemo, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useGetAllPrompts } from '../hooks/useQueries';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { filterPrompts } from '../lib/promptFilter';
import PromptCard from '../components/prompts/PromptCard';
import PromptFilters, { type FilterState } from '../components/prompts/PromptFilters';
import Seo from '../components/seo/Seo';
import { PromptCategory } from '../backend';

// Valid category keys from the backend
const VALID_CATEGORIES = [
  'videoGeneration',
  'photoGeneration',
  'cgiAds',
  'marketing',
  'storytelling',
  'business',
  'socialMedia',
  'design',
];

function isValidCategory(category: string | undefined): category is PromptCategory {
  return category !== undefined && VALID_CATEGORIES.includes(category);
}

export default function PromptLibraryPage() {
  const searchParams = useSearch({ strict: false }) as { category?: string };
  const { data: prompts = [], isLoading } = useGetAllPrompts();

  // Validate and normalize category from search params
  const initialCategory = isValidCategory(searchParams.category)
    ? (searchParams.category as PromptCategory)
    : 'all';

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: initialCategory,
    tier: 'all',
    sort: 'all',
  });

  // Sync filters with URL params when they change
  useEffect(() => {
    const urlCategory = isValidCategory(searchParams.category)
      ? (searchParams.category as PromptCategory)
      : 'all';
    
    setFilters((prev) => ({
      ...prev,
      category: urlCategory,
    }));
  }, [searchParams.category]);

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const filteredPrompts = useMemo(() => {
    return filterPrompts(prompts, { ...filters, search: debouncedSearch });
  }, [prompts, filters, debouncedSearch]);

  return (
    <>
      <Seo
        title="Prompt Library"
        description="Browse 1000+ professional AI prompts for video generation, photo creation, marketing, and more."
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Prompt Library</h1>
          <p className="text-lg text-muted-foreground">
            Discover {prompts.length}+ professional AI prompts
          </p>
        </div>

        <div className="mb-8">
          <PromptFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading prompts...</div>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No prompts found matching your filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id.toString()} prompt={prompt} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
