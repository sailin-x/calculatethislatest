export interface business_risk_assessment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface business_risk_assessment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface business_risk_assessment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface business_risk_assessment_calculatorOutputs {
  result: number;
  analysis: business_risk_assessment_calculatorAnalysis;
}
