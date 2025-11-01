export interface personal_injury_multiplier_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface personal_injury_multiplier_calculatorResults {
  result: number;
  analysis?: string;
}

export interface personal_injury_multiplier_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface personal_injury_multiplier_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
