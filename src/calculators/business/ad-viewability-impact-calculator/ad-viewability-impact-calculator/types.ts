export interface AdViewabilityImpact-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface AdViewabilityImpact-calculatorResults {
  result: number;
  analysis?: string;
}

export interface AdViewabilityImpact-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface AdViewabilityImpact-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
