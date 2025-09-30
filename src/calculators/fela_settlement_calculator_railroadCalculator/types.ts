export interface fela_settlement_calculator_railroadCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fela_settlement_calculator_railroadCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fela_settlement_calculator_railroadCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fela_settlement_calculator_railroadCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
