export interface './financeinvestment/retirementsavingshub/social-security-optimization-calculator/social_security_optimization_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/retirementsavingshub/social-security-optimization-calculator/social_security_optimization_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/retirementsavingshub/social-security-optimization-calculator/social_security_optimization_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/retirementsavingshub/social-security-optimization-calculator/social_security_optimization_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
