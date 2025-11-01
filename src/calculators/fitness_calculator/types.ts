export interface fitness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fitness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface fitness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fitness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
