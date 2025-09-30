export interface UnitConversionCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface UnitConversionCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface UnitConversionCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface UnitConversionCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: UnitConversionCalculatorAnalysis;
}
