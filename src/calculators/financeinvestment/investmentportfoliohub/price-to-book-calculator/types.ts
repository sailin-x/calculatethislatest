export interface price_to_book_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface price_to_book_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface price_to_book_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface price_to_book_calculatorOutputs {
  result: number;
  analysis: price_to_book_calculatorAnalysis;
}
