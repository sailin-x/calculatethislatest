export interface dash_diet_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dash_diet_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dash_diet_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dash_diet_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
