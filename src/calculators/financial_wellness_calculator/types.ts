export interface financial_wellness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_wellness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_wellness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_wellness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
