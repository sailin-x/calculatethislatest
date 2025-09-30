export interface business_process_re_engineering_bpr_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface business_process_re_engineering_bpr_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface business_process_re_engineering_bpr_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface business_process_re_engineering_bpr_savings_calculatorOutputs {
  result: number;
  analysis: business_process_re_engineering_bpr_savings_calculatorAnalysis;
}
