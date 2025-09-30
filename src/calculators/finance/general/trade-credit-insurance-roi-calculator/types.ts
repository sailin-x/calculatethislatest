export interface trade_credit_insurance_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface trade_credit_insurance_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface trade_credit_insurance_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface trade_credit_insurance_roi_calculatorOutputs {
  result: number;
  analysis: trade_credit_insurance_roi_calculatorAnalysis;
}
