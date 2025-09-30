export interface './legal/probate-calculator/probate-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/probate-calculator/probate-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/probate-calculator/probate-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/probate-calculator/probate-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
