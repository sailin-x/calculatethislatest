export interface recipe_scaling_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface recipe_scaling_calculatorResults {
  result: number;
  analysis?: string;
}

export interface recipe_scaling_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface recipe_scaling_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
