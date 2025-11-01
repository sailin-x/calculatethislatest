export interface AdReachFrequency-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface AdReachFrequency-calculatorResults {
  result: number;
  analysis?: string;
}

export interface AdReachFrequency-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface AdReachFrequency-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
