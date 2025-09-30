export interface './legal/immigration-filing-calculator/immigration-filing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/immigration-filing-calculator/immigration-filing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/immigration-filing-calculator/immigration-filing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/immigration-filing-calculator/immigration-filing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
