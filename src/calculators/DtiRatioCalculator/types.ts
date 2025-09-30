export interface DtiRatioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DtiRatioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DtiRatioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DtiRatioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
