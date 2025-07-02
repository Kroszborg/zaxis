'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { ModelViewer } from '@/components/3d/model-viewer';
import { ControlPanel } from '@/components/customization/control-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useComponentStore } from '@/lib/store';
import { sampleComponents } from '@/lib/components-data';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { generateComponentCode } from '@/lib/code-generator';

export default function ViewerPage() {
  const searchParams = useSearchParams();
  const componentId = searchParams.get('id');
  const { selectedComponent, customization, setSelectedComponent } = useComponentStore();

  useEffect(() => {
    if (componentId) {
      const component = sampleComponents.find(c => c.id === componentId);
      if (component) {
        setSelectedComponent(component);
      }
    } else if (!selectedComponent) {
      // Default to first component if none selected
      setSelectedComponent(sampleComponents[0]);
    }
  }, [componentId, selectedComponent, setSelectedComponent]);

  if (!selectedComponent) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Component not found</h1>
            <Link href="/browse">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const generatedCode = generateComponentCode(selectedComponent, customization);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{selectedComponent.name}</h1>
              <p className="text-muted-foreground">{selectedComponent.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedComponent.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-morphism">
              <CardContent className="p-0">
                <div className="h-96 lg:h-[600px]">
                  <ModelViewer modelPath={selectedComponent.modelPath} />
                </div>
              </CardContent>
            </Card>

            {/* Code Preview */}
            <Card className="glass-morphism">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Code</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://docs.pmnd.rs/react-three-fiber', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  R3F Docs
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <ControlPanel />
            
            {/* Component Info */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Component Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium capitalize">{selectedComponent.category}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Complexity:</span>
                    <div className="font-medium capitalize">{selectedComponent.complexity}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Downloads:</span>
                    <div className="font-medium">{selectedComponent.downloadCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="font-medium">{selectedComponent.rating} ⭐</div>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground text-sm">Materials:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedComponent.materials.map((material) => (
                      <Badge key={material} variant="secondary" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedComponent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}