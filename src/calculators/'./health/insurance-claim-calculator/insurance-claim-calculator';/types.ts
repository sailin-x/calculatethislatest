export interface './health/insurance-claim-calculator/insurance-claim-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/insurance-claim-calculator/insurance-claim-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/insurance-claim-calculator/insurance-claim-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/insurance-claim-calculator/insurance-claim-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
