export interface GeometryInputs {
  shape: 'circle' | 'rectangle' | 'triangle' | 'square' | 'parallelogram' | 'trapezoid' | 'ellipse' | 'polygon' | 'sphere' | 'cube' | 'cylinder' | 'cone' | 'pyramid' | 'prism';
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
    radius?: number;
    diameter?: number;
    base?: number;
    side?: number;
    apothem?: number;
    slantHeight?: number;
  };
  operation: 'area' | 'perimeter' | 'volume' | 'surfaceArea' | 'circumference' | 'diagonal' | 'altitude' | 'angle' | 'inradius' | 'circumradius';
  units: string;
  precision: number;
  angleUnit: 'degrees' | 'radians';
  sides?: number; // For polygons
}

export interface GeometryMetrics {
  result: number;
  shape: string;
  operation: string;
  units: string;
  precision: number;
  dimensions: Record<string, number>;
  formulas: {
    used: string;
    explanation: string;
  };
  properties: {
    area?: number;
    perimeter?: number;
    volume?: number;
    surfaceArea?: number;
    circumference?: number;
    diagonal?: number;
    altitude?: number;
    angle?: number;
    inradius?: number;
    circumradius?: number;
  };
}

export interface GeometryAnalysis {
  isValid: boolean;
  shapeType: '2D' | '3D';
  complexity: 'simple' | 'moderate' | 'complex';
  recommendation: string;
  keyFeatures: string[];
  limitations: string[];
  mathematicalProperties: {
    isRegular: boolean;
    isConvex: boolean;
    hasSymmetry: boolean;
    isEquilateral: boolean;
    isEquiangular: boolean;
  };
  visualization: {
    vertices: number;
    edges: number;
    faces: number;
    angles: number[];
  };
}

export interface GeometryOutputs extends GeometryMetrics {
  analysis: GeometryAnalysis;
}
