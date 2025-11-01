export interface financial_literacy_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_literacy_calculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_literacy_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_literacy_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
