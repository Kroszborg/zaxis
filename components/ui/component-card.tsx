'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ComponentModel } from '@/types/component';
import { Star, Download, Eye, ArrowRight } from 'lucide-react';
import { useComponentStore } from '@/lib/store';

interface ComponentCardProps {
  component: ComponentModel;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const { setSelectedComponent } = useComponentStore();

  const handleViewComponent = () => {
    setSelectedComponent(component);
  };

  return (
    <Card className="glass-morphism hover-glow group cursor-pointer overflow-hidden">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center bg-gradient-to-br from-primary/20 to-accent/20"
          style={{ backgroundImage: `url(${component.thumbnailPath})` }}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/50 border-white/20">
              {component.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge 
              variant={component.complexity === 'simple' ? 'secondary' : 
                      component.complexity === 'medium' ? 'default' : 'destructive'}
              className="bg-black/50 border-white/20"
            >
              {component.complexity}
            </Badge>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/viewer?id=${component.id}`}>
              <Button 
                size="sm" 
                className="glow-primary"
                onClick={handleViewComponent}
              >
                <Eye className="h-4 w-4 mr-2" />
                View in 3D
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {component.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {component.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {component.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-white/20">
              {tag}
            </Badge>
          ))}
          {component.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-white/20">
              +{component.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{component.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{component.downloadCount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {component.materials.slice(0, 2).map((material) => (
              <div
                key={material}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{
                  backgroundColor: 
                    material === 'steel' ? '#71717a' :
                    material === 'aluminum' ? '#d4d4d8' :
                    material === 'brass' ? '#fbbf24' :
                    material === 'plastic' ? '#3b82f6' :
                    material === 'copper' ? '#ea580c' :
                    material === 'fiberglass' ? '#10b981' :
                    material === 'bronze' ? '#a16207' :
                    material === 'iron' ? '#525252' :
                    material === 'titanium' ? '#9ca3af' :
                    material === 'stainless-steel' ? '#e5e7eb' :
                    '#6b7280'
                }}
                title={material}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}