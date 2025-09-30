export interface book_publishing_advance_vs_royalty_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface book_publishing_advance_vs_royalty_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface book_publishing_advance_vs_royalty_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface book_publishing_advance_vs_royalty_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
