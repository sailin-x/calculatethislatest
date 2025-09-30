export interface './legal/construction-accident-calculator/construction-accident-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/construction-accident-calculator/construction-accident-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/construction-accident-calculator/construction-accident-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/construction-accident-calculator/construction-accident-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
