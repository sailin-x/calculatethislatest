export interface gas_fee_optimizer_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface gas_fee_optimizer_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface gas_fee_optimizer_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface gas_fee_optimizer_calculatorOutputs {
  result: number;
  analysis: gas_fee_optimizer_calculatorAnalysis;
}
