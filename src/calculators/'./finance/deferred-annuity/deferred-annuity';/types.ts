export interface './finance/deferred-annuity/deferred-annuity';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/deferred-annuity/deferred-annuity';Results {
  result: number;
  analysis?: string;
}

export interface './finance/deferred-annuity/deferred-annuity';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/deferred-annuity/deferred-annuity';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
