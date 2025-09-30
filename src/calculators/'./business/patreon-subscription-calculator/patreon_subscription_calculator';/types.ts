export interface './business/patreon-subscription-calculator/patreon_subscription_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/patreon-subscription-calculator/patreon_subscription_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/patreon-subscription-calculator/patreon_subscription_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/patreon-subscription-calculator/patreon_subscription_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
