export interface './business/ad-reach-frequency-calculator/ad-reach-frequency-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/ad-reach-frequency-calculator/ad-reach-frequency-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/ad-reach-frequency-calculator/ad-reach-frequency-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/ad-reach-frequency-calculator/ad-reach-frequency-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
