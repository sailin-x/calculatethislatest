export interface slip_and_fall_settlement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface slip_and_fall_settlement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface slip_and_fall_settlement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface slip_and_fall_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
