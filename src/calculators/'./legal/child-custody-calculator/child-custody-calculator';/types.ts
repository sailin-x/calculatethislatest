export interface './legal/child-custody-calculator/child-custody-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/child-custody-calculator/child-custody-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/child-custody-calculator/child-custody-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/child-custody-calculator/child-custody-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
