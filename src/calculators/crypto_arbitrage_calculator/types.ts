export interface crypto_arbitrage_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crypto_arbitrage_calculatorResults {
  result: number;
  analysis?: string;
}

export interface crypto_arbitrage_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crypto_arbitrage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
