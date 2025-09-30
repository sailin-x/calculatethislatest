export interface ad-reach-frequency-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad-reach-frequency-calculatorResults {
  result: number;
  analysis?: string;
}

export interface ad-reach-frequency-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad-reach-frequency-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
