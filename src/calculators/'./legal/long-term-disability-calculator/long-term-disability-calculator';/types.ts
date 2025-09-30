export interface './legal/long-term-disability-calculator/long-term-disability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/long-term-disability-calculator/long-term-disability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/long-term-disability-calculator/long-term-disability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/long-term-disability-calculator/long-term-disability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
