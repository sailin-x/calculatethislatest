export interface taxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface taxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface taxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface taxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
