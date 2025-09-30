export interface book_publishing_advance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface book_publishing_advance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface book_publishing_advance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface book_publishing_advance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
