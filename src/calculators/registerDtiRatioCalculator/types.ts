export interface registerDtiRatioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDtiRatioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDtiRatioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDtiRatioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
