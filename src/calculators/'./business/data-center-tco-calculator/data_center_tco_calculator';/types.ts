export interface './business/data-center-tco-calculator/data_center_tco_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/data-center-tco-calculator/data_center_tco_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/data-center-tco-calculator/data_center_tco_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/data-center-tco-calculator/data_center_tco_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
