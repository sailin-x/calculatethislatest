export interface PaycheckCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface PaycheckCalculatorResults {
  result: number;
  analysis?: string;
}

export interface PaycheckCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface PaycheckCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
