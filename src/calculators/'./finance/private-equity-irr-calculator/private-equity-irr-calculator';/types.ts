export interface './finance/private-equity-irr-calculator/private-equity-irr-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/private-equity-irr-calculator/private-equity-irr-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/private-equity-irr-calculator/private-equity-irr-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/private-equity-irr-calculator/private-equity-irr-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
