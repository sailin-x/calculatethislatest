export interface gas_fee_optimizer_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gas_fee_optimizer_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface gas_fee_optimizer_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gas_fee_optimizer_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
