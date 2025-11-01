export interface daily_calorie_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface daily_calorie_calculatorResults {
  result: number;
  analysis?: string;
}

export interface daily_calorie_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface daily_calorie_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
