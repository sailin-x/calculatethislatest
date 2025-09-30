export interface CurrentRatioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CurrentRatioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CurrentRatioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CurrentRatioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
