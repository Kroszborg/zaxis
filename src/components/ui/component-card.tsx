"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentModel } from "@/types/component";
import {
  Eye,
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  Building2,
  Shapes,
} from "lucide-react";
import { useComponentStore } from "@/lib/store";

interface ComponentCardProps {
  component: ComponentModel;
}

const categoryIcons = {
  mechanical: Zap,
  decorative: Sparkles,
  structural: Building2,
  electronic: Cpu,
  geometric: Shapes,
};

export function ComponentCard({ component }: ComponentCardProps) {
  const { setSelectedComponent } = useComponentStore();

  const IconComponent =
    categoryIcons[component.category as keyof typeof categoryIcons] || Sparkles;

  const handleViewComponent = () => {
    setSelectedComponent(component);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "complex":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  return (
    <Card className="card-hover group cursor-pointer overflow-hidden border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {component.name}
          </h3>
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm border-border/50"
          >
            {component.category}
          </Badge>
          <Badge
            className={`border ${getComplexityColor(component.complexity)}`}
          >
            {component.complexity}
          </Badge>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
            {component.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {component.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-white/20 bg-background/50"
            >
              {tag}
            </Badge>
          ))}
          {component.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-white/20 bg-background/50"
            >
              +{component.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Action button */}
        <div className="pt-2">
          <Link href={`/viewer?id=${component.id}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full btn-glow group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              onClick={handleViewComponent}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Component
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
