export interface './legal/bankruptcy-filing-calculator/bankruptcy-filing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/bankruptcy-filing-calculator/bankruptcy-filing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/bankruptcy-filing-calculator/bankruptcy-filing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/bankruptcy-filing-calculator/bankruptcy-filing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
