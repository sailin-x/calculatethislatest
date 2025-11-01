export interface cheat_meal_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cheat_meal_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cheat_meal_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cheat_meal_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
