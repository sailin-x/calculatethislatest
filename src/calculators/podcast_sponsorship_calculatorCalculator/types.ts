export interface podcast_sponsorship_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface podcast_sponsorship_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface podcast_sponsorship_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface podcast_sponsorship_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
