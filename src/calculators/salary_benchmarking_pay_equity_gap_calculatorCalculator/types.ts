export interface salary_benchmarking_pay_equity_gap_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface salary_benchmarking_pay_equity_gap_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface salary_benchmarking_pay_equity_gap_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface salary_benchmarking_pay_equity_gap_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
