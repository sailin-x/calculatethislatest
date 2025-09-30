export interface './finance/dynasty-trust-growth-estimator/dynasty-trust-growth-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/dynasty-trust-growth-estimator/dynasty-trust-growth-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/dynasty-trust-growth-estimator/dynasty-trust-growth-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/dynasty-trust-growth-estimator/dynasty-trust-growth-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
