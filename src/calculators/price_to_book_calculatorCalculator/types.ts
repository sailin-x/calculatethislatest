export interface price_to_book_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface price_to_book_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface price_to_book_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface price_to_book_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
