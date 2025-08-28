export interface UnitConversionInputs {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: string;
  precision: number;
  temperature?: number;
  pressure?: number;
  density?: number;
  molecularWeight?: number;
}

export interface UnitConversionMetrics {
  convertedValue: number;
  originalValue: number;
  fromUnit: string;
  toUnit: string;
  category: string;
  conversionFactor: number;
  precision: number;
  scientificNotation: string;
  percentageChange: number;
  relativeError: number;
}

export interface UnitConversionAnalysis {
  isAccurate: boolean;
  precision: 'Low' | 'Medium' | 'High';
  recommendation: string;
  keyFeatures: string[];
  limitations: string[];
  categoryInfo: {
    name: string;
    description: string;
    commonUnits: string[];
  };
  conversionNotes: {
    formula: string;
    assumptions: string[];
    specialCases: string[];
  };
}

export interface UnitConversionOutputs extends UnitConversionMetrics {
  analysis: UnitConversionAnalysis;
}
