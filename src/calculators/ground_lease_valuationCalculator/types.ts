export interface ground_lease_valuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ground_lease_valuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ground_lease_valuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ground_lease_valuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
