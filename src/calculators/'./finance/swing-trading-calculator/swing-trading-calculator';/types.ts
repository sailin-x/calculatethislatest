export interface './finance/swing-trading-calculator/swing-trading-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/swing-trading-calculator/swing-trading-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/swing-trading-calculator/swing-trading-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/swing-trading-calculator/swing-trading-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
