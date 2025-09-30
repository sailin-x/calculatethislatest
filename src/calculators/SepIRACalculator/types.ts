export interface SepIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface SepIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface SepIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface SepIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
