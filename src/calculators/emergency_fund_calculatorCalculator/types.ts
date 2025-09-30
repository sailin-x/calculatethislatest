export interface emergency_fund_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface emergency_fund_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface emergency_fund_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface emergency_fund_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
