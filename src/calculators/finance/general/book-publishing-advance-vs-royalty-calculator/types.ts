export interface book_publishing_advance_vs_royalty_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface book_publishing_advance_vs_royalty_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface book_publishing_advance_vs_royalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface book_publishing_advance_vs_royalty_calculatorOutputs {
  result: number;
  analysis: book_publishing_advance_vs_royalty_calculatorAnalysis;
}
