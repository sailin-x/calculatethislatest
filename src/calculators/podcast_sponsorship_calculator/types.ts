export interface podcast_sponsorship_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface podcast_sponsorship_calculatorResults {
  result: number;
  analysis?: string;
}

export interface podcast_sponsorship_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface podcast_sponsorship_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
