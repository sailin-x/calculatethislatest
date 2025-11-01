export interface defi_liquidity_pool_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface defi_liquidity_pool_calculatorResults {
  result: number;
  analysis?: string;
}

export interface defi_liquidity_pool_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface defi_liquidity_pool_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
