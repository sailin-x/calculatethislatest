export interface crypto_arbitrage_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crypto_arbitrage_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface crypto_arbitrage_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crypto_arbitrage_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
