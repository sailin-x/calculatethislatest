export interface blockchain_gas_fee_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface blockchain_gas_fee_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface blockchain_gas_fee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface blockchain_gas_fee_calculatorOutputs {
  result: number;
  analysis: blockchain_gas_fee_calculatorAnalysis;
}
