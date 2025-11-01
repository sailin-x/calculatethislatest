export interface life_settlement_value_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface life_settlement_value_calculatorResults {
  result: number;
  analysis?: string;
}

export interface life_settlement_value_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface life_settlement_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
