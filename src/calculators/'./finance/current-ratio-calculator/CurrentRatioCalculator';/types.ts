export interface './finance/current-ratio-calculator/CurrentRatioCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/current-ratio-calculator/CurrentRatioCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/current-ratio-calculator/CurrentRatioCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/current-ratio-calculator/CurrentRatioCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
