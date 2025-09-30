export interface college_financial_aidCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface college_financial_aidCalculatorResults {
  result: number;
  analysis?: string;
}

export interface college_financial_aidCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface college_financial_aidCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
