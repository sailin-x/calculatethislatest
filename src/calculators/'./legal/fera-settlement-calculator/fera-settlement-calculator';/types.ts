export interface './legal/fera-settlement-calculator/fera-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/fera-settlement-calculator/fera-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/fera-settlement-calculator/fera-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/fera-settlement-calculator/fera-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
