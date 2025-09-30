export interface registerRentalYieldCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRentalYieldCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRentalYieldCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRentalYieldCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
