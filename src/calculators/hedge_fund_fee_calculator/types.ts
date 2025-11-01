export interface hedge_fund_fee_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hedge_fund_fee_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hedge_fund_fee_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hedge_fund_fee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
