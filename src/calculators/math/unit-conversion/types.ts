export interface UnitConversionCalculatorInputs {
  fromValue: number;
  fromUnit: string;
  toUnit: string;
  category: 'length' | 'weight' | 'volume' | 'temperature' | 'area' | 'speed' | 'time' | 'energy' | 'pressure' | 'currency';
  precision: number;
  exchangeRate: number;
}

export interface UnitConversionCalculatorMetrics {
  convertedValue: number;
  conversionFactor: number;
  precision: number;
  category: string;
  fromUnit: string;
  toUnit: string;
}

export interface UnitConversionCalculatorAnalysis {
  conversionPath: string[];
  accuracy: string;
  commonUses: string[];
  relatedConversions: string[];
}

export interface UnitConversionCalculatorOutputs {
  convertedValue: number;
  conversionFactor: number;
  analysis: UnitConversionCalculatorAnalysis;
}
