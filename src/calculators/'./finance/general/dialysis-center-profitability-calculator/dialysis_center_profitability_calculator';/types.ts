export interface './finance/general/dialysis-center-profitability-calculator/dialysis_center_profitability_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/dialysis-center-profitability-calculator/dialysis_center_profitability_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/dialysis-center-profitability-calculator/dialysis_center_profitability_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/dialysis-center-profitability-calculator/dialysis_center_profitability_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
