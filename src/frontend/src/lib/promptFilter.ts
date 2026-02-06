import { PromptRecord, PromptCategory } from '../backend';

export interface FilterOptions {
  search: string;
  category: PromptCategory | 'all';
  tier: 'all' | 'free' | 'premium';
  sort: 'all' | 'popular' | 'new';
}

export function filterPrompts(prompts: PromptRecord[], filters: FilterOptions): PromptRecord[] {
  let filtered = [...prompts];

  // Text search
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  // Tier filter
  if (filters.tier === 'free') {
    filtered = filtered.filter((p) => !p.isPremium);
  } else if (filters.tier === 'premium') {
    filtered = filtered.filter((p) => p.isPremium);
  }

  // Sort filter
  if (filters.sort === 'popular') {
    filtered = filtered.filter((p) => p.isPopular);
  } else if (filters.sort === 'new') {
    filtered = filtered.filter((p) => p.isNew);
  }

  return filtered;
}
