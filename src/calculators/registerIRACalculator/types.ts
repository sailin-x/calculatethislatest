export interface registerIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
