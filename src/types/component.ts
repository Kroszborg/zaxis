export interface ComponentModel {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  modelPath: string;
  thumbnailPath: string;
  defaultScale: [number, number, number];
  defaultRotation: [number, number, number];
  materials: string[];
  complexity: 'simple' | 'medium' | 'complex';
  downloadCount: number;
  rating: number;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}