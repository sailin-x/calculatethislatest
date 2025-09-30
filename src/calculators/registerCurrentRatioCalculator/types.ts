export interface registerCurrentRatioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCurrentRatioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCurrentRatioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCurrentRatioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
