export interface SocialSecurityOptimizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface SocialSecurityOptimizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface SocialSecurityOptimizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface SocialSecurityOptimizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
