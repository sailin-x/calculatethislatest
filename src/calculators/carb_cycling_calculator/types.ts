export interface carb_cycling_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface carb_cycling_calculatorResults {
  result: number;
  analysis?: string;
}

export interface carb_cycling_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface carb_cycling_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
