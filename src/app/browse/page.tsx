"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { ComponentCard } from "@/components/ui/component-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, Eye } from "lucide-react";
import { sampleComponents, componentCategories } from "@/lib/components-data";

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredComponents = useMemo(() => {
    let filtered = sampleComponents.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        component.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || component.category === selectedCategory;
      const matchesComplexity =
        selectedComplexity === "all" ||
        component.complexity === selectedComplexity;

      return matchesSearch && matchesCategory && matchesComplexity;
    });

    // Sort components
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "complexity":
          const complexityOrder = { simple: 1, medium: 2, complex: 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedComplexity, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedComplexity("all");
  };

  const hasActiveFilters =
    searchTerm || selectedCategory !== "all" || selectedComplexity !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Browse Components
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover and customize our collection of 3D components
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bg-background/50 border-border/50">
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

              <Select
                value={selectedComplexity}
                onValueChange={setSelectedComplexity}
              >
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Complexity</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredComponents.length} component
                    {filteredComponents.length !== 1 ? "s" : ""} found
                  </span>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="hover:bg-primary/10"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-background/50 border-border/50 w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="complexity">Complexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover-glow bg-primary/10 border-primary/20"
                  onClick={() => setSearchTerm("")}
                >
                  Search: "{searchTerm}" <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover-glow bg-primary/10 border-primary/20"
                  onClick={() => setSelectedCategory("all")}
                >
                  Category:{" "}
                  {
                    componentCategories.find((c) => c.id === selectedCategory)
                      ?.name
                  }{" "}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {selectedComplexity !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover-glow bg-primary/10 border-primary/20"
                  onClick={() => setSelectedComplexity("all")}
                >
                  Complexity: {selectedComplexity}{" "}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        ) : (
          <Card className="glass-morphism card-hover border-2 border-border/50">
            <CardContent className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                No components found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filter criteria to find what
                you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="btn-glow"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
