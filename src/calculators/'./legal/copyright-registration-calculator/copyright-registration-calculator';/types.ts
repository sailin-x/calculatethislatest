export interface './legal/copyright-registration-calculator/copyright-registration-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/copyright-registration-calculator/copyright-registration-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/copyright-registration-calculator/copyright-registration-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/copyright-registration-calculator/copyright-registration-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
