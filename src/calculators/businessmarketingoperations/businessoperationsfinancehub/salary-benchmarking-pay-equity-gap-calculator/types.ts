export interface salary_benchmarking_pay_equity_gap_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface salary_benchmarking_pay_equity_gap_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface salary_benchmarking_pay_equity_gap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface salary_benchmarking_pay_equity_gap_calculatorOutputs {
  result: number;
  analysis: salary_benchmarking_pay_equity_gap_calculatorAnalysis;
}
