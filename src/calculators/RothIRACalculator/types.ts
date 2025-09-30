export interface RothIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface RothIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface RothIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface RothIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
