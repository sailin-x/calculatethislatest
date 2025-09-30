export interface RetirementAbroadCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface RetirementAbroadCalculatorResults {
  result: number;
  analysis?: string;
}

export interface RetirementAbroadCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface RetirementAbroadCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
