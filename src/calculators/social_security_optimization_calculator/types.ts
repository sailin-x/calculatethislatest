export interface social_security_optimization_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface social_security_optimization_calculatorResults {
  result: number;
  analysis?: string;
}

export interface social_security_optimization_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface social_security_optimization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
