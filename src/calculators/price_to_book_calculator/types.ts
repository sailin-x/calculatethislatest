export interface price_to_book_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface price_to_book_calculatorResults {
  result: number;
  analysis?: string;
}

export interface price_to_book_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface price_to_book_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
