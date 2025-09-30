export interface './finance/amortization/amortization';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/amortization/amortization';Results {
  result: number;
  analysis?: string;
}

export interface './finance/amortization/amortization';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/amortization/amortization';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
