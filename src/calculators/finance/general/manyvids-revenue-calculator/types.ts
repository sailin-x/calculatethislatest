export interface manyvids_revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface manyvids_revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface manyvids_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface manyvids_revenue_calculatorOutputs {
  result: number;
  analysis: manyvids_revenue_calculatorAnalysis;
}
