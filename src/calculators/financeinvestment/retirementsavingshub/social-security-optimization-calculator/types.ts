export interface social_security_optimization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface social_security_optimization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface social_security_optimization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface social_security_optimization_calculatorOutputs {
  result: number;
  analysis: social_security_optimization_calculatorAnalysis;
}
