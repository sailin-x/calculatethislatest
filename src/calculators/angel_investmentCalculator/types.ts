export interface angel_investmentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface angel_investmentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface angel_investmentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface angel_investmentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
