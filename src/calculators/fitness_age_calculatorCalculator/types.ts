export interface fitness_age_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fitness_age_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fitness_age_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fitness_age_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
