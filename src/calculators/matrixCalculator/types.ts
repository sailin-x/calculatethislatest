export interface matrixCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface matrixCalculatorResults {
  result: number;
  analysis?: string;
}

export interface matrixCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface matrixCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
