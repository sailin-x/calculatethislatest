export interface './finance/general/nursing-home-negligence-calculator/nursing-home-negligence-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/nursing-home-negligence-calculator/nursing-home-negligence-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/nursing-home-negligence-calculator/nursing-home-negligence-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/nursing-home-negligence-calculator/nursing-home-negligence-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
