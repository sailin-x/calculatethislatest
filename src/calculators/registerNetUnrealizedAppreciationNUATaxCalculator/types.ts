export interface registerNetUnrealizedAppreciationNUATaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerNetUnrealizedAppreciationNUATaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerNetUnrealizedAppreciationNUATaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerNetUnrealizedAppreciationNUATaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
