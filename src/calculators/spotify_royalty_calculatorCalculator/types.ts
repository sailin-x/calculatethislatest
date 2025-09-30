export interface spotify_royalty_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface spotify_royalty_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface spotify_royalty_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface spotify_royalty_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
