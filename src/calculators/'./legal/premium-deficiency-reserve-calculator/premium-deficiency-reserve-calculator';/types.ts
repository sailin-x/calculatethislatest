export interface './legal/premium-deficiency-reserve-calculator/premium-deficiency-reserve-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/premium-deficiency-reserve-calculator/premium-deficiency-reserve-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/premium-deficiency-reserve-calculator/premium-deficiency-reserve-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/premium-deficiency-reserve-calculator/premium-deficiency-reserve-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
