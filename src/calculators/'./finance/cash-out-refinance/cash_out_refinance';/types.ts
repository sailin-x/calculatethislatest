export interface './finance/cash-out-refinance/cash_out_refinance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cash-out-refinance/cash_out_refinance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cash-out-refinance/cash_out_refinance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cash-out-refinance/cash_out_refinance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
