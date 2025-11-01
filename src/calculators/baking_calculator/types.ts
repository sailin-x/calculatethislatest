export interface baking_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface baking_calculatorResults {
  result: number;
  analysis?: string;
}

export interface baking_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface baking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
