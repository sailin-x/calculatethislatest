export interface './math/cybersecurity-calculator/cybersecurity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/cybersecurity-calculator/cybersecurity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/cybersecurity-calculator/cybersecurity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/cybersecurity-calculator/cybersecurity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
