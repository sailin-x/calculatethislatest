export interface StretchIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface StretchIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface StretchIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface StretchIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
