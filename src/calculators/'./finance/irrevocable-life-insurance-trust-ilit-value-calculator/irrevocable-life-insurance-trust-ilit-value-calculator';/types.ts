export interface './finance/irrevocable-life-insurance-trust-ilit-value-calculator/irrevocable-life-insurance-trust-ilit-value-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/irrevocable-life-insurance-trust-ilit-value-calculator/irrevocable-life-insurance-trust-ilit-value-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/irrevocable-life-insurance-trust-ilit-value-calculator/irrevocable-life-insurance-trust-ilit-value-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/irrevocable-life-insurance-trust-ilit-value-calculator/irrevocable-life-insurance-trust-ilit-value-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
