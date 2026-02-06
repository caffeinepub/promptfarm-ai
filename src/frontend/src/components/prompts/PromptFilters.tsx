import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '../categories/categoryConfig';
import { PromptCategory } from '../../backend';

export interface FilterState {
  search: string;
  category: PromptCategory | 'all';
  tier: 'all' | 'free' | 'premium';
  sort: 'all' | 'popular' | 'new';
}

interface PromptFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function PromptFilters({ filters, onFiltersChange }: PromptFiltersProps) {
  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) + (filters.tier !== 'all' ? 1 : 0) + (filters.sort !== 'all' ? 1 : 0);

  const clearFilters = () => {
    onFiltersChange({
      search: filters.search,
      category: 'all',
      tier: 'all',
      sort: 'all',
    });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search prompts..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value as PromptCategory | 'all' })}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.key} value={cat.key}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tier */}
        <Tabs
          value={filters.tier}
          onValueChange={(value) => onFiltersChange({ ...filters, tier: value as FilterState['tier'] })}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort */}
        <Tabs
          value={filters.sort}
          onValueChange={(value) => onFiltersChange({ ...filters, sort: value as FilterState['sort'] })}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.category !== 'all' && (
            <Badge variant="secondary">
              {CATEGORIES.find((c) => c.key === filters.category)?.label}
              <button
                onClick={() => onFiltersChange({ ...filters, category: 'all' })}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.tier !== 'all' && (
            <Badge variant="secondary">
              {filters.tier === 'free' ? 'Free' : 'Premium'}
              <button
                onClick={() => onFiltersChange({ ...filters, tier: 'all' })}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.sort !== 'all' && (
            <Badge variant="secondary">
              {filters.sort === 'popular' ? 'Popular' : 'New'}
              <button
                onClick={() => onFiltersChange({ ...filters, sort: 'all' })}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
