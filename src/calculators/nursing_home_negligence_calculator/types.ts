export interface nursing_home_negligence_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface nursing_home_negligence_calculatorResults {
  result: number;
  analysis?: string;
}

export interface nursing_home_negligence_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface nursing_home_negligence_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
