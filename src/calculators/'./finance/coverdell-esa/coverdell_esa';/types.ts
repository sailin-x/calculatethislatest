export interface './finance/coverdell-esa/coverdell_esa';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/coverdell-esa/coverdell_esa';Results {
  result: number;
  analysis?: string;
}

export interface './finance/coverdell-esa/coverdell_esa';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/coverdell-esa/coverdell_esa';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
