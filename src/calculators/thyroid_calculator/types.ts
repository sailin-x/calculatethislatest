export interface thyroid_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface thyroid_calculatorResults {
  result: number;
  analysis?: string;
}

export interface thyroid_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface thyroid_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
