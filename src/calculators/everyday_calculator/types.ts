export interface everyday_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface everyday_calculatorResults {
  result: number;
  analysis?: string;
}

export interface everyday_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface everyday_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
