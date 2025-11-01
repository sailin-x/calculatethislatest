export interface gas_fee_optimizer_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gas_fee_optimizer_calculatorResults {
  result: number;
  analysis?: string;
}

export interface gas_fee_optimizer_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gas_fee_optimizer_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
