export interface blockchain_gas_fee_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface blockchain_gas_fee_calculatorResults {
  result: number;
  analysis?: string;
}

export interface blockchain_gas_fee_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface blockchain_gas_fee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
