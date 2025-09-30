export interface './business/saas-metrics/saas-metrics';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/saas-metrics/saas-metrics';Results {
  result: number;
  analysis?: string;
}

export interface './business/saas-metrics/saas-metrics';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/saas-metrics/saas-metrics';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
