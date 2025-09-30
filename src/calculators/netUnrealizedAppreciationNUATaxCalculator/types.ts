export interface netUnrealizedAppreciationNUATaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface netUnrealizedAppreciationNUATaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface netUnrealizedAppreciationNUATaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface netUnrealizedAppreciationNUATaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
