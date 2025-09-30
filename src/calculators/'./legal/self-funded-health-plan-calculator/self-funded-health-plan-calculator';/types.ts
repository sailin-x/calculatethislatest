export interface './legal/self-funded-health-plan-calculator/self-funded-health-plan-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/self-funded-health-plan-calculator/self-funded-health-plan-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/self-funded-health-plan-calculator/self-funded-health-plan-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/self-funded-health-plan-calculator/self-funded-health-plan-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
