export interface './finance/terminal-value-calculator/terminal-value-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/terminal-value-calculator/terminal-value-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/terminal-value-calculator/terminal-value-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/terminal-value-calculator/terminal-value-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
