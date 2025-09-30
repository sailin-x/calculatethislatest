export interface './finance/general/commercial-fleet-insurance-premium-estimator/commercial-fleet-insurance-premium-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/commercial-fleet-insurance-premium-estimator/commercial-fleet-insurance-premium-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/commercial-fleet-insurance-premium-estimator/commercial-fleet-insurance-premium-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/commercial-fleet-insurance-premium-estimator/commercial-fleet-insurance-premium-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
