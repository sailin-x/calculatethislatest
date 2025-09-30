export interface EbitdaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface EbitdaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface EbitdaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface EbitdaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
