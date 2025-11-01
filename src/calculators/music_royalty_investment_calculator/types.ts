export interface music_royalty_investment_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_royalty_investment_calculatorResults {
  result: number;
  analysis?: string;
}

export interface music_royalty_investment_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_royalty_investment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
