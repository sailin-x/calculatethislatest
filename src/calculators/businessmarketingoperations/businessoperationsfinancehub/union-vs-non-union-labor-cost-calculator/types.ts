export interface union_vs_non_union_labor_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface union_vs_non_union_labor_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface union_vs_non_union_labor_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface union_vs_non_union_labor_cost_calculatorOutputs {
  result: number;
  analysis: union_vs_non_union_labor_cost_calculatorAnalysis;
}
