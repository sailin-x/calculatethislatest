export interface food_combining_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface food_combining_calculatorResults {
  result: number;
  analysis?: string;
}

export interface food_combining_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface food_combining_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
