export interface registerRetirementAbroadCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRetirementAbroadCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRetirementAbroadCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRetirementAbroadCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
