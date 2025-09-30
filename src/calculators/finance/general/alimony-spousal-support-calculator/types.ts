export interface alimony_spousal_support_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface alimony_spousal_support_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface alimony_spousal_support_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface alimony_spousal_support_calculatorOutputs {
  result: number;
  analysis: alimony_spousal_support_calculatorAnalysis;
}
