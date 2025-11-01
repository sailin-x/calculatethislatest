export interface emergency_fund_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface emergency_fund_calculatorResults {
  result: number;
  analysis?: string;
}

export interface emergency_fund_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface emergency_fund_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
