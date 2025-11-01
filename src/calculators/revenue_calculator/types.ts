export interface revenue_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface revenue_calculatorResults {
  result: number;
  analysis?: string;
}

export interface revenue_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
