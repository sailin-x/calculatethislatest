export interface './finance/general/self-funded-health-plan-vs-fully-insured-calculator/self-funded-health-plan-vs-fully-insured-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/self-funded-health-plan-vs-fully-insured-calculator/self-funded-health-plan-vs-fully-insured-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/self-funded-health-plan-vs-fully-insured-calculator/self-funded-health-plan-vs-fully-insured-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/self-funded-health-plan-vs-fully-insured-calculator/self-funded-health-plan-vs-fully-insured-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
