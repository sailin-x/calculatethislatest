export interface ad-viewability-impact-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad-viewability-impact-calculatorResults {
  result: number;
  analysis?: string;
}

export interface ad-viewability-impact-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad-viewability-impact-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
