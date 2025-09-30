export interface registerStretchIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerStretchIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerStretchIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerStretchIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
