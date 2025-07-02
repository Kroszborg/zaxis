'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ComponentCard } from '@/components/ui/component-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { sampleComponents, componentCategories } from '@/lib/components-data';

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredComponents = useMemo(() => {
    let filtered = sampleComponents.filter((component) => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || component.complexity === selectedComplexity;
      
      return matchesSearch && matchesCategory && matchesComplexity;
    });

    // Sort components
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'complexity':
          const complexityOrder = { simple: 1, medium: 2, complex: 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedComplexity, sortBy]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Components</h1>
          <p className="text-muted-foreground">
            Discover and customize our collection of 3D components
          </p>
        </div>

        {/* Filters */}
        <div className="glass-morphism p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {componentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger>
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Complexity</SelectItem>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="complex">Complex</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="complexity">Complexity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all' || selectedComplexity !== 'all') && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm('')}>
                Search: {searchTerm} ×
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('all')}>
                Category: {componentCategories.find(c => c.id === selectedCategory)?.name} ×
              </Badge>
            )}
            {selectedComplexity !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedComplexity('all')}>
                Complexity: {selectedComplexity} ×
              </Badge>
            )}
          </div>
        )}

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No components found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedComplexity('all');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}