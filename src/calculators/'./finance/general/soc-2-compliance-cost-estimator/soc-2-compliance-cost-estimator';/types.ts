export interface './finance/general/soc-2-compliance-cost-estimator/soc-2-compliance-cost-estimator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/soc-2-compliance-cost-estimator/soc-2-compliance-cost-estimator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/soc-2-compliance-cost-estimator/soc-2-compliance-cost-estimator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/soc-2-compliance-cost-estimator/soc-2-compliance-cost-estimator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
