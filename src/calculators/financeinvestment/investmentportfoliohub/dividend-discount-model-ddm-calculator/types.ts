export interface dividend_discount_model_ddm_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dividend_discount_model_ddm_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dividend_discount_model_ddm_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dividend_discount_model_ddm_calculatorOutputs {
  result: number;
  analysis: dividend_discount_model_ddm_calculatorAnalysis;
}
