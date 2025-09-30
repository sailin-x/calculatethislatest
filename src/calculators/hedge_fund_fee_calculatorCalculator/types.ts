export interface hedge_fund_fee_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hedge_fund_fee_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hedge_fund_fee_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hedge_fund_fee_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
