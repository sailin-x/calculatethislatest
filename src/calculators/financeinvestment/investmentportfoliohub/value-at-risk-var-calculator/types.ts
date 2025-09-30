export interface value_at_risk_var_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface value_at_risk_var_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface value_at_risk_var_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface value_at_risk_var_calculatorOutputs {
  result: number;
  analysis: value_at_risk_var_calculatorAnalysis;
}
