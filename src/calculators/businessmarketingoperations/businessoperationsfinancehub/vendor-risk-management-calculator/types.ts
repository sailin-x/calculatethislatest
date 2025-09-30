export interface vendor_risk_management_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface vendor_risk_management_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface vendor_risk_management_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface vendor_risk_management_calculatorOutputs {
  result: number;
  analysis: vendor_risk_management_calculatorAnalysis;
}
