export interface './finance/general/body-surface-area-calculator/body-surface-area-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/body-surface-area-calculator/body-surface-area-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/body-surface-area-calculator/body-surface-area-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/body-surface-area-calculator/body-surface-area-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
