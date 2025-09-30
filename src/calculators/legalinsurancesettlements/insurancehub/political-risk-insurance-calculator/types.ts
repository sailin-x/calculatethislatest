export interface political_risk_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface political_risk_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface political_risk_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface political_risk_insurance_calculatorOutputs {
  result: number;
  analysis: political_risk_insurance_calculatorAnalysis;
}
