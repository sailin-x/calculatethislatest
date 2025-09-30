export interface './finance/kurtosis-calculator/kurtosis-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/kurtosis-calculator/kurtosis-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/kurtosis-calculator/kurtosis-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/kurtosis-calculator/kurtosis-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
