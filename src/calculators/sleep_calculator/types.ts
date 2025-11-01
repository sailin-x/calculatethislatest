export interface sleep_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sleep_calculatorResults {
  result: number;
  analysis?: string;
}

export interface sleep_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sleep_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
