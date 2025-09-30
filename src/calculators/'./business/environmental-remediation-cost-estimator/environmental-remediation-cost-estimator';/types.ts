export interface './business/environmental-remediation-cost-estimator/environmental-remediation-cost-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/environmental-remediation-cost-estimator/environmental-remediation-cost-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './business/environmental-remediation-cost-estimator/environmental-remediation-cost-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/environmental-remediation-cost-estimator/environmental-remediation-cost-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
