export interface registerRetirementCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRetirementCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRetirementCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRetirementCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
