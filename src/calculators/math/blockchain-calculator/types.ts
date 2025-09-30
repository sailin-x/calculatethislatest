export interface BlockchainCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface BlockchainCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface BlockchainCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface BlockchainCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: BlockchainCalculatorAnalysis;
}
