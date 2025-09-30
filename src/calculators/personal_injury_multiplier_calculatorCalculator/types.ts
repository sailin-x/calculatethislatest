export interface personal_injury_multiplier_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface personal_injury_multiplier_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface personal_injury_multiplier_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface personal_injury_multiplier_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
