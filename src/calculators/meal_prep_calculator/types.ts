export interface meal_prep_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface meal_prep_calculatorResults {
  result: number;
  analysis?: string;
}

export interface meal_prep_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface meal_prep_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
