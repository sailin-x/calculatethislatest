export interface './legal/probate-calculator/probate_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/probate-calculator/probate_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/probate-calculator/probate_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/probate-calculator/probate_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
