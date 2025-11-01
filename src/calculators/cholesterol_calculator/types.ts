export interface cholesterol_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cholesterol_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cholesterol_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cholesterol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
