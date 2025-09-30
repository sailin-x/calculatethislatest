export interface './finance/cash-out-refinance/cash-out-refinance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cash-out-refinance/cash-out-refinance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cash-out-refinance/cash-out-refinance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cash-out-refinance/cash-out-refinance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
