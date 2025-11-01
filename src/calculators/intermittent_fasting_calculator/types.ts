export interface intermittent_fasting_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface intermittent_fasting_calculatorResults {
  result: number;
  analysis?: string;
}

export interface intermittent_fasting_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface intermittent_fasting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
