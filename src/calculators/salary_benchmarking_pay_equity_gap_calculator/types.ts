export interface salary_benchmarking_pay_equity_gap_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface salary_benchmarking_pay_equity_gap_calculatorResults {
  result: number;
  analysis?: string;
}

export interface salary_benchmarking_pay_equity_gap_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface salary_benchmarking_pay_equity_gap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
