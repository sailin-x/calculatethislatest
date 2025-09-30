export interface './finance/general/management-fee-hurdle-rate-calculator/management_fee_hurdle_rate_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management_fee_hurdle_rate_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management_fee_hurdle_rate_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management_fee_hurdle_rate_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
