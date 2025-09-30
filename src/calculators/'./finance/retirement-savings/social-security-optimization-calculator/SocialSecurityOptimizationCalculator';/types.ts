export interface './finance/retirement-savings/social-security-optimization-calculator/SocialSecurityOptimizationCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/social-security-optimization-calculator/SocialSecurityOptimizationCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/social-security-optimization-calculator/SocialSecurityOptimizationCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/social-security-optimization-calculator/SocialSecurityOptimizationCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
