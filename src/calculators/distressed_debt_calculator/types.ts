export interface distressed_debt_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface distressed_debt_calculatorResults {
  result: number;
  analysis?: string;
}

export interface distressed_debt_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface distressed_debt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
