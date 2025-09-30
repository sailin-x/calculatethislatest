export interface wildfire_risk_scoring_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface wildfire_risk_scoring_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface wildfire_risk_scoring_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface wildfire_risk_scoring_calculatorOutputs {
  result: number;
  analysis: wildfire_risk_scoring_calculatorAnalysis;
}
