export interface calories_burned_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calories_burned_calculatorResults {
  result: number;
  analysis?: string;
}

export interface calories_burned_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calories_burned_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
