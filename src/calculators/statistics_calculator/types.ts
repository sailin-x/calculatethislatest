export interface statistics_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface statistics_calculatorResults {
  result: number;
  analysis?: string;
}

export interface statistics_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface statistics_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
