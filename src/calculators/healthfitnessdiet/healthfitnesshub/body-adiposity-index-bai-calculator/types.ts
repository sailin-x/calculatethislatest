export interface body_adiposity_index_bai_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface body_adiposity_index_bai_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface body_adiposity_index_bai_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface body_adiposity_index_bai_calculatorOutputs {
  result: number;
  analysis: body_adiposity_index_bai_calculatorAnalysis;
}
