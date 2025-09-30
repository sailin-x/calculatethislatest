export interface business_process_re_engineering_bpr_savings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface business_process_re_engineering_bpr_savings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface business_process_re_engineering_bpr_savings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface business_process_re_engineering_bpr_savings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
