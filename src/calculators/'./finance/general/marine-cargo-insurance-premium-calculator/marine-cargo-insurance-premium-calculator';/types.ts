export interface './finance/general/marine-cargo-insurance-premium-calculator/marine-cargo-insurance-premium-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/marine-cargo-insurance-premium-calculator/marine-cargo-insurance-premium-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/marine-cargo-insurance-premium-calculator/marine-cargo-insurance-premium-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/marine-cargo-insurance-premium-calculator/marine-cargo-insurance-premium-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
