export interface './business/ad-reach-and-frequency-calculator/ad_reach_and_frequency_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/ad-reach-and-frequency-calculator/ad_reach_and_frequency_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/ad-reach-and-frequency-calculator/ad_reach_and_frequency_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/ad-reach-and-frequency-calculator/ad_reach_and_frequency_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
