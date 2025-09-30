export interface './finance/defined-benefit-plan/defined-benefit-plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/defined-benefit-plan/defined-benefit-plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/defined-benefit-plan/defined-benefit-plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/defined-benefit-plan/defined-benefit-plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
