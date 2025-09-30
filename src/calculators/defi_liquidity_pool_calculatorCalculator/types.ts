export interface defi_liquidity_pool_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface defi_liquidity_pool_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface defi_liquidity_pool_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface defi_liquidity_pool_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
