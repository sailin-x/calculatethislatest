export interface retirementCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface retirementCalculatorResults {
  result: number;
  analysis?: string;
}

export interface retirementCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface retirementCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
