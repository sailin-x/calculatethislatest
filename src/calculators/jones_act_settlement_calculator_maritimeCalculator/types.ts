export interface jones_act_settlement_calculator_maritimeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface jones_act_settlement_calculator_maritimeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface jones_act_settlement_calculator_maritimeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface jones_act_settlement_calculator_maritimeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
