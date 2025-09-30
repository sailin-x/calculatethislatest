export interface hotel_feasibilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hotel_feasibilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hotel_feasibilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hotel_feasibilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
