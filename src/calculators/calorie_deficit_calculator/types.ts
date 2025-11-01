export interface calorie_deficit_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calorie_deficit_calculatorResults {
  result: number;
  analysis?: string;
}

export interface calorie_deficit_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calorie_deficit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
