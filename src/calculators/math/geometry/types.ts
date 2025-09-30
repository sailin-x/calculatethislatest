export interface GeometryCalculatorInputs {
  shape: 'circle' | 'rectangle' | 'triangle' | 'square' | 'parallelogram' | 'trapezoid' | 'ellipse' | 'sphere' | 'cube' | 'cylinder' | 'cone' | 'pyramid';
  dimensions: Record<string, number>;
  calculation: 'area' | 'perimeter' | 'volume' | 'surface_area' | 'diagonal' | 'circumference';
  precision: number;
  measurementSystem: 'metric' | 'imperial';
}

export interface GeometryCalculatorMetrics {
  area: number;
  perimeter: number;
  volume: number;
  surfaceArea: number;
  diagonal: number;
  circumference: number;
  radius: number;
  diameter: number;
  height: number;
  width: number;
  length: number;
}

export interface GeometryCalculatorAnalysis {
  shapeProperties: string[];
  calculationMethod: string;
  optimization: string[];
  practicalApplications: string[];
}

export interface GeometryCalculatorOutputs {
  result: number;
  unit: string;
  analysis: GeometryCalculatorAnalysis;
}
