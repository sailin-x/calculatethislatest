export interface self_funded_health_plan_vs_fully_insured_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface self_funded_health_plan_vs_fully_insured_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface self_funded_health_plan_vs_fully_insured_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface self_funded_health_plan_vs_fully_insured_calculatorOutputs {
  result: number;
  analysis: self_funded_health_plan_vs_fully_insured_calculatorAnalysis;
}
