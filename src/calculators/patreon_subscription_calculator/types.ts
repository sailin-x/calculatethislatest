export interface patreon_subscription_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface patreon_subscription_calculatorResults {
  result: number;
  analysis?: string;
}

export interface patreon_subscription_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface patreon_subscription_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
