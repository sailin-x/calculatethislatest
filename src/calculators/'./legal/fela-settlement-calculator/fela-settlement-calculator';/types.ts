export interface './legal/fela-settlement-calculator/fela-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/fela-settlement-calculator/fela-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/fela-settlement-calculator/fela-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/fela-settlement-calculator/fela-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
