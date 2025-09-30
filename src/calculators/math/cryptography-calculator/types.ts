export interface CryptographyCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface CryptographyCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface CryptographyCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface CryptographyCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: CryptographyCalculatorAnalysis;
}
