export interface './finance/life-settlement-value-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/life-settlement-value-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/life-settlement-value-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/life-settlement-value-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
