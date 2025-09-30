export interface './finance/general/salary-benchmarking-pay-equity-gap-calculator/salary_benchmarking_pay_equity_gap_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/salary-benchmarking-pay-equity-gap-calculator/salary_benchmarking_pay_equity_gap_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/salary-benchmarking-pay-equity-gap-calculator/salary_benchmarking_pay_equity_gap_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/salary-benchmarking-pay-equity-gap-calculator/salary_benchmarking_pay_equity_gap_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
