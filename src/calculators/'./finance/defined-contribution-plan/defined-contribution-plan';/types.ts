export interface './finance/defined-contribution-plan/defined-contribution-plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/defined-contribution-plan/defined-contribution-plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/defined-contribution-plan/defined-contribution-plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/defined-contribution-plan/defined-contribution-plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
