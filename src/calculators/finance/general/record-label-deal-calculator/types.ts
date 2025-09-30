export interface record_label_deal_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface record_label_deal_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface record_label_deal_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface record_label_deal_calculatorOutputs {
  result: number;
  analysis: record_label_deal_calculatorAnalysis;
}
