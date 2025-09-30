export interface './insurance/marine-cargo-calculator/marine-cargo-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/marine-cargo-calculator/marine-cargo-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/marine-cargo-calculator/marine-cargo-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/marine-cargo-calculator/marine-cargo-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
