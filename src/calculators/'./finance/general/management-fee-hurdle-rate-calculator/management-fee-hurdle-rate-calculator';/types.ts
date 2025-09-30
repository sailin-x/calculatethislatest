export interface './finance/general/management-fee-hurdle-rate-calculator/management-fee-hurdle-rate-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management-fee-hurdle-rate-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management-fee-hurdle-rate-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/management-fee-hurdle-rate-calculator/management-fee-hurdle-rate-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
