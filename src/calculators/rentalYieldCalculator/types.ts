export interface rentalYieldCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rentalYieldCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rentalYieldCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rentalYieldCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
