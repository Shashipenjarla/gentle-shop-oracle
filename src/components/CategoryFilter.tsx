import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  productCounts: Record<string, number>;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  productCounts 
}: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Categories</h3>
      
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategoryChange(null)}
        >
          All Products
          <Badge variant="secondary" className="ml-auto">
            {Object.values(productCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategoryChange(category)}
          >
            {category}
            <Badge variant="secondary" className="ml-auto">
              {productCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;