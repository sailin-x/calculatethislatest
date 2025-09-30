export interface './insurance/loss-ratio-calculator/loss_ratio_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/loss-ratio-calculator/loss_ratio_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/loss-ratio-calculator/loss_ratio_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/loss-ratio-calculator/loss_ratio_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
