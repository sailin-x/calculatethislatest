export interface mortgage_payoffCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_payoffCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_payoffCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_payoffCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
