export interface ceding_commission_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ceding_commission_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ceding_commission_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ceding_commission_calculatorOutputs {
  result: number;
  analysis: ceding_commission_calculatorAnalysis;
}
