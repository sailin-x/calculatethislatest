export interface registerEbitdaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerEbitdaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerEbitdaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerEbitdaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
