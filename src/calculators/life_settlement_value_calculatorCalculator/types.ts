export interface life_settlement_value_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface life_settlement_value_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface life_settlement_value_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface life_settlement_value_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
