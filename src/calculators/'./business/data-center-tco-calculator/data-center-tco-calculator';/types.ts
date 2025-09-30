export interface './business/data-center-tco-calculator/data-center-tco-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/data-center-tco-calculator/data-center-tco-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/data-center-tco-calculator/data-center-tco-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/data-center-tco-calculator/data-center-tco-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
