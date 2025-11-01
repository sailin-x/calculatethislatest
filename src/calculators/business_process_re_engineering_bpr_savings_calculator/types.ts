export interface business_process_re_engineering_bpr_savings_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface business_process_re_engineering_bpr_savings_calculatorResults {
  result: number;
  analysis?: string;
}

export interface business_process_re_engineering_bpr_savings_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface business_process_re_engineering_bpr_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
