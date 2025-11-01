export interface hobbies_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hobbies_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hobbies_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hobbies_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
