export interface loan_to_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loan_to_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface loan_to_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loan_to_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
