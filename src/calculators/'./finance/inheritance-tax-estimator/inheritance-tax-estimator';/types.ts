export interface './finance/inheritance-tax-estimator/inheritance-tax-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/inheritance-tax-estimator/inheritance-tax-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/inheritance-tax-estimator/inheritance-tax-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/inheritance-tax-estimator/inheritance-tax-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
