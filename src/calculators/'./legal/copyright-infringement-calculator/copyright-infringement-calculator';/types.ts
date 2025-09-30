export interface './legal/copyright-infringement-calculator/copyright-infringement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/copyright-infringement-calculator/copyright-infringement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/copyright-infringement-calculator/copyright-infringement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/copyright-infringement-calculator/copyright-infringement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
