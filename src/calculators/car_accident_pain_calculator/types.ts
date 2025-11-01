export interface car_accident_pain_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface car_accident_pain_calculatorResults {
  result: number;
  analysis?: string;
}

export interface car_accident_pain_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface car_accident_pain_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
