export interface car_accident_pain_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface car_accident_pain_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface car_accident_pain_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface car_accident_pain_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
