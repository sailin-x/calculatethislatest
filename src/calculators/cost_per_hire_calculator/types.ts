export interface cost_per_hire_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cost_per_hire_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cost_per_hire_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cost_per_hire_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
