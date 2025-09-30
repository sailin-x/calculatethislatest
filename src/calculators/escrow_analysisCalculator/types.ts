export interface escrow_analysisCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface escrow_analysisCalculatorResults {
  result: number;
  analysis?: string;
}

export interface escrow_analysisCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface escrow_analysisCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
