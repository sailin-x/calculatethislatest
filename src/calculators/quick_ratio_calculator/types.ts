export interface quick_ratio_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface quick_ratio_calculatorResults {
  result: number;
  analysis?: string;
}

export interface quick_ratio_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface quick_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
