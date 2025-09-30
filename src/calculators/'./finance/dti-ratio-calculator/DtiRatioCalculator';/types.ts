export interface './finance/dti-ratio-calculator/DtiRatioCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/dti-ratio-calculator/DtiRatioCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/dti-ratio-calculator/DtiRatioCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/dti-ratio-calculator/DtiRatioCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
