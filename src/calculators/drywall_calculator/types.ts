export interface drywall_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface drywall_calculatorResults {
  result: number;
  analysis?: string;
}

export interface drywall_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface drywall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
