import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from './categoryConfig';
import CategoryIcon from './CategoryIcon';

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CATEGORIES.map((category) => (
        <Link
          key={category.key}
          to="/library"
          search={{ category: category.key }}
          className="group"
        >
          <Card className="h-full transition-all hover:shadow-lg hover:scale-105 hover:border-primary/50">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                <CategoryIcon iconIndex={category.iconIndex} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
