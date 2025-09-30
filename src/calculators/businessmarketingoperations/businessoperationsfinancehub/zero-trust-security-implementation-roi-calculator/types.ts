export interface zero_trust_security_implementation_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface zero_trust_security_implementation_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface zero_trust_security_implementation_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface zero_trust_security_implementation_roi_calculatorOutputs {
  result: number;
  analysis: zero_trust_security_implementation_roi_calculatorAnalysis;
}
