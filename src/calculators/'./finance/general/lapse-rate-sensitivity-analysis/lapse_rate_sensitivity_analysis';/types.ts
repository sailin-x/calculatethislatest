export interface './finance/general/lapse-rate-sensitivity-analysis/lapse_rate_sensitivity_analysis';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/lapse-rate-sensitivity-analysis/lapse_rate_sensitivity_analysis';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/lapse-rate-sensitivity-analysis/lapse_rate_sensitivity_analysis';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/lapse-rate-sensitivity-analysis/lapse_rate_sensitivity_analysis';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
