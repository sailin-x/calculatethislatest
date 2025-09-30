export interface registerSocialSecurityOptimizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerSocialSecurityOptimizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerSocialSecurityOptimizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerSocialSecurityOptimizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
