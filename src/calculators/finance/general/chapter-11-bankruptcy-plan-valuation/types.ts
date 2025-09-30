export interface chapter_11_bankruptcy_plan_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface chapter_11_bankruptcy_plan_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface chapter_11_bankruptcy_plan_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface chapter_11_bankruptcy_plan_valuationOutputs {
  result: number;
  analysis: chapter_11_bankruptcy_plan_valuationAnalysis;
}
