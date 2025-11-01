export interface cost_of_poor_quality_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cost_of_poor_quality_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cost_of_poor_quality_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cost_of_poor_quality_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
